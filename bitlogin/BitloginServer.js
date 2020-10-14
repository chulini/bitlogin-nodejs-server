const bitcoinMessage = require('bitcoinjs-message');
const Account = require('./Account.js');
const { GetError } = require('./ErrorCodes.js')
const SignatureVerifier = require('./SignatureVerifier.js');

module.exports = class BitloginServer {

    constructor(randomSeed) {
        this._randomSeed = randomSeed;
        this._accountsByLegacyAddress = {};
        console.log(`BitoginServer started with seed ${this._randomSeed}`);
    }

    GenerateMessageToSign() {
        let msg = this.GetServerTime().toString();
        msg += this.GetServerTime().toString();
        msg += "JetJumpRules";
        let buf = Buffer.from(msg, 'base64');
        _messageToSign = createHash('sha256').update(buf).digest('base64');
        return _messageToSign;
    }
    GetServerTime() {
        return new Date().getTime();
    }

    GetOkSignThisMessage(hiMessage) {
        if (this._accountsByLegacyAddress.hasOwnProperty(hiMessage.legacyAddress)) {
            throw GetError(100);
        }
        let messageToBeSigned = this.GetRandomStringToBeSignedByClient();
        this._accountsByLegacyAddress[hiMessage.legacyAddress] = new Account(hiMessage.legacyAddress, messageToBeSigned);
        return {
            messageName: "OkSignThis",
            messageToSign: messageToBeSigned
        }
    }

    GetRandomStringToBeSignedByClient() {
        return ((Math.random() * Number.MAX_SAFE_INTEGER) * this._randomSeed).toString(); // TODO implement this with a real source of randomness
    }

    GetAuthenticationResult(verifyMeMessage) {
        if (this._accountsByLegacyAddress.hasOwnProperty(verifyMeMessage.legacyAddress)) {
            let accountToBeVerified = this._accountsByLegacyAddress[verifyMeMessage.legacyAddress];
            if (accountToBeVerified.currentVerificationState === Account.VerificationState.verified) {
                throw GetError(300);
            }
            let verified = SignatureVerifier.VerifySignature(
                accountToBeVerified.legacyAddress,
                accountToBeVerified.messageToBeSigned,
                verifyMeMessage.signature
            );
            if (verified) {
                return {
                    messageName: "AuthenticationSuccess"
                }
            }
            throw GetError(400);
        }
        throw GetError(200);
    }
};