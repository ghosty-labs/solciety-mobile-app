import React from 'react'
import { StyledView } from '../../constants/nativewind'
import NotificationItem from '../../components/Notification/NotificationItem'
import { INotificationItem } from '../../types/notification'

export const dataNotif: INotificationItem[] = [
  {
    _id: '650f5cc01030b547a33fe304',
    signature:
      '2Ut8n1G4Hxrk6QuvpvMPdbt4sb1pC3bzPp237JDMye3U46ARckVKkifU3eVMP698bB56hN2Jrb6reGJ4KWDiQ8ct',
    key: '3DeFmmbAXxzGGiVH1XEui1iHfPZ3pgdR9C5k1DnzFp3N',
    user: 'AokJGyFmJjZ99qrPcvsLfa2u5xsK2yh9LBcH3H7xapo9',
    tag: 'tag16',
    content: 'Content Example 16',
    created_at: 1695505587,
    updated_at: 1695505587,
    notification_status: 'liked',
  },
  {
    _id: '650f5bc01030b547a33fe301',
    signature:
      '32Nap1iF5LX1QN13TqPVQzTm7WTfTt2sa7RhVLbzqybS4DaK17EsrVkji3yyqyb7UMDoHFCgvtrVnLeR4AnzQHD7',
    key: 'EV9CBRNmMGo35xL8Ad6bhWH5NkfKu2BN6t2MVq5ZvCd4',
    user: 'AokJGyFmJjZ99qrPcvsLfa2u5xsK2yh9LBcH3H7xapo9',
    tag: 'tag15',
    content: `Hello everyone! I'm Iqbal a software engineer, and I simply struggle to create a beautiful era of digital ideas.`,
    created_at: 1695505331,
    updated_at: 1695505331,
    notification_status: 'replied',
    reply_message: 'Nice cool! LFG',
  },
  {
    _id: '650f5b2b1030b547a33fe2fe',
    signature:
      '4rkfuuPsafCHyERw2FZuDP5QyzdA2ZkseLp6kmg5FuvnBPzXa3ZrUPNVfyngQ2onQEUYqtPKPAqEyhbaa5pUx4Lf',
    key: '9p9YaCL2fdoBm1fFRcBJa5e5LaaXF4XZachshZn4S5PS',
    user: 'ANwvF5jduUnY7unZin42NxB5cz4ctFqEmcVt5nWekpFq',
    tag: 'lfg',
    content: 'solciety 🎉',
    created_at: 1695505182,
    updated_at: 1695505182,
    notification_status: 'mentioned',
    mention_message:
      'hi @iqbalutomo, the things you can see only when you slow down',
  },
  {
    _id: '650f59c91030b547a33fe2fa',
    signature:
      '3s8YmjrQ965y5KNcdMSw6nPg3E1k4nTNc3X3XL7WKxJMjyBaRHM5XcMxHEpiuCLGPeXTx1Bc1dUs198VAn39NciJ',
    key: '6o3Twocc1m5VwF7NHpErpNdU4VJfN9jR8pEtoi7b1qow',
    user: 'AokJGyFmJjZ99qrPcvsLfa2u5xsK2yh9LBcH3H7xapo9',
    tag: 'tag15',
    content: 'Content Example 15',
    created_at: 1695504828,
    updated_at: 1695504828,
    notification_status: 'followed',
  },
]

const NotifAllScreen = () => {
  return (
    <StyledView className="h-full pt-4 bg-zinc-900">
      {dataNotif.map((notif, index) => {
        return <NotificationItem key={index} data={notif} />
      })}
    </StyledView>
  )
}

export default NotifAllScreen
