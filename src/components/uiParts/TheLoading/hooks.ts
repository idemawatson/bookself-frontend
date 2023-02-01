import useSWR, { useSWRConfig } from 'swr'

const useLoadingSWR = (initialData: boolean): [boolean, (state: boolean) => void] => {
  const { data: state, mutate: setState } = useSWR('loading', null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as boolean, setState]
}

export const useLoading = () => {
  const { cache } = useSWRConfig()
  const [loading, setLoading] = useLoadingSWR(false)

  const showLoading = () => {
    cache.delete('loading')
    setLoading(true)
  }
  const hideLoading = () => {
    cache.delete('loading')
    setLoading(false)
  }

  return {
    loading,
    showLoading,
    hideLoading,
    setLoading,
  }
}
