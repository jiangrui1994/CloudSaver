#!/usr/bin/env node

import { CloudSaverApiError, CloudSaverClient } from "./client.js";

const CAPABILITIES = {
  name: "cloudsaver",
  version: "0.1.0",
  output:
    "All successful commands write one JSON object to stdout. Errors write JSON to stderr and exit non-zero.",
  environment: {
    CLOUDSAVER_API_URL: "Required API base URL, for example http://127.0.0.1:8008/api",
    CLOUDSAVER_TOKEN: "Long-lived API Token from Settings, or a JWT returned by login",
    CLOUDSAVER_TIMEOUT: "Optional request timeout in milliseconds; default 16000",
  },
  globalOptions: ["--api-url", "--token", "--timeout", "--pretty"],
  commands: {
    capabilities: { auth: false, options: [] },
    login: { auth: false, required: ["--username", "--password"] },
    register: {
      auth: false,
      required: ["--username", "--password", "--register-code"],
    },
    search: {
      auth: true,
      required: ["--keyword"],
      optional: ["--channel-id", "--last-message-id"],
    },
    "share-info": {
      auth: true,
      required: ["--provider 115|quark", "--share-code or --url"],
      optional: ["--receive-code"],
    },
    folders: {
      auth: true,
      required: ["--provider 115|quark"],
      optional: ["--parent-cid (default: 0)"],
    },
    save: {
      auth: true,
      required: ["--provider 115|quark", "--share-code", "--folder-id", "--file-ids"],
      optional: ["--receive-code", "--file-id-tokens (required for Quark)"],
    },
    "douban-hot": {
      auth: true,
      optional: ["--type", "--tag", "--limit", "--start"],
    },
    "settings-get": { auth: true, options: [] },
    "settings-save": {
      auth: true,
      required: ["--user-settings-json"],
      optional: ["--global-settings-json"],
    },
    sponsors: { auth: true, options: [] },
    request: {
      auth: true,
      required: ["--method", "--path"],
      optional: ["--query-json", "--body-json", "--no-auth"],
    },
  },
};

function parseArguments(argv) {
  const result = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      result._.push(value);
      continue;
    }
    const equalIndex = value.indexOf("=");
    if (equalIndex !== -1) {
      result[value.slice(2, equalIndex)] = value.slice(equalIndex + 1);
      continue;
    }
    const key = value.slice(2);
    const next = argv[index + 1];
    if (next !== undefined && !next.startsWith("--")) {
      result[key] = next;
      index += 1;
    } else {
      result[key] = true;
    }
  }
  return result;
}

function requireOption(options, name) {
  const value = options[name];
  if (value === undefined || value === true || value === "") {
    throw new CloudSaverApiError(`缺少必填参数 --${name}`, { code: "INVALID_ARGUMENT" });
  }
  return String(value);
}

function parseJson(value, optionName) {
  if (value === undefined) return undefined;
  try {
    return JSON.parse(String(value));
  } catch {
    throw new CloudSaverApiError(`--${optionName} 不是有效的 JSON`, {
      code: "INVALID_ARGUMENT",
    });
  }
}

function parseList(value, optionName, required = false) {
  if (value === undefined || value === "") {
    if (required) {
      throw new CloudSaverApiError(`缺少必填参数 --${optionName}`, {
        code: "INVALID_ARGUMENT",
      });
    }
    return undefined;
  }
  const list = String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (required && list.length === 0) {
    throw new CloudSaverApiError(`--${optionName} 至少需要一个值`, { code: "INVALID_ARGUMENT" });
  }
  return list;
}

function providerPath(options) {
  const provider = requireOption(options, "provider").toLowerCase();
  if (provider === "115" || provider === "cloud115" || provider === "pan115") return "cloud115";
  if (provider === "quark") return "quark";
  throw new CloudSaverApiError("--provider 仅支持 115 或 quark", {
    code: "INVALID_ARGUMENT",
  });
}

function parseShareUrl(rawUrl, provider) {
  const url = new URL(rawUrl);
  if (provider === "cloud115") {
    const match = url.pathname.match(/\/s\/([^/]+)/);
    if (!match) throw new Error("无法从 URL 中解析 115 分享码");
    return {
      shareCode: match[1],
      receiveCode: url.searchParams.get("password") || "",
    };
  }
  const match = url.pathname.match(/\/s\/([a-zA-Z0-9]+)/);
  if (!match) throw new Error("无法从 URL 中解析夸克分享码");
  return { shareCode: match[1], receiveCode: "" };
}

