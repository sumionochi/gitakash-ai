"use client"

import * as React from "react"
import { LayoutDashboard, MessageCircleQuestion, Users, CreditCard, Plus, Loader, MousePointerClick, FolderDot } from 'lucide-react'
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

const applicationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "Q&A",
    icon: MessageCircleQuestion,
    url: "/qa",
  },
  {
    title: "Meetings",
    icon: Users,
    url: "/meetings",
  },
  {
    title: "Billing",
    icon: CreditCard,
    url: "/billing",
  },
]

const projects = [
  {
    title: "Project 1",
    icon: FolderDot,
    url: "/projects/1",
  },
  {
    title: "Project 2",
    icon: FolderDot,
    url: "/projects/2",
  },
  {
    title: "Project 3",
    icon: FolderDot,
    url: "/projects/3",
  },
]

export function SidebarMain() {
  const [user, setUser] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const supabase = createClient()

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    fetchUser()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex h-screen w-[240px] items-center justify-center bg-background">
      </div>
    )
  }

  if (!user) {
    return null 
  }  

  return (
    <Sidebar className="">
      <SidebarHeader className="border-b p-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <MousePointerClick />
            gitAkash.ai
        </Link>

      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {applicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.title}>
                  <SidebarMenuButton asChild>
                    <Link href={project.url} className="flex items-center gap-2">
                      <project.icon className="size-4 rounded bg-muted" />
                      {project.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="flex rounded-md p-1 w-full items-center gap-2 text-muted-foreground border"> 
                  <Link href={"/create"} className="flex flex-row gap-2 items-center">
                    <Plus className="size-4" />
                    Create Project
                  </Link>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

