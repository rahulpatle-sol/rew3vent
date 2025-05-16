"use client";
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
// Placeholder for Solana wallet adapter integration
// import { useWallet, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
// import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// require('@solana/wallet-adapter-react-ui/styles.css'); // If using wallet-adapter UI

interface WalletContextType {
  // publicKey: string | null; // From wallet adapter
  connected: boolean;
  // connect: () => Promise<void>; // From wallet adapter
  // disconnect: () => Promise<void>; // From wallet adapter
  // signTransaction: (transaction: any) => Promise<any>; // Placeholder
  // signMessage: (message: Uint8Array) => Promise<Uint8Array>; // Placeholder
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// const wallets = [
//   new PhantomWalletAdapter(),
//   new SolflareWalletAdapter(),
// ];

export function WalletProvider({ children }: { children: ReactNode }) {
  // const wallet = useWallet(); // From Solana wallet adapter

  // Placeholder state until Solana Wallet Adapter is fully integrated
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    // Simulate checking wallet connection status
    const storedWalletState = localStorage.getItem('rew3vent_wallet_connected_placeholder');
    if (storedWalletState === 'true') {
      setConnected(true);
    }
  }, []);


  const value = {
    // publicKey: wallet.publicKey?.toBase58() || null,
    // connected: wallet.connected,
    // connect: wallet.connect,
    // disconnect: wallet.disconnect,
    // signTransaction: wallet.signTransaction,
    // signMessage: wallet.signMessage,
    connected, // Placeholder
  };

  return (
    // <SolanaWalletProvider wallets={wallets} autoConnect>
    //   <WalletModalProvider>
        <WalletContext.Provider value={value}>
          {children}
        </WalletContext.Provider>
    //   </WalletModalProvider>
    // </SolanaWalletProvider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}
