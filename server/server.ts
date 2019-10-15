import WebSocket from 'ws';

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const wss = new WebSocket.Server({ port: 9001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming() {
        ws.send(randomRange(3, 46));
    });
});

