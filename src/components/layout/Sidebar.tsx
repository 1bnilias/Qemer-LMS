'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Search,
  BarChart3,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    title: 'Learning',
    items: [
      { href: '/', label: 'Dashboard', icon: BookOpen },
      { href: '/catalog', label: 'Course Catalog', icon: Search },
      { href: '/my-courses', label: 'My Courses', icon: BookOpen },
    ]
  },
  {
    title: 'Progress',
    items: [
      { href: '/progress', label: 'My Progress', icon: BarChart3 },
      { href: '/schedule', label: 'Schedule', icon: Calendar },
    ]
  },
  {
    title: 'Account',
    items: [
      { href: '/settings', label: 'Settings', icon: Settings },
      { href: '/help', label: 'Help & Support', icon: HelpCircle },
    ]
  }
];

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-6">
              {navigationItems.map((section) => (
                <div key={section.title}>
                  <h4 className="mb-2 px-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={isActive ? 'secondary' : 'ghost'}
                            className={cn(
                              'w-full justify-start',
                              isActive && 'bg-secondary font-medium'
                            )}
                            onClick={onClose}
                          >
                            <Icon className="mr-3 h-4 w-4" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground text-center">
              © 2025 Qemer LMS
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
