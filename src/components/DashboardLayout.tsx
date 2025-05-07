'use client';

import React from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import SidebarNav from '@/components/SidebarNav';
import NightModeToggle from '@/components/NightModeToggle';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  setActiveGameType: (type: 'verbs' | 'adjectives' | null) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, setActiveGameType }) => {
  return (
    // Set defaultOpen to false to make the sidebar hidden by default
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarHeader>
            {/* Sidebar Trigger for Desktop (appears when collapsed) */}
            <SidebarTrigger className="hidden md:flex group-data-[state=expanded]:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
             </SidebarTrigger>
            <h2 className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Verbal Recall</h2>
          </SidebarHeader>
          <SidebarContent className="p-2 flex-1 overflow-y-auto">
             <SidebarNav setActiveGameType={setActiveGameType} />
          </SidebarContent>
          <SidebarFooter className="p-2">
             <NightModeToggle />
          </SidebarFooter>
        </Sidebar>

        {/* Mobile Header & Main Content */}
        <SidebarInset className="flex flex-col flex-1">
          {/* Header (visible on all sizes, contains trigger) */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
             {/* Sidebar Trigger for Mobile and when Desktop sidebar is expanded */}
             <SidebarTrigger className="md:hidden group-data-[state=expanded]:md:flex">
               <Menu className="h-5 w-5" />
               <span className="sr-only">Toggle Menu</span>
             </SidebarTrigger>
             <h1 className="flex-1 text-lg font-semibold">Verbal Recall</h1>
             <NightModeToggle /> {/* Add toggle to mobile header too */}
          </header>

          {/* Main Content Area */}
           <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-y-auto">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
