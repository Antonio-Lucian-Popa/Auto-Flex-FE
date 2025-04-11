"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { login } from "@/lib/api"
import { Car } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login({ email, password })
      toast({
        title: "Autentificare reușită",
        description: "Bine ai revenit!",
      })
      router.push("/profile")
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.response?.data?.message || "A apărut o eroare la autentificare",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <Car className="h-12 w-12" />
          <h1 className="text-2xl font-bold text-center">Bine ai revenit!</h1>
          <p className="text-muted-foreground text-center">
            Autentifică-te pentru a continua pe AutoFlex
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nume@exemplu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Parolă</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Se procesează..." : "Autentificare"}
          </Button>
        </form>

        <Separator className="my-8" />

        <p className="text-center text-sm">
          Nu ai cont?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </Card>
    </div>
  )
}