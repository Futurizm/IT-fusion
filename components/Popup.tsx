import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  item: any
}

export function Popup({ isOpen, onClose, item }: PopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{item.title}</h2>
          <Button variant="link" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <p className="text-lg text-gray-700 mb-4">{item.description}</p>

        {item.additionalInfo && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Дополнительная информация</h3>
            <p className="text-sm text-gray-600">{item.additionalInfo}</p>
          </div>
        )}

        {item.phone && (
          <p className="text-sm text-gray-600">
            <strong>Телефон:</strong> {item.phone}
          </p>
        )}

        {item.address && (
          <p className="text-sm text-gray-600">
            <strong>Адрес:</strong> {item.address}
          </p>
        )}

        {item.website && (
          <p className="text-sm text-gray-600">
            <strong>Сайт:</strong> <a href={item.website} className="text-blue-600" target="_blank" rel="noopener noreferrer">{item.website}</a>
          </p>
        )}
      </div>
    </div>
  )
}
