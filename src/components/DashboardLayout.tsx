'use client';

import React from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarInset, useSidebar } from '@/components/ui/sidebar'; // Import useSidebar
import SidebarNav from '@/components/SidebarNav';
import NightModeToggle from '@/components/NightModeToggle';
import { Menu, PanelLeftClose } from 'lucide-react'; // Import PanelLeftClose
import { Button } from '@/components/ui/button'; // Import Button

interface DashboardLayoutProps {
  children: React.ReactNode;
  // Removed setActiveGameType prop
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      {/* Pass children directly to DashboardContent */}
      <DashboardContent>
        {children}
      </DashboardContent>
    </SidebarProvider>
  );
};

// Separate component to use the hook within the provider context
const DashboardContent: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { toggleSidebar } = useSidebar(); // Get toggle function from context

  return (
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
            {/* New Toggle Button for Expanded Desktop Sidebar */}
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-7 w-7 hidden md:flex group-data-[state=collapsed]:hidden" // Show only when expanded on desktop
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-5 w-5" />
            </Button>
          </SidebarHeader>
          <SidebarContent className="p-2 flex-1 overflow-y-auto">
             {/* Removed setActiveGameType prop */}
             <SidebarNav />
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
           <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-y-auto items-center justify-center">
                {children}
            </main>
        </SidebarInset>
      </div>
  );
}


export default DashboardLayout;
