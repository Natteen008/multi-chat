const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PORT || 3000;

// Crée un serveur HTTP "vide" (juste pour Railway)
const server = http.createServer();

const wss = new WebSocket.Server({ server });
let clients = [];

console.log(`✅ Chat server running on port ${PORT}`);

wss.on('connection', ws => {
  clients.push(ws);

  ws.on('message', message => {
    // broadcast à tous les clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

// 🚀 Important : Railway attend que tu appelles server.listen()
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
