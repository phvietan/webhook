const fs = require('fs');
const http = require('http');
const { log } = require('@drstrain/drutil');

var id = 0;

const myLog = (msg) => {
  log(msg, 'log.txt', false);
}

const craftPayload = (req, data) => {
  myLog(`${req.method} ${req.url} HTTP/${req.httpVersion}\r`);
  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    const key = req.rawHeaders[i];
    const value = req.rawHeaders[i + 1];
    myLog(`${key}: ${value}\r`);
  }
  myLog(`\r`);
}

const requestListener = async function (req, res) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  myLog(`================  PAYLOAD ID ${++id}  ================`);
  craftPayload(req, data);

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
