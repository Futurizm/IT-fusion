import { Feedback } from '../types/feedback'

export const sampleFeedback: Feedback[] = [
  {
    id: '1',
    type: 'complaint',
    title: 'Проблема с освещением на улице Абая',
    description: 'На улице Абая между домами 45 и 47 не работает уличное освещение уже неделю.',
    author: {
      name: 'Айдар',
      surname: 'Нурланов'
    },
    createdAt: '2024-12-10',
    status: 'in-progress'
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'Предложение по озеленению района',
    description: 'Предлагаю увеличить количество зеленых насаждений в микрорайоне Самал.',
    author: {
      name: 'Динара',
      surname: 'Сатпаева'
    },
    createdAt: '2024-12-11',
    status: 'pending'
  },
  {
    id: '3',
    type: 'complaint',
    title: 'Отсутствие пандуса в поликлинике',
    description: 'В поликлинике №5 отсутствует пандус для колясок.',
    author: {
      name: 'Арман',
      surname: 'Жумабаев'
    },
    createdAt: '2024-12-09',
    status: 'resolved'
  },
  {
    id: '4',
    type: 'suggestion',
    title: 'Идея по улучшению транспортной системы',
    description: 'Предлагаю добавить новый автобусный маршрут через район Достык.',
    author: {
      name: 'Мадина',
      surname: 'Алимова'
    },
    createdAt: '2024-12-08',
    status: 'pending'
  }
]

