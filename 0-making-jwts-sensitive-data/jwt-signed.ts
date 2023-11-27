import * as crypto from 'crypto';
import { toBase64 } from './utils';

export function hmac(data: string, secret: string, algorithm: string) {
    return crypto.createHmac(algorithm, secret)
                 .update(data)
                 .digest('base64');
}

export function encodeSignedHmac<Header, Payload>(payload: Payload) {
    // Your secret key
    // please, use a better secret key and keep it safe!
    const secretKey = 'my-sinergija-secret'; 

    // HMAC algorithm
    const algorithm = 'sha256';

    // Header
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    // Encode Header
    const headerEnc = toBase64(JSON.stringify(header));
    const payloadEnc = toBase64(JSON.stringify(payload));
    const signature = toBase64(hmac(`${headerEnc}.${payloadEnc}`, secretKey, algorithm));
    return `${headerEnc}.${payloadEnc}.${signature}`;
}