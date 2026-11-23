// Server tĩnh cho lúc phát triển: node serve.mjs  →  http://localhost:3000
// Phục vụ thư mục gốc repo giống GitHub Pages: /home/ → home/index.html.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
};

async function send(res, file, req) {
  const stat = await fs.stat(file);
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range;

  // Video cần trả theo từng đoạn (Range) thì trình duyệt mới tua/lặp được.
  if (range) {
    const [a, b] = range.replace(/bytes=/, '').split('-');
    const start = Number(a) || 0;
    const end = b ? Number(b) : stat.size - 1;
    const fh = await fs.open(file);
    const buf = Buffer.alloc(end - start + 1);
    await fh.read(buf, 0, buf.length, start);
    await fh.close();
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': buf.length,
      'Cache-Control': 'no-store',
    });
    return res.end(buf);
  }

  res.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
  res.end(await fs.readFile(file));
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const rel = decodeURIComponent(url.pathname);
    let file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

    const stat = await fs.stat(file).catch(() => null);
    if (stat && stat.isDirectory()) {
      if (!rel.endsWith('/')) {
        res.writeHead(301, { Location: rel + '/' + url.search });
        return res.end();
      }
      file = path.join(file, 'index.html');
    }
    await send(res, file, req);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 — không tìm thấy');
  }
}).listen(PORT, () => {
  console.log(`PiGo Heritage đang chạy ở http://localhost:${PORT}`);
});
