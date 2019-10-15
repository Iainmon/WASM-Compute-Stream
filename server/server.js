"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var wss = new ws_1["default"].Server({ port: 9001 });
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming() {
        ws.send(randomRange(3, 46));
    });
});