async function execute(command, options, client) {
  switch (command) {
    case "login":
      return client.request("/user/login", {
        method: "POST",
        auth: false,
        body: {
          username: requireOption(options, "username"),
          password: requireOption(options, "password"),
        },
      });
    case "register":
      return client.request("/user/register", {
        method: "POST",
        auth: false,
        body: {
          username: requireOption(options, "username"),
          password: requireOption(options, "password"),
          registerCode: requireOption(options, "register-code"),
        },
      });
    case "search":
      return client.request("/search", {
        query: {
          keyword: requireOption(options, "keyword"),
          channelId: options["channel-id"],
          lastMessageId: options["last-message-id"],
        },
      });
    case "share-info": {
      const provider = providerPath(options);
      let shareCode = options["share-code"];
      let receiveCode = options["receive-code"];
      if (options.url) {
        const parsed = parseShareUrl(String(options.url), provider);
        shareCode ||= parsed.shareCode;
        receiveCode ||= parsed.receiveCode;
      }
      if (!shareCode) requireOption(options, "share-code");
      return client.request(`/${provider}/share-info`, {
        query: { shareCode, receiveCode },
      });
    }
    case "folders":
      return client.request(`/${providerPath(options)}/folders`, {
        query: { parentCid: options["parent-cid"] || "0" },
      });
    case "save":
      return client.request(`/${providerPath(options)}/save`, {
        method: "POST",
        body: {
          shareCode: requireOption(options, "share-code"),
          receiveCode: options["receive-code"] || "",
          folderId: requireOption(options, "folder-id"),
          fids: parseList(options["file-ids"], "file-ids", true),
          fidTokens: parseList(options["file-id-tokens"], "file-id-tokens"),
        },
      });
    case "douban-hot":
      return client.request("/douban/hot", {
        query: {
          type: options.type || "movie",
          tag: options.tag || "热门",
          page_limit: options.limit || "50",
          page_start: options.start || "0",
        },
      });
    case "settings-get":
      return client.request("/setting/get");
    case "settings-save":
      return client.request("/setting/save", {
        method: "POST",
        body: {
          userSettings: parseJson(
            requireOption(options, "user-settings-json"),
            "user-settings-json"
          ),
          globalSetting: parseJson(options["global-settings-json"], "global-settings-json"),
        },
      });
    case "sponsors":
      return client.request("/sponsors", { query: { timestamp: Date.now() } });
    case "request":
      return client.request(requireOption(options, "path"), {
        method: requireOption(options, "method").toUpperCase(),
        query: parseJson(options["query-json"], "query-json"),
        body: parseJson(options["body-json"], "body-json"),
        auth: !options["no-auth"],
      });
    default:
      throw new CloudSaverApiError(`未知命令: ${command || "(空)"}`, { code: "UNKNOWN_COMMAND" });
  }
}

function writeJson(stream, value, pretty) {
  stream.write(`${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const command = options._[0];
  const pretty = Boolean(options.pretty);

  if (command === "capabilities" || command === "help" || options.help) {
    writeJson(process.stdout, { ok: true, data: CAPABILITIES }, pretty);
    return;
  }

  try {
    const client = new CloudSaverClient({
      apiUrl: options["api-url"] || process.env.CLOUDSAVER_API_URL,
      token: options.token || process.env.CLOUDSAVER_TOKEN || "",
      timeout: options.timeout || process.env.CLOUDSAVER_TIMEOUT || 16000,
    });
    const response = await execute(command, options, client);
    writeJson(
      process.stdout,
      {
        ok: true,
        command,
        code: response?.code ?? 0,
        message: response?.message,
        data: response?.data ?? response,
      },
      pretty
    );
  } catch (error) {
    const apiError =
      error instanceof CloudSaverApiError
        ? error
        : new CloudSaverApiError(error instanceof Error ? error.message : "未知错误");
    writeJson(
      process.stderr,
      {
        ok: false,
        command,
        error: {
          type: apiError.name,
          code: apiError.code,
          status: apiError.status,
          message: apiError.message,
          details: apiError.details,
        },
      },
      pretty
    );
    process.exitCode = 1;
  }
}

main();
