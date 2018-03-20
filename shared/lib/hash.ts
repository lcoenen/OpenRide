import * as crypto from 'crypto';

function checksum (str, algorithm?, encoding?) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

export function hash(...str: any[]) : string {

	return checksum(str.reduce((a,b) => a + b, ''));

}

console.log(`Trying to get ${ hash("salut", "ehllo", 22) }`)
