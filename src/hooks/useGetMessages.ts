import { getMessages } from '@/api'
import useSWR from 'swr'

export function useGetMessages() {
  const { data, isLoading, mutate } = useSWR('/messages', getMessages, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    messages: data && 'messages' in data ? data.messages : [],
    error: data && 'error' in data ? data.error : null,
    isLoading,
    refetch: mutate,
  }
}
