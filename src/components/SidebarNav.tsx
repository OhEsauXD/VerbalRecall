'use client';

import React from 'react';
import { BookText, SpellCheck } from 'lucide-react'; // Icons for verbs and adjectives
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar'; // Import useSidebar hook

type GameType = 'verbs' | 'adjectives';

interface SidebarNavProps {
 // Removed setActiveGameType prop
 // Add a prop to reset the view if needed, e.g., onGoHome?: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = (/*{ onGoHome }*/) => {
  const { setOpenMobile } = useSidebar(); // Get setOpenMobile from context

  const handleSelect = (/* type: GameType | null */) => {
    // Instead of setting active game type, potentially call onGoHome or similar
    // Or simply do nothing related to the main page state here
    setOpenMobile(false); // Close mobile sidebar on selection
    // onGoHome?.(); // Example: Call a function to reset the page view
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Removed onClick={() => handleSelect('verbs')} for now */}
        <SidebarMenuButton onClick={() => handleSelect()} tooltip="Play Verb Game">
          <BookText />
          <span>Verbs</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
         {/* Removed onClick={() => handleSelect('adjectives')} for now */}
        <SidebarMenuButton onClick={() => handleSelect()} tooltip="Play Adjective Game">
           <SpellCheck />
          <span>Adjectives</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
       {/* Removed "Select Game" button */}
    </SidebarMenu>
  );
};

export default SidebarNav;
