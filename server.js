const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = new WebSocket.Server({ port: PORT });
let clients = [];

console.log(`✅ Chat server running on port ${PORT}`);

server.on('connection', ws => {
  clients.push(ws);

  ws.on('message', message => {
    // broadcast to all clients
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

