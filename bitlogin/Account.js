module.exports = class Account {
    constructor(legacyAddress, messageToBeSigned) {
        this._currentVerificationState = Account.VerificationState.unverified;
        this._legacyAddress = legacyAddress;
        this._messageToBeSigned = messageToBeSigned;
    }

    static get VerificationState() {
        return {
            unknown: 0,
            unverified: 1,
            verified: 2
        }
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

    SetVerificationState(newVerificationState) {
        return this._currentVerificationState = newVerificationState;
    }


}