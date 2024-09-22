'use client';

import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { ThemeToggle } from '@/styles/theme/theme-toggle';
import { ThemeProvider } from '@/styles/theme/theme-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
      <ThemeToggle />
      <Toaster richColors closeButton position="top-right" />
      {children}
    </ThemeProvider>
  );
};
