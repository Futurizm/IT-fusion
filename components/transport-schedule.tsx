
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, Train, Car } from 'lucide-react'

const transportData = {
  buses: [
    "1", "1Э", "2", "3", "5", "6", "9", "10", "11", "14", "16", "17", "18", 
    "21", "22", "24", "24Б", "27", "31", "38", "40", "41", "42", "44", "55", 
    "57", "66", "111", "115", "126", "151", "157", ".003"
  ],
  trams: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
    "11", "12", "13", "14", "15", "16", "17", "18", "19"
  ],
  minibuses: ["7", "66А", "152", "153"]
}

// Функция для генерации случайного времени прибытия
const getRandomArrival = () => {
  const minutes = Math.floor(Math.random() * 30) + 1
  return `${minutes} мин`
}

export function TransportSchedule() {

  return (
    <div className="max-w-[1400px] mx-auto px-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Расписание транспорта</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="buses" className="flex items-center gap-2">
                <Bus className="h-4 w-4" />
                <span>Автобусы</span>
                <span className="text-xs text-muted-foreground ml-1">(30 онлайн)</span>
              </TabsTrigger>
              <TabsTrigger value="trams" className="flex items-center gap-2">
                <Train className="h-4 w-4" />
                <span>Трамваи</span>
                <span className="text-xs text-muted-foreground ml-1">(19 онлайн)</span>
              </TabsTrigger>
              <TabsTrigger value="minibuses" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Маршрутки</span>
                <span className="text-xs text-muted-foreground ml-1">(4 онлайн)</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(transportData).map(([key, routes]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {routes.map((route) => (
                    <div 
                      key={route}
                      className="bg-muted/50 rounded-lg p-4 flex items-center justify-between hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-[#427cf8] font-semibold">{route}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Маршрут {route}</span>
                          <span className="text-xs text-muted-foreground">Ожидание:</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-[#427cf8]">{getRandomArrival()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

