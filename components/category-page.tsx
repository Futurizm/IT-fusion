'use client'
import React, { useState } from "react"
import { Layout } from "@/components/layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search, ArrowRight, Building, Car, Bus, Calendar, Plus, DollarSign, Shield, Clock } from 'lucide-react'
import Link from "next/link"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { format } from 'date-fns';
import { TransportSchedule } from "./transport-schedule"

const MySwal = withReactContent(Swal)

interface CategoryPageProps {
  title: string
  items: Array<{
    id: string
    title: string
    description: string
    type: 'place' | 'event' | 'transport'
    date?: string
    spots?: number
    status?: 'PAID' | 'FREE'
    guarded?: boolean
    [key: string]: any
  }>
  category_type: 'events' | 'news' | 'parking'
}


export const CategoryPage = React.memo(({ title, items, category_type, showMap = false }: CategoryPageProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const [localItems, setLocalItems] = useState(items);

  const getIcon = (type: string) => {
    switch (type) {
      case 'place':
        return Building
      case 'event':
        return Calendar
      case 'transport':
        return Bus
      default:
        return MapPin
    }
  }

  const handleCreate = async () => {
    let formFields = [];
  
    switch (category_type) {
      case 'events':
        formFields = ['title', 'description', 'date'];
        break;
      case 'news':
        formFields = ['title', 'description', 'date'];
        break;
      case 'parking':
        formFields = ['title', 'spots', 'status', 'guarded'];
        break;
      default:
        formFields = ['title', 'description'];
    }
  
    const { value: formValues } = await MySwal.fire({
      title: 'Создать новый элемент',
      html: `
        <form id="createForm">
          ${formFields.map(field => {
            if (field === 'status') {
              return `
                <select id="${field}" class="swal2-input">
                  <option value="PAID">PAID</option>
                  <option value="FREE">FREE</option>
                </select>
              `;
            } else if (field === 'guarded') {
              return `
                <div class="swal2-checkbox-container">
                  <input type="checkbox" id="${field}" class="swal2-checkbox">
                  <label for="${field}">Guarded</label>
                </div>
              `;
            } else if (field === 'date') {
              return `<input id="${field}" type="date" class="swal2-input">`;
            } else {
              return `<input id="${field}" class="swal2-input" placeholder="${field.charAt(0).toUpperCase() + field.slice(1)}">`;
            }
          }).join('')}
        </form>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return formFields.reduce((acc, field) => {
          if (field === 'guarded') {
            acc[field] = (document.getElementById(field) as HTMLInputElement).checked;
          } else if (field === 'spots') {
            acc[field] = parseInt((document.getElementById(field) as HTMLInputElement).value, 10);
          } else if (field === 'date') {
            acc[field] = new Date((document.getElementById(field) as HTMLInputElement).value);
          } else {
            acc[field] = (document.getElementById(field) as HTMLInputElement).value;
          }
          return acc;
        }, {} as Record<string, any>);
      }
    });
  
    if (formValues) {
      try {
        let response;
        switch (category_type) {
          case 'events':
            response = await fetch('/api/events', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formValues),
            });
            break;
          case 'news':
            response = await fetch('/api/news', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formValues),
            });
            break;
          case 'parking':
            response = await fetch('/api/parking', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formValues),
            });
            break;
        }
    
        if (response && response.ok) {
          // Обновляем локальное состояние с новым элементом
          const newItem = { id: Math.random().toString(), ...formValues };
          setLocalItems((prevItems) => [...prevItems, newItem]);
    
          MySwal.fire('Успешно!', 'Новый элемент был создан.', 'success');
        } else {
          throw new Error('Failed to create item');
        }
      } catch (error) {
        console.error('Error creating item:', error);
        MySwal.fire('Ошибка!', 'Не удалось создать элемент.', 'error');
      }
    }
    
  };

  const handleShowDetails = (item: ServiceItem) => {
    MySwal.fire({
      title: item.title,
      html: `
        <div class="p-4">
          <p class="text-sm text-gray-500 mb-4"><strong>Описание:</strong> ${item.description}</p>
          <p class="text-sm text-gray-500 mb-4"><strong>Телефон:</strong> ${item.phone}</p>
          <p class="text-sm text-gray-500 mb-4"><strong>Адрес:</strong> ${item.address}</p>
          <p class="text-sm text-gray-500 mb-4"><strong>Часы работы:</strong> ${item.workingHours}</p>
          <p class="text-sm text-gray-500 mb-4"><strong>Дополнительная информация:</strong> ${item.additionalInfo}</p>
          <p class="text-sm text-gray-500 mb-4"><strong>Сайт:</strong> <a href="${item.website}" target="_blank" class="text-blue-500">${item.website}</a></p>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: "Закрыть",
    }); 
  };


  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-xl text-gray-600">Исследуйте город и найдите интересные места и события.</p>
          </div>
           {!showMap && (
            <Button onClick={handleCreate} className="h-12 px-6 rounded-full gap-2 bg-[#427cf8] text-white hover:bg-[#3b6fe0]">
              <Plus className="h-5 w-5" />
              <span className="text-lg font-medium">Создать</span>
            </Button>
          )}
        </div>

        { !showMap && (
           <div className="mb-8">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Поиск по городу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white border border-gray-200 rounded-full text-lg placeholder:text-gray-400"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>
        )}

        {/* Map Section */}
        {showMap && (
          <div className="mb-8 w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <iframe 
              src="http://go2.bus-pvl.kz/" 
              width="100%" 
              height="600" 
              className="border-0 w-full"
              title="Карта общественного транспорта"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localItems?.map((item) => {
            const Icon = getIcon(item.type)
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-24 w-24 text-white opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {item.title}
                      </h3>
                      {item.date && (
                       <p className="text-sm text-gray-500 mt-1 flex items-center">
                       <Clock className="h-4 w-4 mr-1" />
                       {item.date ? format(new Date(item.date), 'dd/MM/yyyy') : 'Дата не указана'}
                     </p>
                      )}
                    </div>
                  </div>

                  <p className="text-base text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  {category_type === 'parking' && (
                    <div className="mb-4 space-y-2">
                      <p className="text-sm text-gray-600 flex items-center">
                        <Car className="h-4 w-4 mr-2" />
                        <span className="font-medium">Места:</span> {item.spots}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="font-medium">Статус:</span> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          item.status === 'PAID' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        <span className="font-medium">Охрана:</span> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          item.guarded ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.guarded ? 'Да' : 'Нет'}
                        </span>
                      </p>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full h-12 px-6 text-blue-600 hover:bg-blue-50 rounded-full gap-2 transition-colors duration-200"
                    onClick={() => handleShowDetails(item)} // Отображаем попап
                  >
                    <span className="text-lg font-medium">Подробнее</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      { showMap && (
        <TransportSchedule />
      )}
    </Layout>
  )
})
