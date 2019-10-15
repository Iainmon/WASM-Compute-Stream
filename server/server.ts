const WS = require('ws');
const PORT = process.env.PORT || 3000;

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const wss = new WS.Server({ port: PORT });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming() {
        ws.send(randomRange(3, 48));
    });
});

console.log('WebSocket server started on port ', PORT);