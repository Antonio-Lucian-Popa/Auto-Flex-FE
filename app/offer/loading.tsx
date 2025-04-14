import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OfferLoading() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <div className="h-10 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
        <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mx-auto" />
      </div>

      <Card className="max-w-3xl mx-auto p-6">
        <div className="space-y-6">
          {/* Imagini */}
          <div className="space-y-2">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-square bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="space-y-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Dotări */}
          <div className="space-y-2">
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </Card>
    </div>
  )
}