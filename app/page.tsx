'use client';
import Link from "next/link"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Newspaper, Phone, Car, Bus, Search, ArrowRight, ChartNoAxesCombined, BotMessageSquare, Speech, CloudSun } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react";

const categories = [
  { name: 'События', icon: Calendar, link: '/events', color: 'bg-blue-50' },
  { name: 'Новости', icon: Newspaper, link: '/news', color: 'bg-green-50' },
  { name: 'Сервисы', icon: Phone, link: '/services', color: 'bg-yellow-50' },
  { name: 'Парковки', icon: Car, link: '/parking', color: 'bg-purple-50' },
  { name: 'Общественный транспорт', icon: Bus, link: '/transport', color: 'bg-red-50' },
  { name: 'Статистика', icon: ChartNoAxesCombined, link: '/statistics', color: 'bg-cyan-50' },
  { name: 'AI Ассистент', icon: BotMessageSquare, link: '/ai-assistant', color: 'bg-green-50' },
  { name: 'Жалобы и предложения', icon: Speech, link: '/feedback', color: 'bg-blue-50' },
  { name: 'Погода', icon: CloudSun, link: '/weather', color: 'bg-red-50' },
]

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTime, setSelectedTime] = useState('any')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || category.name === selectedCategory)
  )

  useEffect(() => {
    const isLoggedInCookie = document.cookie.includes("isLoggedIn=true");

    if (!isLoggedInCookie) {
      router.replace('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  return (
    <Layout>
      <div className="space-y-8">
        <Card className="border-blue-100 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">Добро пожаловать в CityLion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-600">
              CityLion предоставляет актуальную информацию о городских событиях, новостях, сервисах, парковках и общественном транспорте.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Время" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Любое время</SelectItem>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="week">На этой неделе</SelectItem>
                <SelectItem value="month">В этом месяце</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Место" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все места</SelectItem>
                <SelectItem value="center">Центр города</SelectItem>
                <SelectItem value="north">Север</SelectItem>
                <SelectItem value="south">Юг</SelectItem>
                <SelectItem value="east">Восток</SelectItem>
                <SelectItem value="west">Запад</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Link href={category.link} key={category.name} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`rounded-full p-4 ${category.color} mb-4 self-start group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(category.icon, { className: "h-8 w-8 text-gray-700" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">Информация о {category.name.toLowerCase()}</p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    <span className="font-medium mr-2">Подробнее</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}