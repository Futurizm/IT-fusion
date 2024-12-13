import { CategoryPage } from "@/components/category-page"

const serviceItems = null

export default function TransportPage() {
  return (
    <>
      <CategoryPage showMap={true} title="Общественный транспорт" items={serviceItems} />
    </>
  )
}

