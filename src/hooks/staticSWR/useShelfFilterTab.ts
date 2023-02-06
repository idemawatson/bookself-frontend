import useSWR from 'swr'

const useShelfFilterTabSWR = (initialData?: number): [number, (state?: number) => void] => {
  const { data: state, mutate: setState } = useSWR('shelfFilterTab', null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as number, setState]
}

export const useShelfFilterTab = () => {
  const [shelfFilterTab, setShelfFilterTab] = useShelfFilterTabSWR(0)

  return {
    shelfFilterTab,
    setShelfFilterTab,
  }
}
