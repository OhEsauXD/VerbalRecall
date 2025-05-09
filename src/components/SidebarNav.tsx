

'use client';

import React from 'react';
import { BookText, SpellCheck, Home, PawPrint, Leaf, Utensils, Building, Clock, Cog, Globe, HelpCircle, Lock, Languages } from 'lucide-react'; // Added Languages icon
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarGroupLabel } from '@/components/ui/sidebar';
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

      <SidebarSeparator />
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
         <span className="group-data-[collapsible=icon]:hidden">Trivia Games</span>
      </SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('trivia')} tooltip="Play Past Participle Trivia Game">
          <HelpCircle />
          <span>Past Participle Trivia</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('spanishEnglishTrivia')} tooltip="Play Spanish to English Verb Trivia">
          <Languages />
          <span>Spanish to English Trivia</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarSeparator />
       <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
         <span className="group-data-[collapsible=icon]:hidden">Memory Games</span>
      </SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('verbs')} tooltip="Play Verb Matching Game">
          <BookText />
          <span>Verb Matching</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('pastTense')} tooltip="Play Irregular Past Tense Game">
           <Clock />
          <span>Irregular Past</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('regularPastTense')} tooltip="Play Regular Past Tense Game">
           <Cog />
          <span>Regular Past</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('adjectives')} tooltip="Play Adjective Game">
           <SpellCheck />
          <span>Adjectives</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('animals')} tooltip="Play Animal Game">
           <PawPrint />
          <span>Animals</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('plants')} tooltip="Play Plant Game">
           <Leaf />
          <span>Plants</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('food')} tooltip="Play Food/Candy/Drink Game">
           <Utensils />
          <span>Food Items</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('transportBuildings')} tooltip="Play Transport/Buildings Game">
           <Building />
          <span>Transport/Buildings</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('nations')} tooltip="Play Nations & Nationalities Game">
           <Globe />
          <span>Nations</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarSeparator />
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
         <span className="group-data-[collapsible=icon]:hidden">Lock Games</span>
      </SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleSelectGame('verbLock')} tooltip="Play Verb Combination Lock Game">
          <Lock />
          <span>Verb Lock</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarNav;
