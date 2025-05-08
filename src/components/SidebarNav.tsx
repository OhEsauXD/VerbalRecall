'use client';

import React from 'react';
import { BookText, SpellCheck, Home } from 'lucide-react'; // Icons for verbs, adjectives, and home
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar'; // Import useSidebar hook
import type { GameType } from '@/app/page'; // Import GameType

interface SidebarNavProps {
  onSelectGameType: (type: GameType) => void; // Callback to update game type in parent
  onGoHome: () => void; // Callback to navigate home
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onSelectGameType, onGoHome }) => {
  const { setOpenMobile } = useSidebar(); // Get setOpenMobile from context

  const handleSelectGame = (type: GameType) => {
    onSelectGameType(type); // Call the callback passed from parent
    setOpenMobile(false); // Close mobile sidebar on selection
  };

  const handleGoHomeClick = () => {
    onGoHome(); // Call the home callback
    setOpenMobile(false); // Close mobile sidebar
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
    </SidebarMenu>
  );
};

export default SidebarNav;
