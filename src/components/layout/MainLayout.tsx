import { FC, ReactNode } from 'react'
import { TheAppBackground } from '@/components/uiParts/TheAppBackground'
import TheAppBar from '@/components/uiParts/TheAppBar'
import { TheBottomNavigation } from '@/components/uiParts/TheBottomNavigation'
import TheOffset from '../uiParts/TheOffset'

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <TheAppBar />
      <TheOffset />
      <TheAppBackground>{children}</TheAppBackground>
      <TheBottomNavigation />
    </>
  )
}
