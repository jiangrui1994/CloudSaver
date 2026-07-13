import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const cliPath = fileURLToPath(new URL("../src/cli.js", import.meta.url));

test("capabilities writes exactly one JSON document to stdout", () => {
  const result = spawnSync(process.execPath, [cliPath, "capabilities"], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  const output = JSON.parse(result.stdout);
  assert.equal(output.ok, true);
  assert.equal(output.data.name, "cloudsaver");
});

test("CLI errors are JSON on stderr and return a non-zero status", () => {
  const result = spawnSync(process.execPath, [cliPath, "search", "--keyword", "test"], {
    encoding: "utf8",
    env: { ...process.env, CLOUDSAVER_API_URL: "", CLOUDSAVER_TOKEN: "" },
  });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  const output = JSON.parse(result.stderr);
  assert.equal(output.ok, false);
  assert.match(output.error.message, /API 地址/);
});
