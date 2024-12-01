import { DM_Sans } from "next/font/google";
import type { Metadata } from 'next'
import './globals.css'
import { cn } from '../lib/utils'
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarMain } from "@/components/SideBarMain";
import NavBar from "@/components/NavBar";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={cn(dmSans.className, 'antialiased overflow-x-hidden min-h-screen border-none outline-none', 'scrollbar scrollbar-thumb scrollbar-thumb-white scrollbar-track-slate-700')} suppressHydrationWarning={true}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <SidebarMain />
                <div className="w-full flex flex-col">
                  <div className="w-full">
                    <div className="h-[2px] relative z-30 bg-gradient-to-r from-yellow-500 via-purple-500 to-green-500" />
                    <NavBar/>
                  </div>
                  <main className="">{children}</main>
                </div>
              </SidebarProvider>
              <Toaster />
            </ThemeProvider>
      </body>
    </html>
  );
}