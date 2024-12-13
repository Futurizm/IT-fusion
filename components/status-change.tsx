"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FeedbackStatus } from '../types/feedback'

interface StatusChangeProps {
  currentStatus: FeedbackStatus
  onStatusChange: (newStatus: FeedbackStatus) => void
}

export function StatusChange({ currentStatus, onStatusChange }: StatusChangeProps) {
  return (
    <Select value={currentStatus} onValueChange={(value) => onStatusChange(value as FeedbackStatus)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Изменить статус" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">На рассмотрении</SelectItem>
        <SelectItem value="in-progress">В работе</SelectItem>
        <SelectItem value="resolved">Решено</SelectItem>
      </SelectContent>
    </Select>
  )
}

