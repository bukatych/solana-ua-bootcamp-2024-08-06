import "dotenv/config";

import {Keypair} from "@solana/web3.js";
import * as fs from "fs";

console.time('start_generate_keypair');
for (let i = 0; i < 1_000_000_000; i++) {
    const keypair = Keypair.generate();
    if (i === 0) {
        console.time('keypair');
    }
    // console.log("Public key:", keypair.publicKey.toBase58());
    // console.log("Private key:", keypair.secretKey.toString());

    if (i > 0 && i % 1_000_000 === 0) {
        console.log(`🔑 Generated ${i / 1_000_000}KK keypairs;`);
        console.timeEnd('keypair');
        console.time('keypair');
    }

    if (keypair.publicKey.toBase58().toLowerCase().substring(0, 4) === 'buka') {
        console.log("⚡ Generated keypair matches the provided public key");
        console.log("Public key:", keypair.publicKey.toBase58());
        console.log("Private key:", keypair.secretKey.toString());
        fs.writeFileSync('kumeka-keys.json', JSON.stringify({
            SECRET_KEY: keypair.secretKey.toString(),
            PUBLIC_KEY: keypair.publicKey.toBase58()
        }));
        break;
    }
}
console.timeEnd('start_generate_keypair');