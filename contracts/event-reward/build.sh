#!/bin/bash

# Exit script on error
set -e

# Navigate to the contract directory
# cd "$(dirname "$0")" # Uncomment if running from a different directory

echo "Building Solana program..."

# Build the BPF program
cargo build-bpf --manifest-path=Cargo.toml --bpf-out-dir=./target/deploy

# (Optional) Generate IDL if using Anchor
# Ensure Anchor CLI is installed: https://www.anchor-lang.com/docs/installation
# if cargo tree -p anchor-lang &> /dev/null; then
#   echo "Anchor detected, generating IDL..."
#   anchor build --idl ../../idl # Output IDL to root idl/ directory
#   # Copy the built program to a known location if anchor build doesn't place it where expected by deploy scripts
#   # cp target/deploy/event_reward.so ../../target/deploy/
# else
#   echo "Anchor not detected or not used in this project, skipping IDL generation via Anchor CLI."
#   echo "If you are using Anchor, ensure 'anchor-lang' is a dependency and the Anchor CLI is installed."
# fi


# The compiled program .so file will be in ./target/deploy/event_reward.so
PROGRAM_SO_PATH="./target/deploy/event_reward.so"

if [ -f "$PROGRAM_SO_PATH" ]; then
  echo "Build successful!"
  echo "Program .so file located at: $PROGRAM_SO_PATH"
  
  # Optional: copy to a common target directory if needed by other scripts
  # mkdir -p ../../target/deploy
  # cp $PROGRAM_SO_PATH ../../target/deploy/
  # echo "Copied .so file to ../../target/deploy/"
else
  echo "Build failed or .so file not found at expected location."
  exit 1
fi

echo "To deploy, you can use a command like:"
echo "solana program deploy $PROGRAM_SO_PATH"
