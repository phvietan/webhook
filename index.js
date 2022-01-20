const fs = require('fs');
const http = require('http');

var id = 0;

const craftPayload = (req, data) => {
  let result = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;
  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    const key = req.rawHeaders[i];
    const value = req.rawHeaders[i + 1];
    result += `${key}: ${value}\r\n`;
  }
  result += '\r\n';
  return result + data;
}

const requestListener = async function (req, res) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  let msg = `================  PAYLOAD ID ${++id}  ================\n${craftPayload(req, data)}`;
  fs.appendFile('log.txt', msg, () => { });

  try {
    if (!req.url.startsWith('/redirect')) throw 'not redirect';
    const u = new URL(req.url, `http://${req.headers.host}`);
    let url = u.searchParams.get('url');
    let code = u.searchParams.get('code');
    if (!url) throw 'not redirect';
    if (!code) code = 302; else code = parseInt(code);
    res.writeHead(code, { 'Location': url });
    res.end();
  } catch (err) {
    res.writeHead(200);
    res.end('Hello, World!');
  }
}

const server = http.createServer(requestListener);
server.listen(7119, '0.0.0.0');
