import { CategoryPage } from "@/components/category-page";
import { getAllEvents } from "@/lib/services/events.service"

const eventItems = [
  { id: "1", title: "Городской фестиваль", description: "Ежегодный фестиваль искусств", date: "2023-07-15", location: "Центральная площадь" },
  { id: "2", title: "Концерт классической музыки", description: "Выступление симфонического оркестра", date: "2023-08-01", location: "Филармония" },
  { id: "3", title: "Выставка современного искусства", description: "Работы молодых художников", date: "2023-07-20", location: "Городская галерея" },
]

export default async function EventsPage() {
  const events = await getAllEvents();

  const formattedEvents = events.map((event) => ({
    ...event,
    date: event.date.toISOString(), 
  }));

  return <CategoryPage title="События" items={formattedEvents} category_type="events" />;
}