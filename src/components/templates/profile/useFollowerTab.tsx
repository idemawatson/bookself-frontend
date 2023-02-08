import useSWR from 'swr'

const useFollowerTabSWR = (initialData?: number): [number, (state?: number) => void] => {
  const { data: state, mutate: setState } = useSWR('followerTab', null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as number, setState]
}

export const useFollowerTab = () => {
  const [followerTab, setFollowerTab] = useFollowerTabSWR(0)

  return {
    followerTab,
    setFollowerTab,
  }
}
