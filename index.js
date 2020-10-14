const WebSocket = require('ws');
const BitloginClient = require('./bitlogin/BitloginClient.js');
const BitloginServer = require('./bitlogin/BitloginServer.js');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('{"hello":"world"}');
});

let bitloginClient = new BitloginClient('advice sport service logic agent pole usual develop crash human syrup lion');
let bitloginServer = new BitloginServer(Math.random());

let hiMessage = bitloginClient.GetHiMessage();
let okSignThisMessage = bitloginServer.GetOkSignThisMessage(hiMessage);
let verifyMeMessage = bitloginClient.GetVerifyMeMessage(okSignThisMessage);
let authenticationResult = bitloginServer.GetAuthenticationResult(verifyMeMessage);
console.log(authenticationResult)

// let bitloginClient2 = new BitloginClient();
// try {
//     let bitloginClient3 = new BitloginClient('hello world');
// } catch (e) {
//     console.log(e.toString());
// }