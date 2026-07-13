export class CloudSaverApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "CloudSaverApiError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

export class CloudSaverClient {
  constructor({ apiUrl, token = "", timeout = 16000, fetchImpl = globalThis.fetch }) {
    if (!apiUrl) {
      throw new CloudSaverApiError("缺少 API 地址，请设置 CLOUDSAVER_API_URL 或传入 --api-url");
    }
    if (typeof fetchImpl !== "function") {
      throw new CloudSaverApiError("当前 Node.js 环境不支持 fetch，请使用 Node.js 18 或更高版本");
    }

    this.apiUrl = apiUrl.replace(/\/+$/, "");
    this.token = token;
    this.timeout = Number(timeout);
    this.fetchImpl = fetchImpl;
  }

  async request(path, { method = "GET", query, body, auth = true } = {}) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${this.apiUrl}${normalizedPath}`);
    for (const [key, value] of Object.entries(query || {})) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }

    if (auth && !this.token) {
      throw new CloudSaverApiError("该命令需要认证，请设置 CLOUDSAVER_TOKEN 或传入 --token", {
        code: "TOKEN_REQUIRED",
      });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);
    const headers = { Accept: "application/json" };
    if (auth && this.token) headers.Authorization = `Bearer ${this.token}`;
    if (body !== undefined) headers["Content-Type"] = "application/json";

    try {
      const response = await this.fetchImpl(url, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      });
      const text = await response.text();
      let payload;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        throw new CloudSaverApiError("API 返回了非 JSON 响应", {
          status: response.status,
          details: text.slice(0, 500),
        });
      }

      if (
        !response.ok ||
        payload?.success === false ||
        (payload?.code !== undefined && payload.code !== 0)
      ) {
        throw new CloudSaverApiError(payload?.message || `API 请求失败 (${response.status})`, {
          status: response.status,
          code: payload?.code,
          details: payload,
        });
      }
      return payload;
    } catch (error) {
      if (error instanceof CloudSaverApiError) throw error;
      if (error?.name === "AbortError") {
        throw new CloudSaverApiError(`API 请求超时 (${this.timeout}ms)`, { code: "TIMEOUT" });
      }
      throw new CloudSaverApiError(error instanceof Error ? error.message : "API 请求失败", {
        code: "NETWORK_ERROR",
      });
    } finally {
      clearTimeout(timer);
    }
  }
}
