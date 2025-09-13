'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logo.svg"
              alt="Qemer Logo"
              width={40}
              height={40}
            />
            <span className="font-bold text-3xl text-primary">Qemer</span>
          </Link>
        </div>

        {/* Theme Selector */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
