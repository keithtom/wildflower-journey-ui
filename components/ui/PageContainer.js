import {
  Box
} from '@mui/material'

import Nav from './Nav'

const PageContainer = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
    }}>
      <Nav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: 20,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default PageContainer
