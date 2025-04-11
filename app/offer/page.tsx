"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createCar } from "@/lib/api"
import { useState } from "react"

export default function OfferPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    transmission: "",
    fuelType: "",
    price: "",
    location: "",
    description: "",
    features: [] as string[],
    images: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCar(formData)
      toast({
        title: "Mașină adăugată cu succes",
        description: "Mașina ta a fost adăugată și va fi disponibilă după verificare.",
      })
      setFormData({
        brand: "",
        model: "",
        year: "",
        transmission: "",
        fuelType: "",
        price: "",
        location: "",
        description: "",
        features: [],
        images: [],
      })
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la adăugarea mașinii. Te rugăm să încerci din nou.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Oferă mașina ta spre închiriere</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Câștigă bani extra oferind mașina ta spre închiriere în perioada în care nu o folosești.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Marcă</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">An fabricație</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Cutie de viteze</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) => handleSelectChange("transmission", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alege tipul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AUTOMATIC">Automată</SelectItem>
                  <SelectItem value="MANUAL">Manuală</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Combustibil</Label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => handleSelectChange("fuelType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alege tipul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GASOLINE">Benzină</SelectItem>
                  <SelectItem value="DIESEL">Diesel</SelectItem>
                  <SelectItem value="ELECTRIC">Electric</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preț pe zi (RON)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Locație</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descriere</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Adaugă mașina
          </Button>
        </form>
      </Card>
    </div>
  )
}