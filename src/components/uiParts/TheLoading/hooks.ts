import useSWR from 'swr'

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
  const [loading, setLoading] = useLoadingSWR(false)

  const showLoading = () => {
    setLoading(true)
  }
  const hideLoading = () => {
    setLoading(false)
  }

  return {
    loading,
    showLoading,
    hideLoading,
    setLoading,
  }
}
