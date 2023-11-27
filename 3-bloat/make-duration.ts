import { encodeSignedHmac } from "../0-making-jwts-sensitive-data/jwt-signed";
import { payload, bloatedPayload } from "./data";
import {performance} from 'perf_hooks';

const run = 50_000;

console.log(`Generating ${run} normal tokens...`);
const startNormal = performance.now();
let signed: string = "";
for (let index = 0; index < run; index++) {
    signed = encodeSignedHmac(payload);
}
const endNormal = performance.now();
console.log('Signed JWT:');
//console.log(signed);
console.log(`Normal JWT length: ${signed.length}`);
console.log(`Normal Time: ${endNormal - startNormal}ms`);

console.log();

console.log(`Generating ${run} bloated tokens...`);
const startBloated = performance.now();
let signedBloated: string = "";
for (let index = 0; index < run; index++) {
    signedBloated = encodeSignedHmac(bloatedPayload);
}
const endBloated = performance.now();
console.log('Signed JWT with bloated data:');
//console.log(signedBloated);
console.log(`Bloated JWT length: ${signedBloated.length}`);
console.log(`Bloated Time: ${endBloated - startBloated}ms`);