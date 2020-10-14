module.exports = class Account {
    constructor(legacyAddress, messageToBeSigned) {
        this._currentVerificationState = Account.VerificationState.unverified;
        this._legacyAddress = legacyAddress;
        this._messageToBeSigned = messageToBeSigned;
    }

    get legacyAddress() {
        return this._legacyAddress;
    }

    get messageToBeSigned() {
        return this._messageToBeSigned;
    }

    get currentVerificationState() {
        return this._currentVerificationState;
    }

    static get VerificationState() {
        return {
            unknown: 0,
            unverified: 1,
            verified: 2
        }
    }

}