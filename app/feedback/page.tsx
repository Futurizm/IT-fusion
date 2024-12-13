"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FeedbackModal } from '@/components/feedback-modal'
import { StatusChange } from '@/components/status-change'
import { sampleFeedback } from '@/data/feedback'
import { Feedback, FeedbackType, FeedbackStatus } from '@/types/feedback'
import { MessageSquare, Lightbulb } from 'lucide-react'
import { Layout } from '@/components/layout'

const statusColors = {
  pending: 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  resolved: 'bg-green-500'
}

const typeIcons = {
  complaint: MessageSquare,
  suggestion: Lightbulb
}

const DB_NAME = 'FeedbackDB'
const STORE_NAME = 'feedback'

async function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = () => {
      const db = request.result
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
    }
  })
}

async function getAllFeedback(): Promise<Feedback[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

async function addFeedback(feedback: Omit<Feedback, 'id'>): Promise<Feedback> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add(feedback)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const newFeedback = { ...feedback, id: request.result as string }
      resolve(newFeedback)
    }
  })
}

async function updateFeedbackStatus(id: string, status: FeedbackStatus): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const feedback = request.result
      feedback.status = status
      const updateRequest = store.put(feedback)
      updateRequest.onerror = () => reject(updateRequest.error)
      updateRequest.onsuccess = () => resolve()
    }
  })
}

export default function FeedbackPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [feedback, setFeedback] = useState<Feedback[]>([])

  useEffect(() => {
    const initializeFeedback = async () => {
      let storedFeedback = await getAllFeedback()
      if (storedFeedback.length === 0) {
        // If no feedback in IndexedDB, use sample data
        await Promise.all(sampleFeedback.map(item => addFeedback(item)))
        storedFeedback = await getAllFeedback()
      }
      setFeedback(storedFeedback)
    }

    initializeFeedback()
  }, [])

  const handleSubmit = async (data: { type: FeedbackType; title: string; description: string; author: { name: string; surname: string } }) => {
    const newFeedback: Omit<Feedback, 'id'> = {
      ...data,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    }
    const addedFeedback = await addFeedback(newFeedback)
    setFeedback(prev => [addedFeedback, ...prev])
  }

  const handleStatusChange = async (id: string, newStatus: FeedbackStatus) => {
    await updateFeedbackStatus(id, newStatus)
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
  }

  return (
    <Layout>
        <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
            <div>
            <h1 className="text-2xl font-bold">Жалобы и предложения</h1>
            <p className="text-muted-foreground">
                Оставьте свою жалобу или предложение по улучшению города
            </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
            Добавить обращение
            </Button>
        </div>

        <div className="grid gap-4">
            {feedback.map((item, index) => {
            const Icon = typeIcons[item.type]
            return (
                <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-2 rounded-full ${item.type === 'complaint' ? 'bg-red-100' : 'bg-green-100'}`}>
                    <Icon className={`w-4 h-4 ${item.type === 'complaint' ? 'text-red-500' : 'text-green-500'}`} />
                    </div>
                    <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge variant="secondary" className={statusColors[item.status]}>
                        {item.status === 'pending' && 'На рассмотрении'}
                        {item.status === 'in-progress' && 'В работе'}
                        {item.status === 'resolved' && 'Решено'}
                        </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {item.author.name} {item.author.surname} • {item.createdAt}
                    </div>
                    </div>
                    <StatusChange
                    currentStatus={item.status}
                    onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                    />
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                </Card>
            )
            })}
        </div>

        <FeedbackModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onSubmit={handleSubmit}
        />
        </div>
    </Layout>
  )
}

