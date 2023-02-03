import useSWR from 'swr'

const useTokenSWR = (initialData: string): [string, (state: string) => void] => {
  const { data: state, mutate: setState } = useSWR('token', null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as string, setState]
}

export const useToken = () => {
  const [token, setToken] = useTokenSWR('')

  return {
    token,
    setToken,
  }
}
