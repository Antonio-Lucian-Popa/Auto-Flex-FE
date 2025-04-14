import { Card } from "@/components/ui/card"

export default function CarsLoading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar Skeleton */}
        <div className="w-full md:w-64">
          <Card className="p-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="space-y-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </Card>
        </div>

        {/* Cars Grid Skeleton */}
        <div className="flex-1">
          {/* Search and Sort Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-full sm:w-[180px]">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Cars Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Card key={n} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}