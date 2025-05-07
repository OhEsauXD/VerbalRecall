'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const NightModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before rendering UI based on theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optional: Render a placeholder or null while waiting for mount
    return <Button variant="ghost" size="icon" disabled className="w-full justify-start" ><Sun className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" /> <span className="group-data-[collapsible=icon]:hidden">Toggle Theme</span></Button>;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:size-8"
    >
      {theme === 'dark' ? (
         <Sun className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
      ) : (
         <Moon className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
      )}
       <span className="group-data-[collapsible=icon]:hidden">
         {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
       </span>
    </Button>
  );
};

export default NightModeToggle;
