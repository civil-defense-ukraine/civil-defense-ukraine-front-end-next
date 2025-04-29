'use client';

import { MenuProvider } from '@/components/context/MenuContext';
import { TopBar } from '@/components/components/TopBar/TopBar';
import { Footer } from '@/components/components/Footer/Footer';

export const MenuClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <MenuProvider>
        <TopBar />
        {children}
        <Footer />
    </MenuProvider>
  );
};
