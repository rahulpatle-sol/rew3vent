'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Wallet, LogOut, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation';

// Ensure Solana Wallet is Available
const getWalletProvider = () => {
  return (window as any).solana  ||(window as any).metamask;
};



// Check if the wallet is connected
const isWalletConnected = async () => {
  const walletProvider = getWalletProvider();
  if (!walletProvider) return false;
  try {
    const accounts = await walletProvider.request({ method: 'eth_accounts' });
    return accounts.length > 0;
  }

  catch (error) {
    console.error("Error checking wallet connection:", error);
    return false;
  }
};
// Connect to the wallet


export default function ConnectWalletButton({ className }: { className?: string }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [walletConnected, setWalletConnected] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (isAuthenticated) {
      const storedWalletState = localStorage.getItem('rew3vent_wallet_connected_placeholder');
      if (storedWalletState === 'true') {
        setWalletConnected(true);
      }
    } else {
      setWalletConnected(false);
      localStorage.removeItem('rew3vent_wallet_connected_placeholder');
    }
  }, [isAuthenticated]);

  const handleConnect = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const wallet = getWalletProvider();
    if (!wallet) {
      toast({
        title: "No Wallet Found",
        description: "Please install a Solana-compatible wallet like Phantom.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await wallet.connect();
      console.log("Connected Wallet Address:", response.publicKey.toString());
      setWalletConnected(true);
      localStorage.setItem('rew3vent_wallet_connected_placeholder', 'true');
      toast({
        title: "Wallet Connected",
        description: `Connected: ${response.publicKey.toString()}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Wallet Connection Error:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect wallet. Try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      const wallet = getWalletProvider();
      if (wallet) await wallet.disconnect();
      setWalletConnected(false);
      localStorage.removeItem('rew3vent_wallet_connected_placeholder');
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
        variant: "default",
      });
    } catch (error) {
      console.error("Disconnect Error:", error);
    }
  };

  if (!isMounted || authLoading) {
    return <Button variant="outline" className={cn("opacity-50", className)} disabled><Wallet className="mr-2 h-4 w-4" /> Loading...</Button>;
  }

  if (!isAuthenticated) {
    return (
      <Button onClick={() => router.push('/login')} className={cn("button-neon-glow", className)}>
        <LogIn className="mr-2 h-4 w-4" />
        Login to Connect
      </Button>
    );
  }

  return walletConnected ? (
    <Button variant="outline" onClick={handleDisconnect} className={cn("border-primary text-primary hover:bg-primary/10 hover:text-primary", className)}>
      <LogOut className="mr-2 h-4 w-4" />
      Disconnect Wallet
    </Button>
  ) : (
    <Button onClick={handleConnect} className={cn("button-neon-glow", className)}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
