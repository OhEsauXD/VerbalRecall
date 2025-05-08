'use client';

import React from 'react';
import { BookText, SpellCheck, Home, PawPrint } from 'lucide-react'; // Import PawPrint
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import type { GameType } from '@/app/page';

interface SidebarNavProps {
  onSelectGameType: (type: GameType) => void;
  onGoHome: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onSelectGameType, onGoHome }) => {
  const { setOpenMobile } = useSidebar();

  const handleSelectGame = (type: GameType) => {
    onSelectGameType(type);
    setOpenMobile(false);
  };

  const handleGoHomeClick = () => {
    onGoHome();
    setOpenMobile(false);
  };

  return (
    <SidebarMenu>
       <SidebarMenuItem>
        <SidebarMenuButton onClick={handleGoHomeClick} tooltip="Go Home">
          <Home />
          <span>Home</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('verbs')} tooltip="Play Verb Game">
          <BookText />
          <span>Verbs</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('adjectives')} tooltip="Play Adjective Game">
           <SpellCheck />
          <span>Adjectives</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem> {/* New Item for Animals */}
        <SidebarMenuButton onClick={() => handleSelectGame('animals')} tooltip="Play Animal Game">
           <PawPrint />
          <span>Animals</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarNav;

    