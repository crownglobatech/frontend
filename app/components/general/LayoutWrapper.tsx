'use client'
import { ReactNode, useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { NotificationProvider } from '@/app/contexts/NotificationProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
export default function LayoutWrapper ({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }))

  return (
    <div>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>{children}</NotificationProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  )
}
