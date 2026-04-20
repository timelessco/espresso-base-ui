import { ComponentInstaller } from "fuma-cli/registry/installer";
import { HttpRegistryConnector } from "fuma-cli/registry/connector";

const connector = new HttpRegistryConnector("http://localhost:3000/registry");

const installer = new ComponentInstaller(connector, {
  outDir: {
    base: "test-output",
  },
  io: {
    onWarn(message) {
      console.warn("⚠️", message);
    },
    async confirmFileOverride() {
      return true; // auto-overwrite for testing
    },
    onFileDownloaded(options) {
      console.log("✅ Downloaded:", options.path);
    },
  },
});

const target = process.argv[2] || "button";
console.log(`\nInstalling "${target}" from local registry...\n`);

const result = await installer.install(target);
const deps = await result.deps();

console.log("\n📦 Dependencies:");
if (deps.dependencies.length) console.log("  ", deps.dependencies.join(", "));
if (deps.devDependencies.length) console.log("  dev:", deps.devDependencies.join(", "));
if (!deps.hasRequired()) console.log("  (none)");

console.log("\n✅ Done! Check ./test-output/ for installed files.");
