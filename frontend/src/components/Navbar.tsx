'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const routes = [
  { path: '/', label: 'Dashboard' },
  { path: '/members', label: 'Members' },
  { path: '/books', label: 'Books' },
  { path: '/loans', label: 'Loans' }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity mx-2"
        >
          Library Management
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.path}>
                <NavigationMenuLink
                  active={pathname === route.path}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === route.path
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  )}
                  asChild
                >
                  <Link href={route.path}>
                    {route.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
