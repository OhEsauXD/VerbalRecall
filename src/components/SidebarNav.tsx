'use client';

import React from 'react';
import { BookText, SpellCheck, Home, PawPrint, Leaf, Utensils, Building, Clock, Cog } from 'lucide-react'; // Import Cog icon for regular verbs
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
       <SidebarMenuItem> {/* Irregular Past Tense Item */}
        <SidebarMenuButton onClick={() => handleSelectGame('pastTense')} tooltip="Play Irregular Past Tense Game">
           <Clock />
          <span>Irregular Past</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem> {/* Regular Past Tense Item */}
        <SidebarMenuButton onClick={() => handleSelectGame('regularPastTense')} tooltip="Play Regular Past Tense Game">
           <Cog /> {/* Using Cog icon as an example */}
          <span>Regular Past</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('adjectives')} tooltip="Play Adjective Game">
           <SpellCheck />
          <span>Adjectives</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem> {/* Animal Item */}
        <SidebarMenuButton onClick={() => handleSelectGame('animals')} tooltip="Play Animal Game">
           <PawPrint />
          <span>Animals</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem> {/* Plant Item */}
        <SidebarMenuButton onClick={() => handleSelectGame('plants')} tooltip="Play Plant Game">
           <Leaf />
          <span>Plants</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem> {/* Food Item */}
        <SidebarMenuButton onClick={() => handleSelectGame('food')} tooltip="Play Food/Candy/Drink Game">
           <Utensils />
          <span>Food Items</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem> {/* Transport/Buildings Item */}
        <SidebarMenuButton onClick={() => handleSelectGame('transportBuildings')} tooltip="Play Transport/Buildings Game">
           <Building />
          <span>Transport/Buildings</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarNav;
