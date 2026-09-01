import path from "node:path";
import sharp from "sharp";

const root = path.resolve(".");
const logoPath = path.join(root, "src/assets/logo.png");
const screenPath = path.join(root, "src/assets/screen-prayer.webp");
const outputPath = path.join(root, "public/og-image.jpg");

const width = 1200;
const height = 630;

const bgSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e6b52"/>
      <stop offset="55%" stop-color="#145a42"/>
      <stop offset="100%" stop-color="#0c3d2e"/>
    </linearGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="white" opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  <circle cx="1050" cy="80" r="180" fill="white" opacity="0.06"/>
  <circle cx="150" cy="560" r="120" fill="white" opacity="0.05"/>
</svg>
`;

const textSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <text x="80" y="200" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="white">
    Jom<tspan fill="#a8e6cf">Ngaji</tspan>
  </text>
  <text x="80" y="270" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="600" fill="white" opacity="0.95">
    Al-Quran Digital Untuk Semua
  </text>
  <text x="80" y="340" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="white" opacity="0.8">
    Baca Quran • Waktu Solat • Arah Kiblat • Audio Murottal
  </text>
  <rect x="80" y="390" width="260" height="52" rx="26" fill="white" opacity="0.15"/>
  <text x="110" y="424" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="white">
    Percuma di Google Play
  </text>
</svg>
`;

const logo = await sharp(logoPath).resize(120, 120, { fit: "cover" }).png().toBuffer();

const phone = await sharp(screenPath)
  .resize(220, 440, { fit: "cover", position: "top" })
  .extend({
    top: 12,
    bottom: 12,
    left: 8,
    right: 8,
    background: { r: 24, g: 24, b: 27, alpha: 1 },
  })
  .png()
  .toBuffer();

await sharp(Buffer.from(bgSvg))
  .composite([
    { input: await sharp(Buffer.from(textSvg)).png().toBuffer(), top: 0, left: 0 },
    { input: logo, top: 72, left: 80 },
    { input: phone, top: 120, left: 880 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outputPath);

const stat = (await import("node:fs")).statSync(outputPath);
console.log(`Generated ${outputPath} (${width}x${height}, ${(stat.size / 1024).toFixed(0)}KB)`);
