export const encode = (message: string, secret: string) => {
    let encodedMessage = '';
    for (let i = 0; i < message.length; i++) {
        let charCode = message.charCodeAt(i) + secret.charCodeAt(i % secret.length);
        encodedMessage += String.fromCharCode(charCode);
    }
    return encodedMessage;
}

export const decode = (encodedMessage: string, secret: string) => {
    let decodedMessage = '';
    for (let i = 0; i < encodedMessage.length; i++) {
        let charCode = encodedMessage.charCodeAt(i) - secret.charCodeAt(i % secret.length);
        decodedMessage += String.fromCharCode(charCode);
    }
    return decodedMessage;
}
