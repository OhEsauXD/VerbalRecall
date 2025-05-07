'use client';

import React from 'react';
import { BookText, SpellCheck } from 'lucide-react'; // Icons for verbs and adjectives
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar'; // Import useSidebar hook

type GameType = 'verbs' | 'adjectives';

interface SidebarNavProps {
  setActiveGameType: (type: GameType | null) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ setActiveGameType }) => {
  const { setOpenMobile } = useSidebar(); // Get setOpenMobile from context

  const handleSelect = (type: GameType | null) => {
    setActiveGameType(type);
    setOpenMobile(false); // Close mobile sidebar on selection
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelect('verbs')} tooltip="Play Verb Game">
          <BookText />
          <span>Verbs</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelect('adjectives')} tooltip="Play Adjective Game">
           <SpellCheck />
          <span>Adjectives</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
       {/* Add a button to go back to the main selection screen */}
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelect(null)} tooltip="Select Game">
          {/* You might want a different icon here, e.g., Home */}
          <span>Select Game</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarNav;
