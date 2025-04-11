"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { getCarBookings, getCarById, getCarReviews, getImageUrl, createBooking } from "@/lib/api"
import { Calendar as CalendarIcon, Car, Fuel, Gauge, MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays, format, isWithinInterval, parse } from "date-fns"

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [isBooking, setIsBooking] = useState(false)

  const { data: car, isLoading: isLoadingCar } = useQuery({
    queryKey: ["car", params.id],
    queryFn: () => getCarById(params.id),
  })

  const { data: reviews } = useQuery({
    queryKey: ["reviews", params.id],
    queryFn: () => getCarReviews(params.id),
  })

  const { data: occupiedDates } = useQuery({
    queryKey: ["bookings", params.id],
    queryFn: () => getCarBookings(params.id),
  })

  const handleBooking = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Eroare",
        description: "Te rugăm să selectezi perioada de închiriere",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)
    try {
      await createBooking({
        carId: params.id,
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: format(dateRange.to, "yyyy-MM-dd"),
      })
      toast({
        title: "Rezervare creată",
        description: "Rezervarea ta a fost înregistrată cu succes",
      })
      setDateRange(undefined)
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.response?.data?.message || "A apărut o eroare la crearea rezervării",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const disabledDays = occupiedDates?.map((interval: any) => ({
    from: parse(interval.startDate, "yyyy-MM-dd", new Date()),
    to: parse(interval.endDate, "yyyy-MM-dd", new Date()),
  }))

  if (isLoadingCar) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded-lg mb-8" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="container py-8 text-center">
        <p className="text-red-500">Mașina nu a fost găsită.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={getImageUrl(car.id, car.images[0])}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {car.images.slice(1).map((image: string, index: number) => (
              <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                <Image
                  src={getImageUrl(car.id, image)}
                  alt={`${car.name} ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Car Details */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{car.name}</h1>
                <p className="text-lg text-muted-foreground flex items-center mt-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  {car.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {car.price} RON<span className="text-base font-normal text-muted-foreground">/zi</span>
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{car.rating}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">An fabricație</p>
                  <p className="font-medium">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Putere</p>
                  <p className="font-medium">{car.power}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Fuel className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Combustibil</p>
                  <p className="font-medium">
                    {car.fuelType === "GASOLINE" ? "Benzină" :
                     car.fuelType === "DIESEL" ? "Diesel" :
                     car.fuelType === "ELECTRIC" ? "Electric" : "Hybrid"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Locuri</p>
                  <p className="font-medium">{car.seats}</p>
                </div>
              </div>
            </div>

            <p className="text-lg mb-6">{car.description}</p>

            {/* Features */}
            <h2 className="text-xl font-semibold mb-4">Dotări</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {car.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <h2 className="text-xl font-semibold mb-4">Recenzii</h2>
            <div className="space-y-4">
              {reviews?.map((review: any) => (
                <Card key={review.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(review.createdAt), "d MMMM yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="p-6">
              {/* Owner Info */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Proprietar</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{car.owner.firstName} {car.owner.lastName}</p>
                    <p className="text-sm text-muted-foreground">
                      Membru din {format(new Date(car.owner.createdAt), "MMMM yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{car.owner.rating}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Booking Calendar */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Selectează perioada</h3>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  disabled={[
                    { before: new Date() },
                    ...(disabledDays || []),
                  ]}
                  className="rounded-md border"
                />
              </div>

              <Button
                className="w-full"
                onClick={handleBooking}
                disabled={isBooking || !dateRange?.from || !dateRange?.to}
              >
                {isBooking ? "Se procesează..." : "Rezervă acum"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}