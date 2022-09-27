import { execSync } from "child_process";
import { readdir, rm, access } from "node:fs/promises";
import { constants } from "node:fs";

import assert from "node:assert";

const nm = "node_modules";

try {
  await rm(nm, { recursive: true, force: true });
} catch {}

execSync("npm install");

assert.equal(
  (await readdir(nm)).join(";"),
  ".package-lock.json;buffer-from;source-map;source-map-support"
);

execSync("npm prune --production");

assert.equal(
  (await readdir(nm)).join(";"),
  ".package-lock.json;buffer-from;source-map;source-map-support"
);
