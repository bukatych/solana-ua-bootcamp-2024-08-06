import "dotenv/config";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const privateKey = process.env.SECRET_KEY;
if (privateKey === undefined) {
  console.log("❌ Please provide a secret key in the .env file");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key: ${sender.publicKey.toBase58()}`);

const recipient = new PublicKey("3UdMnyJDAUh1mbJGAbENJwLzvqcdp8nziCCwuv11DZk2");
console.log(`💸 Attempting to send 0.01 SOL to: ${recipient.toBase58()}`);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);

const memoProgram = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
);

const memoText = "Hello from Solana! IB sends greetings!";

const addMemoInstruction = new TransactionInstruction({
  keys: [
    {
      pubkey: sender.publicKey,
      isSigner: true,
      isWritable: true,
    },
  ],
  data: Buffer.from(memoText, "utf-8"),
  programId: memoProgram,
});

transaction.add(addMemoInstruction);

console.log(`📝 memo is: ${memoText}`);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`✅ Transaction confirmed, signature: ${signature}`);
