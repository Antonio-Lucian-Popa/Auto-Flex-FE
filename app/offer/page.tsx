"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createCar } from "@/lib/api"
import { ImagePlus, Trash2 } from "lucide-react"
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
    feature: "", // pentru input-ul de feature
  })
  const [images, setImages] = useState<File[]>([])
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (images.length === 0) {
      toast({
        title: "Eroare",
        description: "Te rugăm să încarci cel puțin o imagine",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData()
      
      // Construim obiectul car conform CarRequestDto
      const carData = {
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        price: parseFloat(formData.price),
        location: formData.location,
        description: formData.description,
        features: formData.features,
        images: [] // Imaginile vor fi procesate pe backend
      }

      // Adăugăm obiectul car ca JSON string
      formDataToSend.append(
        'car',
        new Blob([JSON.stringify(carData)], { type: 'application/json' })
      )
      
      // Adăugăm imaginile
      images.forEach((image) => {
        formDataToSend.append('images', image)
      })

      await createCar(formDataToSend)
      toast({
        title: "Mașină adăugată cu succes",
        description: "Mașina ta a fost adăugată și va fi disponibilă după verificare.",
      })
      // Reset form
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
        feature: "",
      })
      setImages([])
      setImagesPreviews([])
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.response?.data?.message || "A apărut o eroare la adăugarea mașinii",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 10) {
      toast({
        title: "Eroare",
        description: "Poți încărca maxim 10 imagini",
        variant: "destructive",
      })
      return
    }

    setImages((prev) => [...prev, ...files])
    
    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setImagesPreviews((prev) => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagesPreviews((prev) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const addFeature = () => {
    if (formData.feature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, prev.feature.trim()],
        feature: ""
      }))
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Oferă mașina ta spre închiriere</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Câștigă bani extra oferind mașina ta spre închiriere în perioada în care nu o folosești.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Imagini */}
          <div className="space-y-2">
            <Label>Imagini</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagesPreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {images.length < 10 && (
                <div className="aspect-square relative border-2 border-dashed rounded-lg flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Adaugă imagini</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Poți încărca până la 10 imagini. Prima imagine va fi folosită ca imagine principală.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Marcă</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Cutie de viteze</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) => handleSelectChange("transmission", value)}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Locație</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleSelectChange("location", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Alege orașul" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="București">București</SelectItem>
                <SelectItem value="Cluj-Napoca">Cluj-Napoca</SelectItem>
                <SelectItem value="Timișoara">Timișoara</SelectItem>
                <SelectItem value="Iași">Iași</SelectItem>
                <SelectItem value="Brașov">Brașov</SelectItem>
                <SelectItem value="Constanța">Constanța</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descriere</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="min-h-[150px]"
              placeholder="Descrie mașina ta, starea ei, și orice alte detalii relevante..."
            />
          </div>

          {/* Dotări */}
          <div className="space-y-2">
            <Label>Dotări</Label>
            <div className="flex gap-2">
              <Input
                name="feature"
                value={formData.feature}
                onChange={handleChange}
                placeholder="ex: Climatronic"
                disabled={isSubmitting}
              />
              <Button
                type="button"
                onClick={addFeature}
                disabled={isSubmitting || !formData.feature.trim()}
              >
                Adaugă
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="hover:text-destructive"
                    disabled={isSubmitting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Se procesează..." : "Adaugă mașina"}
          </Button>
        </form>
      </Card>
    </div>
  )
}