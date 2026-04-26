const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/sequential') {
    const start = Date.now();

    try {
      const a = await fs.readFile('a.txt', 'utf8');
      const b = await fs.readFile('b.txt', 'utf8');
      const c = await fs.readFile('c.txt', 'utf8');

      const elapsedMs = Date.now() - start;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        combined: (a + b + c).trim(),
        elapsedMs
      }));
    } catch (err) {
      res.writeHead(500);
      res.end();
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(process.argv[2]);