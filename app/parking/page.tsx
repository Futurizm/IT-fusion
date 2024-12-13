import { CategoryPage } from "@/components/category-page"
import { getAllParkings } from "@/lib/services/parking.service"

const parkingItems = [
  { id: "1", title: "Парковка на Центральной площади", description: "50 мест, платная", spaces: 50 },
  { id: "2", title: "Парковка у торгового центра", description: "100 мест, бесплатная", spaces: 100 },
  { id: "3", title: "Подземная парковка", description: "200 мест, охраняемая", spaces: 200 },
]

export default async function ParkingPage() {
  const parkings = await getAllParkings()
  const formattedNews = parkings.map((event) => ({
    ...event,
  }));

  return <CategoryPage title="Парковки" items={formattedNews} category_type="parking" />
}

