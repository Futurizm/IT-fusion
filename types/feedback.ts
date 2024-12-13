export type FeedbackType = 'complaint' | 'suggestion'
export type FeedbackStatus = 'pending' | 'in-progress' | 'resolved'

export interface Feedback {
  id: string
  type: FeedbackType
  title: string
  description: string
  author: {
    name: string
    surname: string
  }
  createdAt: string
  status: FeedbackStatus
}

