'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
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
    </header>
  );
}
