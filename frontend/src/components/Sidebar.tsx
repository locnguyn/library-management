'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Book,
  BookOpen,
  Settings
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

const sidebarNavItems = [
  {
    icon: Home,
    label: 'Dashboard',
    path: '/'
  },
  {
    icon: Users,
    label: 'Members',
    path: '/members'
  },
  {
    icon: Book,
    label: 'Books',
    path: '/books'
  },
  {
    icon: BookOpen,
    label: 'Loans',
    path: '/loans'
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden border-r bg-muted/40 lg:block w-16">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="icon"
                    className={cn(
                      "w-10 h-10",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    asChild
                  >
                    <Link href={item.path}>
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </TooltipProvider>
    </aside>
  )
}
