import assert from "node:assert/strict";
import test from "node:test";
import { CloudSaverApiError, CloudSaverClient } from "../src/client.js";

test("builds an authenticated request with query parameters", async () => {
  let captured;
  const client = new CloudSaverClient({
    apiUrl: "https://cloudsaver.example/api/",
    token: "secret-token",
    fetchImpl: async (url, init) => {
      captured = { url: String(url), init };
      return new Response(JSON.stringify({ success: true, code: 0, data: ["result"] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  const result = await client.request("/search", { query: { keyword: "电影", empty: "" } });
  assert.equal(captured.url, "https://cloudsaver.example/api/search?keyword=%E7%94%B5%E5%BD%B1");
  assert.equal(captured.init.headers.Authorization, "Bearer secret-token");
  assert.deepEqual(result.data, ["result"]);
});

test("rejects protected requests without a token", async () => {
  const client = new CloudSaverClient({
    apiUrl: "https://cloudsaver.example/api",
    fetchImpl: async () => new Response("{}"),
  });
  await assert.rejects(
    () => client.request("/search"),
    (error) => {
      assert.ok(error instanceof CloudSaverApiError);
      assert.equal(error.code, "TOKEN_REQUIRED");
      return true;
    }
  );
});

test("turns CloudSaver application errors into CLI errors", async () => {
  const client = new CloudSaverClient({
    apiUrl: "https://cloudsaver.example/api",
    token: "token",
    fetchImpl: async () =>
      new Response(JSON.stringify({ success: false, code: 10000, message: "搜索失败" }), {
        status: 200,
      }),
  });
  await assert.rejects(
    () => client.request("/search"),
    (error) => {
      assert.equal(error.code, 10000);
      assert.equal(error.message, "搜索失败");
      return true;
    }
  );
});
