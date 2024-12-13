"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FeedbackType } from '../types/feedback'

interface FeedbackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    type: FeedbackType
    title: string
    description: string
    author: {
      name: string
      surname: string
    }
  }) => void
}

export function FeedbackModal({ open, onOpenChange, onSubmit }: FeedbackModalProps) {
  const [type, setType] = useState<FeedbackType>('complaint')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ type, title, description, author: { name, surname } })
    setTitle('')
    setDescription('')
    setName('')
    setSurname('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Добавить обращение</DialogTitle>
          <DialogDescription>
            Опишите вашу жалобу или предложение. Мы рассмотрим его в ближайшее время.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup value={type} onValueChange={(value) => setType(value as FeedbackType)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="complaint" id="complaint" />
              <Label htmlFor="complaint">Жалоба</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="suggestion" id="suggestion" />
              <Label htmlFor="suggestion">Предложение</Label>
            </div>
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surname">Фамилия</Label>
            <Input
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Введите вашу фамилию"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Подробно опишите вашу жалобу или предложение"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">Отправить</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

