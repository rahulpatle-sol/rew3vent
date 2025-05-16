#!/bin/bash

# Exit script on error
set -e

# --- Configuration ---
# You can set these as environment variables or define them here
# SOLANA_CLI_CONFIG=${SOLANA_CLI_CONFIG:-"~/.config/solana/cli/config.yml"} # Default Solana CLI config path
# KEYPAIR_PATH=${KEYPAIR_PATH:-"~/.config/solana/id.json"} # Path to your deployer keypair
# RPC_URL=${RPC_URL:-"https://api.devnet.solana.com"} # Solana RPC URL (devnet, testnet, mainnet-beta)

PROGRAM_NAME="event_reward" # Should match the name in Cargo.toml and your .so file
PROGRAM_SO_PATH="./contracts/event-reward/target/deploy/${PROGRAM_NAME}.so"

# --- Pre-checks ---
if [ ! -f "$PROGRAM_SO_PATH" ]; then
  echo "Error: Program .so file not found at $PROGRAM_SO_PATH"
  echo "Please build the program first using 'cd contracts/event-reward && ./build.sh' or 'cargo build-bpf --bpf-out-dir=./target/deploy'"
  exit 1
fi

# Check if Solana CLI is installed
if ! command -v solana &> /dev/null; then
    echo "Solana CLI could not be found. Please install it: https://docs.solana.com/cli/install-solana-cli-tools"
    exit 1
fi

# --- Display Current Configuration (Optional but helpful) ---
echo "--- Solana CLI Configuration ---"
solana config get
echo "--------------------------------"
echo "Using Program SO: $PROGRAM_SO_PATH"
echo "Deployer Keypair (from Solana CLI config): $(solana config get keypair)"
echo "RPC URL (from Solana CLI config): $(solana config get json_rpc_url)"
echo "--------------------------------"

# --- Deployment ---
echo "Deploying Solana program: $PROGRAM_NAME..."

# The `solana program deploy` command uses the keypair and RPC URL set in the Solana CLI config.
# Make sure your Solana CLI is configured correctly for the desired network and deployer account.
# To set config:
# solana config set --url <RPC_URL>
# solana config set --keypair <PATH_TO_YOUR_KEYPAIR_JSON_FILE>

DEPLOY_OUTPUT=$(solana program deploy "$PROGRAM_SO_PATH")

# --- Output ---
echo "$DEPLOY_OUTPUT"

# Extract Program ID from output (this might need adjustment based on Solana CLI version output format)
PROGRAM_ID=$(echo "$DEPLOY_OUTPUT" | grep "Program Id:" | awk '{print $3}')

if [ -z "$PROGRAM_ID" ]; then
  echo "Failed to extract Program ID from deployment output."
  echo "Please check the output above for errors."
  exit 1
else
  echo "--------------------------------"
  echo "Program deployed successfully!"
  echo "Program ID: $PROGRAM_ID"
  echo "--------------------------------"
  echo "Update your .env file or application configuration with this Program ID."
  echo "Example for .env: SOLANA_PROGRAM_ID=$PROGRAM_ID"
fi

# --- (Optional) Update IDL if using Anchor ---
# If you're using Anchor and your build script doesn't handle IDL updates on deploy,
# you might want to run `anchor idl init <PROGRAM_ID> --provider.cluster <CLUSTER>`
# or similar commands here.
# For example:
# if cargo tree -p anchor-lang &> /dev/null; then
#   echo "Anchor project detected. Initializing IDL for program: $PROGRAM_ID"
#   anchor idl init "$PROGRAM_ID" --provider.cluster $(solana config get json_rpc_url | awk -F'/' '{print $3}' | awk -F'.' '{print $2}') -f target/idl/${PROGRAM_NAME}.json
#   cp target/idl/${PROGRAM_NAME}.json idl/ # Copy to root IDL folder
#   echo "IDL updated and copied to idl/ directory."
# fi

echo "Deployment script finished."
