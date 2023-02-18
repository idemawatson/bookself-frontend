import { TheAppBackground } from '@/components/uiParts/TheAppBackground'
import TheOffset from '@/components/uiParts/TheOffset'
import { useUser } from '@/hooks/useUser'
import { ChevronLeft, InsertChart } from '@mui/icons-material'
import { Divider, Paper, SwipeableDrawer, Tab, Tabs, Typography } from '@mui/material'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import ProfileTemplate from '../profile'

type Props = {}
const AnalyticsTemplate: FC<Props> = () => {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(0)
  const { mutate } = useUser()
  useEffect(() => {
    if (open) mutate()
  }, [open])
  const handleChange = (_: SyntheticEvent<Element, Event>, value: number) => {
    setTab(value)
  }
  const renderContent = () => {
    if (tab === 0) return <ProfileTemplate />
  }
  return (
    <>
      {!open ? (
        <InsertChart onClick={() => setOpen(true)}></InsertChart>
      ) : (
        <ChevronLeft onClick={() => setOpen(false)}></ChevronLeft>
      )}
      <SwipeableDrawer
        anchor='right'
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ zIndex: 999 }}
      >
        <TheOffset />
        <TheAppBackground>
          <Paper elevation={0} sx={{ mx: 2 }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              variant='fullWidth'
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#101010',
                  height: '0',
                },
              }}
            >
              <Tab label='レベル' />
            </Tabs>
            <Divider />
          </Paper>
          {renderContent()}
        </TheAppBackground>
      </SwipeableDrawer>
    </>
  )
}

export default AnalyticsTemplate
