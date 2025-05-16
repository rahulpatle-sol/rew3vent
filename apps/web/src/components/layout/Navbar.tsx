
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConnectWalletButton from '@/components/shared/ConnectWalletButton';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';

const publicNavLinks = [
  { href: '/events', label: 'Events' },
  { href: '/explore', label: 'Explore' },
];

const authenticatedNavLinks = [
  { href: '/create-event', label: 'Create Event' },
  { href: '/my-events', label: 'My Events' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/host/dashboard', label: 'Host Dashboard' },
];

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  const navLinks = isAuthenticated 
    ? [...publicNavLinks, ...authenticatedNavLinks] 
    : publicNavLinks;

  return (
    <header className="bg-card/50 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-8 w-8 text-primary group-hover:animate-pulse-glow transition-all" />
          <h1 className="text-2xl font-display text-gradient-neon">Rew3vent</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ConnectWalletButton />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Sparkles className="h-7 w-7 text-primary group-hover:animate-pulse-glow transition-all" />
                        <h2 className="text-xl font-display text-gradient-neon">Rew3vent</h2>
                    </Link>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetClose>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-foreground/90 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <ConnectWalletButton className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

