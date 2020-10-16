const WebSocket = require('ws');
const Account = require('./bitlogin/Account.js');
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
let currentClientVerificationStateInServer = bitloginServer.GetVerificationStateOfAccount(bitloginClient.LegacyAddress);
let hiMessage = bitloginClient.GetHiMessage();
let okSignThisMessage = bitloginServer.GetOkSignThisMessage(hiMessage);
currentClientVerificationStateInServer = bitloginServer.GetVerificationStateOfAccount(bitloginClient.LegacyAddress);
let verifyMeMessage = bitloginClient.GetVerifyMeMessage(okSignThisMessage);
let authenticationResult = bitloginServer.GetAuthenticationResult(verifyMeMessage);
console.log(authenticationResult)
currentClientVerificationStateInServer = bitloginServer.GetVerificationStateOfAccount(bitloginClient.LegacyAddress);
let logoutRequestMessage = bitloginClient.GetLogOutRequestMessage();
let logoutResult = bitloginServer.LogOutRequest(logoutRequestMessage);
currentClientVerificationStateInServer = bitloginServer.GetVerificationStateOfAccount(bitloginClient.LegacyAddress);
console.log(`currentClientVerificationStateInServer (after logout) ${JSON.stringify(currentClientVerificationStateInServer, null, " ")}`);

// let bitloginClient2 = new BitloginClient();
// try {
//     let bitloginClient3 = new BitloginClient('hello world');
// } catch (e) {
//     console.log(e.toString());
// }