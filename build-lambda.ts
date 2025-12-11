import { build } from "esbuild";
import { execSync } from "child_process";

interface LambdaConfig {
    entry: string;
    out: string;
    zip: string;
}

const lambdas: LambdaConfig[] = [
    { entry: "src/functions/shorten.ts", out: "dist/shorten.js", zip: "dist/shorten.zip" },
    { entry: "src/functions/redirect.ts", out: "dist/redirect.js", zip: "dist/redirect.zip" },
];

async function main() {
    for (const fn of lambdas) {
        console.log(`🔨 Building: ${fn.entry}`);
        await build({
            entryPoints: [fn.entry],
            outfile: fn.out,
            bundle: true,
            platform: "node",
            target: "node20",
            minify: false,
        });

        console.log(`📦 Zipping -> ${fn.zip}`);
        execSync(`zip -j ${fn.zip} ${fn.out}`, { stdio: "inherit" });
    }

    console.log("\n🎉 Build & zip completed!");
}

main();
