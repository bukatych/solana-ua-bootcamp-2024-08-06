import "dotenv/config"
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";


const connection = new Connection(clusterApiUrl("devnet"));
console.log("⚡ Connection established");

const publicKey = new PublicKey('6MdFvx7pPGsGdhWhcU9SyAL23bbNhvmJTQmFf9w534CU');

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`💰 Balance of the wallet at address ${publicKey} is: ${balanceInSol} SOL`);