# Rew3vent - Decentralized Event Platform

Rew3vent is a platform for creating, discovering, and participating in events, leveraging Web3 technologies like Solana for on-chain rewards and interactions, and Genkit for AI-powered features.

## Project Structure

The project is organized as a monorepo-like structure:

-   **`apps/web/`**: The Next.js frontend application.
    -   `src/app/`: Contains all Next.js pages, components, API routes, and AI flows.
    -   `public/`: Static assets.
-   **`contracts/event-reward/`**: The Solana smart contract written in Rust.
    -   `src/`: Rust source code for the smart contract.
    -   `Cargo.toml`: Rust package manager file.
    -   `build.sh`: Script to build the contract.
-   **`lib/`**: Common backend utilities (Node.js) for Firebase, Solana client, and Genkit initialization.
-   **`scripts/`**: Deployment and utility scripts (e.g., deploying the Solana contract).
-   **`idl/`**: Solana Interface Description Language (IDL) files for the smart contract.
-   **`tests/`**: Test files, including tests for the Solana contract.
-   **`.env.example`**: Example environment variable configuration.
-   **`package.json`**: Root package file managing workspaces or global dependencies.

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   Yarn or npm
-   Rust and Cargo (for Solana contract development): [Install Rust](https://www.rust-lang.org/tools/install)
-   Solana CLI: [Install Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
-   (Optional) Anchor CLI (if using Anchor for Solana development): [Install Anchor](https://www.anchor-lang.com/docs/installation)
-   Firebase Account and Project: [Firebase Console](https://console.firebase.google.com/)
-   Google AI Studio API Key (for Genkit): [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd rew3vent
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```

**Key variables to configure:**

-   `NEXTAUTH_URL`, `NEXTAUTH_SECRET` (generate a secret)
-   Google/GitHub OAuth credentials (if using NextAuth for social login)
-   `NEXT_PUBLIC_FIREBASE_*` variables for Firebase client-side SDK.
-   `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Firebase Admin SDK service account key JSON file.
-   `GOOGLE_API_KEY`: Your Google AI Studio API key.
-   `SOLANA_RPC_URL`: The Solana RPC endpoint (e.g., devnet).
-   `SOLANA_PROGRAM_ID`: Will be set after deploying your Solana contract.
-   `PAYER_SECRET_KEY`: Your Solana payer account's secret key (byte array as a JSON string).
    -   Generate a new keypair: `solana-keygen new --outfile ~/.config/solana/payer-keypair.json`
    -   Copy the byte array content from `payer-keypair.json` and format it as a JSON string in your `.env` file (e.g., `PAYER_SECRET_KEY="[12,34,56,...]"`)

### 4. Firebase Setup

1.  Go to your Firebase project settings in the Firebase Console.
2.  **Web App Setup**:
    -   Add a web app to your Firebase project.
    -   Copy the Firebase SDK snippet configuration (apiKey, authDomain, etc.) and update the `NEXT_PUBLIC_FIREBASE_*` variables in your `.env` file.
3.  **Admin SDK Setup**:
    -   Go to "Project settings" > "Service accounts".
    -   Generate a new private key and download the JSON file.
    -   Save this file securely (e.g., in the root of your project, but ensure it's in your `.gitignore`).
    -   Set the `GOOGLE_APPLICATION_CREDENTIALS` variable in your `.env` file to the path of this JSON file (e.g., `GOOGLE_APPLICATION_CREDENTIALS=./my-service-account-key.json`).
4.  **Enable Firebase Services**:
    -   Enable Firestore (Native mode recommended for new projects).
    -   Enable Firebase Authentication and configure desired sign-in methods (e.g., Email/Password, Google, GitHub).

### 5. Solana Smart Contract

1.  **Build the Contract**:
    ```bash
    cd contracts/event-reward
    ./build.sh
    cd ../..
    ```
    This will compile the Rust code and place the `.so` file in `contracts/event-reward/target/deploy/`.

2.  **Deploy the Contract**:
    -   Ensure your Solana CLI is configured to the desired network (e.g., devnet) and has a funded payer keypair.
        ```bash
        solana config set --url https://api.devnet.solana.com
        solana config set --keypair ~/.config/solana/payer-keypair.json # Or your keypair path
        solana balance # Check balance, airdrop if needed on devnet: solana airdrop 2
        ```
    -   Run the deployment script:
        ```bash
        ./scripts/deploy-solana.sh
        ```
    -   After successful deployment, the script will output the **Program ID**. Update `SOLANA_PROGRAM_ID` in your `.env` file with this ID.
    -   If using Anchor, the IDL might also be updated and copied to the `idl/` directory.

### 6. Running the Application

1.  **Start the Genkit Development Server** (for local AI flow development, in a separate terminal):
    ```bash
    npm run genkit:dev
    # or
    yarn genkit:dev
    ```

2.  **Start the Next.js Development Server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The Next.js application will be available at `http://localhost:9002` (or the port specified in `package.json`).
Genkit UI (if configured and flows are running) might be available at `http://localhost:4000`.

## Development

-   **Next.js Frontend**: `apps/web/src/app/`
-   **Genkit AI Flows**: `apps/web/src/ai/flows/` and `lib/genkit.ts` (root level for now, may move to `apps/web/src/ai` if aliasing is preferred).
-   **Solana Contract**: `contracts/event-reward/src/`
-   **Shared Backend Logic**: `lib/`

### Building for Production

```bash
npm run build
# or
yarn build
```

This will build the Next.js application in `apps/web/.next/`.

### Running in Production

```bash
npm run start
# or
yarn start
```

Ensure your Genkit flows are deployed or accessible in your production environment if they are called via API routes.

## Key Technologies

-   Next.js (App Router)
-   TypeScript
-   Tailwind CSS & ShadCN UI
-   Genkit (for AI features, using Google AI/Gemini by default)
-   Firebase (Authentication, Firestore)
-   Solana (for smart contracts and on-chain interactions)
-   Rust (for Solana smart contract development)
-   NextAuth.js (for authentication, if fully implemented)

## Further Steps

-   Implement full NextAuth.js integration for robust user authentication.
-   Develop detailed Solana smart contract logic for event creation, POAPs, and reward distribution.
-   Integrate frontend components with Solana wallet adapters (`@solana/wallet-adapter-react`).
-   Create more Genkit flows for advanced AI features (e.g., personalized event recommendations, automated content moderation).
-   Write comprehensive tests for both frontend and smart contracts.
