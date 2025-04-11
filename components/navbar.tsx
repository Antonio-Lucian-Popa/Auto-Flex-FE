"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, LogIn, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/api"

import Image from "next/image"

export function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificăm dacă există un token de autentificare
    const token = localStorage.getItem("access_token")
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-[1440px] flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png" // 🟢 imaginea din public/
            alt="AutoFlex Logo"
            width={40}
            height={40}
            className="rounded-md object-contain"
          />
          <span className="text-xl font-bold">AutoFlex</span>
        </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between flex-1 pl-8">
          <div className="flex gap-6">
            <Link href="/cars" className="text-foreground/60 hover:text-foreground transition">
              Caută mașini
            </Link>
            <Link href="/offer" className="text-foreground/60 hover:text-foreground transition">
              Oferă mașina ta
            </Link>
            <Link href="/how-it-works" className="text-foreground/60 hover:text-foreground transition">
              Cum funcționează
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profilul meu</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/bookings">Rezervările mele</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/cars">Mașinile mele</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Deconectare
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Autentificare
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Înregistrare</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 justify-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/cars" onClick={() => setIsOpen(false)}>
                  Caută mașini
                </Link>
                <Link href="/offer" onClick={() => setIsOpen(false)}>
                  Oferă mașina ta
                </Link>
                <Link href="/how-it-works" onClick={() => setIsOpen(false)}>
                  Cum funcționează
                </Link>
                <hr className="my-4" />
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      Profilul meu
                    </Link>
                    <Link href="/profile/bookings" onClick={() => setIsOpen(false)}>
                      Rezervările mele
                    </Link>
                    <Link href="/profile/cars" onClick={() => setIsOpen(false)}>
                      Mașinile mele
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                    >
                      Deconectare
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Autentificare
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Înregistrare</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}