import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetsDir = path.resolve("src/assets");
const screens = ["screen-quran", "screen-prayer", "screen-kiblat"];

for (const name of screens) {
  const input = path.join(assetsDir, `${name}.png`);
  const output = path.join(assetsDir, `${name}.webp`);

  await sharp(input)
    .resize(640, 1280, { fit: "cover", position: "top" })
    .webp({ quality: 82, effort: 6 })
    .toFile(output);

  const inStat = await sharp(input).metadata();
  const outStat = await sharp(output).metadata();
  const inSize = (await import("node:fs")).statSync(input).size;
  const outSize = (await import("node:fs")).statSync(output).size;

  console.log(
    `${name}: ${inStat.width}x${inStat.height} PNG ${(inSize / 1024).toFixed(0)}KB → ${outStat.width}x${outStat.height} WebP ${(outSize / 1024).toFixed(0)}KB`,
  );
}

// Logo — kecilkan untuk web (paparan max ~72px)
const logoIn = path.join(assetsDir, "logo.png");
const logoOut = path.join(assetsDir, "logo.webp");
await sharp(logoIn)
  .resize(144, 144, { fit: "cover" })
  .webp({ quality: 85 })
  .toFile(logoOut);

const logoInSize = (await import("node:fs")).statSync(logoIn).size;
const logoOutSize = (await import("node:fs")).statSync(logoOut).size;
console.log(
  `logo: PNG ${(logoInSize / 1024).toFixed(0)}KB → WebP ${(logoOutSize / 1024).toFixed(0)}KB`,
);
