const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const handleWs = (ws) => {
    console.log('New client connected');

    let messageCount = 0;
    let hasSeenMedia = false;

    ws.on('message', (message) => {
      console.log("message : ", message)
      if (message.type === 'utf8') {
        console.log(`Received message: ${message}`);
        var data = JSON.parse(message.utf8Data);
        if (data.event === "connected") {
          log('Media WS: Connected event received: ', data);
        }
        if (data.event === "start") {
          log('Media WS: Start event received: ', data);
        }
        if (data.event === "media") {
          if (!hasSeenMedia) {
            log('Media WS: Media event received: ', data);
            log('Media WS: Suppressing additional messages...');
            hasSeenMedia = true;
          }
        }
        if (data.event === "stop") {
          log('Media WS: Stop event received: ', data);
        }
        messageCount++;
        console.log("messageCount : ", messageCount)
      } else if (message.type === 'binary') {
        log('Media WS: binary message received (not supported)');
      }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
}

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const wss = new WebSocket.Server({ port: 3001 });

    wss.on('connection', handleWs);

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});