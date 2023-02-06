import { Box, Tab, Tabs } from '@mui/material'
import { FC } from 'react'

import style from '@/styles/Shelf.module.css'
import { useShelfFilterTab } from '@/hooks/staticSWR/useShelfFilterTab'

const TABS = ['すべて', '読みたい', '積読', '読んでる', '読んだ']

const ShelfFilterTabs: FC = () => {
  const { shelfFilterTab: tab, setShelfFilterTab: setTab } = useShelfFilterTab()

  const handleChange = (_: any, newValue: number) => {
    setTab(newValue)
  }

  return (
    <>
      <Box sx={{ height: 50, backgroundColor: 'white', display: 'flex', marginBottom: 1 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons={false}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#101010',
              height: '0',
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab label={tab} className={style['shelf-header-tab-Label']} key={tab} />
          ))}
        </Tabs>
      </Box>
    </>
  )
}
export default ShelfFilterTabs
