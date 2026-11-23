// Chụp màn hình trang đang chạy trên localhost.
//   node screenshot.mjs http://localhost:3000 [nhãn] [--width=1440] [--height=900] [--viewport-only]
// Ảnh lưu vào "temporary screenshots/screenshot-N[-nhãn].png", N tự tăng, không ghi đè.
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'temporary screenshots');

const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args.filter(a => a.startsWith('--')).map(a => {
    const [k, v] = a.slice(2).split('=');
    return [k, v ?? true];
  })
);
const [url = 'http://localhost:3000', label] = args.filter(a => !a.startsWith('--'));
const width = Number(flags.width) || 1440;
const height = Number(flags.height) || 900;
const fullPage = !flags['viewport-only'];

await fs.mkdir(OUT, { recursive: true });
const taken = (await fs.readdir(OUT))
  .map(f => Number((f.match(/^screenshot-(\d+)/) || [])[1]))
  .filter(Boolean);
const n = (taken.length ? Math.max(...taken) : 0) + 1;
const file = path.join(OUT, `screenshot-${n}${label ? '-' + label : ''}.png`);

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Cuộn hết trang để các khối "hiện dần khi cuộn" kịp hiện ra trước khi chụp.
  if (fullPage) {
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        // 'instant' — site đặt scroll-behavior:smooth, cuộn mượt sẽ bị ngắt giữa chừng.
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
  await new Promise(r => setTimeout(r, 900));

  await page.screenshot({ path: file, fullPage });
  console.log(path.relative(ROOT, file));
} finally {
  await browser.close();
}
