'use client';

import React from 'react';
import { BookText, SpellCheck } from 'lucide-react'; // Icons for verbs and adjectives
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar'; // Import useSidebar hook
import type { GameType } from '@/app/page'; // Import GameType

interface SidebarNavProps {
  onSelectGameType: (type: GameType) => void; // Callback to update game type in parent
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onSelectGameType }) => {
  const { setOpenMobile } = useSidebar(); // Get setOpenMobile from context

  const handleSelect = (type: GameType) => {
    onSelectGameType(type); // Call the callback passed from parent
    setOpenMobile(false); // Close mobile sidebar on selection
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Re-add onClick handler */}
        <SidebarMenuButton onClick={() => handleSelect('verbs')} tooltip="Play Verb Game">
          <BookText />
          <span>Verbs</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
         {/* Re-add onClick handler */}
        <SidebarMenuButton onClick={() => handleSelect('adjectives')} tooltip="Play Adjective Game">
           <SpellCheck />
          <span>Adjectives</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarNav;
