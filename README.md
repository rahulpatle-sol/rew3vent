# Rew3vent - Decentralized Event Platform

Rew3vent is a decentralized event platform built on **Solana**, powered by **Genkit AI**, and integrated with **Firebase** for seamless Web2.5 experiences. It enables users to create, discover, and participate in events with on-chain rewards, automated AI workflows, and a robust full-stack architecture.

---

## 🔥 Features

* ✅ Create & Join Web3-native Events
* 🎖️ Reward Participants On-chain via Solana
* 🧠 Genkit-powered AI Flows (Event Suggestions, Moderation)
* 🌐 Modern Web Stack (Next.js, Tailwind CSS, TypeScript)
* 🔐 Secure Auth via Firebase & NextAuth.js
* 🧪 Modular Smart Contracts in Rust

---

## 🧱 Project Structure

```
rew3vent/
├── apps/web/               # Next.js frontend (App Router)
│   └── src/app/            # Pages, components, API routes, AI flows
├── contracts/event-reward/ # Solana smart contract in Rust
│   ├── src/                # Rust source code
│   └── build.sh            # Contract build script
├── lib/                    # Shared backend utils (Firebase, Genkit, Solana Client)
├── scripts/                # Solana deployment & utility scripts
├── idl/                    # IDL for Solana smart contract
├── tests/                  # Test files (incl. contract tests)
├── .env.example            # Sample environment config
├── package.json            # Root dependency manager
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [Yarn](https://yarnpkg.com/) or `npm`
* [Rust](https://www.rust-lang.org/tools/install)
* [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
* (Optional) [Anchor CLI](https://book.anchor-lang.com/getting_started/installation.html)
* Firebase Project + Genkit API Key

### 1. Clone the Repository

```bash
git clone https://github.com/rahulpatle-sol/rew3vent.git
cd rew3vent
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Fill out the following variables:

* `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
* OAuth credentials for Google/GitHub (if used)
* `NEXT_PUBLIC_FIREBASE_*` variables (from Firebase Web App config)
* `GOOGLE_API_KEY` (from Google AI Studio)
* `GOOGLE_APPLICATION_CREDENTIALS` = `./firebase-admin-key.json`
* `SOLANA_RPC_URL` (e.g., [https://api.devnet.solana.com](https://api.devnet.solana.com))
* `SOLANA_PROGRAM_ID` (after deployment)
* `PAYER_SECRET_KEY` = JSON string of Solana keypair array

Generate keypair:

```bash
solana-keygen new --outfile ~/.config/solana/payer-keypair.json
```

### 4. Firebase Setup

* Enable **Authentication**, **Firestore**, and download Admin SDK key
* Place the Admin key JSON in root and update `.env`

### 5. Solana Smart Contract

**Build Contract**

```bash
cd contracts/event-reward
./build.sh
cd ../..
```

**Deploy Contract**

```bash
solana config set --url https://api.devnet.solana.com
solana config set --keypair ~/.config/solana/payer-keypair.json
solana airdrop 2 # if needed
./scripts/deploy-solana.sh
```

Update `.env` with the returned `SOLANA_PROGRAM_ID`.

### 6. Run the App

**Start AI Flows**

```bash
yarn genkit:dev
```

**Start Next.js App**

```bash
yarn dev
```

App runs at: [http://localhost:9002](http://localhost:9002)
Genkit UI: [http://localhost:4000](http://localhost:4000)

---

## 🧪 Development Overview

* **Frontend**: `apps/web/src/app/`
* **AI Flows**: `apps/web/src/ai/flows/`
* **Solana Contract**: `contracts/event-reward/src/`
* **Shared Backend**: `lib/`

---

## 🏁 Production Build

```bash
yarn build && yarn start
```

Ensure all required Genkit APIs and Firebase configs are set up in your deployment platform.

---

## 🧠 Tech Stack

| Layer      | Tech                                          |
| ---------- | --------------------------------------------- |
| Frontend   | Next.js (App Router), Tailwind CSS, ShadCN UI |
| Blockchain | Solana, Rust, Anchor-compatible               |
| AI         | Genkit (Google AI / Gemini)                   |
| Auth & DB  | Firebase Auth, Firestore                      |
| Dev Tools  | TypeScript, ESLint, Prettier                  |

---

## 🛠️ Next Steps

* [ ] Integrate Solana Wallet Adapter (`@solana/wallet-adapter-react`)
* [ ] Finalize full NextAuth.js support
* [ ] Improve POAP & Reward Logic in Smart Contract
* [ ] Add Test Coverage for Contracts & Web
* [ ] Expand AI Flows: Recommendations, Moderation, Insights

---

## 👨‍💻 Author

Built with ❤️ by **[Rahul Patle](https://github.com/rahulpatle-sol)** as part of Solana Breakout Hackathon.

---

## 📜 License

This project is licensed under the MIT License.

---

> "Empowering decentralized communities to celebrate and collaborate through events — on-chain and beyond."
