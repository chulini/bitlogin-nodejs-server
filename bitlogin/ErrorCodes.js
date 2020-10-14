const allErrors = {
    100: new Error("This legacy address is already in the system"),
    200: new Error("Server doesn't know anything about you. Please send a hi message first."),
    300: new Error("Can't verify an already verified account"),
    400: new Error("Message signature doesn't match the sent message"),
    500: new Error("The string you are sending as signature is not even a signature"),
    600: new Error("Can't LogOut an unknown account")
}

module.exports = {
    GetError: (errorCode) => {
        return allErrors[errorCode];
    }
}