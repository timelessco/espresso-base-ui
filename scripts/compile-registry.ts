import { compile, writeRegistry } from "fuma-cli/compiler";
import { registry } from "../registry.ts";

const out = await compile({
  root: registry,
  onUnknownFile() {
    // treat all unknown files (lib/utils.ts etc.) as external
    // consumers provide their own @/lib/utils
    return false;
  },
});

await writeRegistry(out, {
  dir: "./public/registry",
  cleanDir: true,
});

console.log("Registry compiled successfully to ./public/registry");
