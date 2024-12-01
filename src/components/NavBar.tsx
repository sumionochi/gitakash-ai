"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ModeToggle from "../components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '../lib/utils';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Menu, MousePointer2, MousePointerClick } from 'lucide-react';
import { Separator } from './ui/separator';
import { UserProfile } from './UserProfile';
import { createClient } from '@/utils/supabase/client';
import LoginButton from './Log';
import { SidebarTrigger } from './ui/sidebar';

type Props = {};

const NavBar = (props: Props) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // Track user authentication status
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='w-full sticky top-0 z-20 bg-white dark:bg-black p-[0.56rem] border-b'>
      <div className='max-w-7xl w-full mx-auto'>
        <div className='flex flex-row w-full items-center justify-between'>
          <div className='relative gap-2 h-10 flex flex-row items-center justify-center'>
            <SidebarTrigger/>
          </div>
          <div className='flex flex-row items-center gap-2 sm:hidden'>
            <button onClick={toggleSheet}>
              <Menu />
            </button>
          </div>
          <NavigationMenu className='hidden sm:flex'>
            <NavigationMenuList className='flex gap-6 items-center'>
              <UserProfile />
              <ModeToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;