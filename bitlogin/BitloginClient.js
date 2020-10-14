const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoinMessage = require('bitcoinjs-message')

module.exports = class BitloginClient {

    constructor(mnemonic) {
        this._canModifyPublicId = true;

        if (mnemonic != null) {
            this._SetMnemonic(mnemonic);
        } else {
            this._SetMnemonic(bip39.generateMnemonic());
        }

        if (!bip39.validateMnemonic(this._mnemonic)) {
            throw new Error(`Can't create BitloginClient with invalid mnemonic. Mnemonic "${this._mnemonic}" is not valid.`);
        }
    }

    _SetMnemonic(mnemonic) {
        this._mnemonic = mnemonic;
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const node = bip32.fromSeed(seed);
        this._legacyAddress = this._GetLegacyAddress(node, bitcoin.networks.bitcoin);
        this._publicId = this._GetSegwitAddressViaP2SH(node, bitcoin.networks.bitcoin);
    }

    _GetLegacyAddress(node, network) {
        return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
    }
    _GetSegwitAddressViaP2SH(node, network) {
        return bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network })
        }).address;
    }

    GetHiMessage() {
        let thisClient = this;
        return {
            mesageName: 'Hi',
            legacyAddress: thisClient._legacyAddress
        };
    }

    SignMessage(messageToSign) {
        const seed = bip39.mnemonicToSeedSync(this._mnemonic);
        const node = bip32.fromSeed(seed);
        return bitcoinMessage.sign(messageToSign, node.privateKey, true).toString('base64');
    }

    GetVerifyMeMessage(okSignThisMessage) {
        return {
            messageName: 'VerifyMe',
            signature: this.SignMessage(okSignThisMessage.messageToSign),
            legacyAddress: this._legacyAddress,
            publicIdIWantToHave: this._publicId
        }
    }

};