import { Connection, Keypair, PublicKey } from '@solana/web3.js';
// import { AnchorProvider, Program } from '@project-serum/anchor'; // If using Anchor
// import { IDL as EventRewardIDL } from '../idl/event_reward'; // Adjust path if IDL is generated

// --- Configuration ---
// It's highly recommended to use environment variables for sensitive data like private keys and RPC URLs.
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com'; // Default to devnet
const PROGRAM_ID_STRING = process.env.SOLANA_PROGRAM_ID || 'YourProgramIdGoesHere111111111111111111111111'; // Replace with your deployed program ID

// This is a placeholder for a payer keypair.
// In a real application, this keypair should have SOL for paying transaction fees.
// NEVER COMMIT A REAL PRIVATE KEY TO YOUR REPOSITORY. LOAD IT FROM ENV VARS.
const PAYER_SECRET_KEY_STRING = process.env.PAYER_SECRET_KEY; // e.g., a base58 encoded string or path to a keyfile.json
let payer: Keypair;

if (PAYER_SECRET_KEY_STRING) {
    try {
        // Attempt to parse as a byte array (e.g., from a JSON file content or direct byte array string)
        const secretKeyBytes = Uint8Array.from(JSON.parse(PAYER_SECRET_KEY_STRING));
        payer = Keypair.fromSecretKey(secretKeyBytes);
    } catch (e) {
        console.warn("Could not parse PAYER_SECRET_KEY as JSON byte array, attempting as base58 string. For production, use a secure way to load your keypair.");
        // Fallback: try to interpret as a base58 secret key if not a JSON array (less common for direct env var)
        // This part is less standard for env vars and more for direct use if you had a base58 string
        // For a file path, you'd read the file content here.
        // For simplicity, we'll assume if it's not a JSON array, it's not a valid key for this example.
        // Consider using a more robust key management strategy for production.
        // For now, if it's not a JSON byte array, we'll let it fail or use a default insecure key for local dev only.
         // payer = Keypair.generate(); // Fallback to a new keypair if parsing fails (NOT FOR PRODUCTION)
         // console.warn("Failed to load payer keypair from ENV, generated a new one for this session (DEV ONLY).");
        throw new Error("PAYER_SECRET_KEY is set but could not be parsed. Ensure it's a JSON string representation of a Uint8Array (e.g., '[1,2,3,...]').");
    }
} else {
    console.warn("PAYER_SECRET_KEY environment variable not set. Using a new randomly generated keypair for this session. THIS IS FOR DEVELOPMENT ONLY AND WILL NOT PERSIST.");
    payer = Keypair.generate(); // Generate a new keypair if no secret is provided (FOR DEV ONLY)
}


// --- Solana Connection and Provider ---
export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// --- Program Interaction (Generic example, adapt if using Anchor) ---
export const programId = new PublicKey(PROGRAM_ID_STRING);

export function getPayer(): Keypair {
    if (!payer) {
        throw new Error("Payer keypair is not initialized. Ensure PAYER_SECRET_KEY is set in your .env file.");
    }
    return payer;
}

// If using Anchor, you would set up the provider and program like this:
/*
export function getAnchorProvider(wallet?: { publicKey: PublicKey, signTransaction: any, signAllTransactions: any }): AnchorProvider {
    const defaultWallet = {
        publicKey: getPayer().publicKey,
        signTransaction: async (tx: any) => {
            tx.partialSign(getPayer());
            return tx;
        },
        signAllTransactions: async (txs: any[]) => {
            txs.forEach(tx => tx.partialSign(getPayer()));
            return txs;
        },
    };

    const provider = new AnchorProvider(
        connection,
        wallet || defaultWallet,
        AnchorProvider.defaultOptions()
    );
    return provider;
}

// export const eventRewardProgram = new Program(EventRewardIDL, programId, getAnchorProvider());
*/

// --- Utility Functions ---
export async function getBalance(publicKey: PublicKey): Promise<number> {
    return connection.getBalance(publicKey);
}

export async function requestAirdrop(publicKey: PublicKey, lamports: number = 1_000_000_000): Promise<string> {
    console.log(`Requesting airdrop of ${lamports / 1_000_000_000} SOL to ${publicKey.toBase58()}...`);
    const signature = await connection.requestAirdrop(publicKey, lamports);
    await connection.confirmTransaction(signature, 'confirmed');
    console.log(`Airdrop successful. Transaction signature: ${signature}`);
    return signature;
}

// Example usage (can be removed or adapted)
async function main() {
    try {
        const payerKeypair = getPayer();
        console.log("Payer public key:", payerKeypair.publicKey.toBase58());
        
        let balance = await getBalance(payerKeypair.publicKey);
        console.log(`Payer balance: ${balance / 1_000_000_000} SOL`);

        if (balance < 500_000_000 && SOLANA_RPC_URL.includes('devnet')) { // Airdrop if low balance on devnet
             await requestAirdrop(payerKeypair.publicKey);
             balance = await getBalance(payerKeypair.publicKey);
             console.log(`New payer balance: ${balance / 1_000_000_000} SOL`);
        }
        console.log("Solana client initialized.");
        console.log("Program ID:", programId.toBase58());

    } catch (error) {
        console.error("Error in Solana client setup:", error);
    }
}

// main(); // Call main for testing setup; remove for library use
