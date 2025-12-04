"use client"

import Link from "next/link"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Learn<span className="text-indigo-500">Flow</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">


          <div className="hidden md:flex gap-2">
             <Button variant="ghost" asChild>
              <Link href="/login">로그인</Link>
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background p-4 space-y-4">
          <div className="flex flex-col gap-2 pt-4">
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
