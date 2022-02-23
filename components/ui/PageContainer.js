import Box from '@mui/material/Box'

import Nav from './Nav'

const PageContainer = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex'
    }}>
    <Nav />
    <Box
      component="main"
      sx={{
        flexGrow: 1
      }}
    >
      {children}
    </Box>
    </Box>
  )
}

export default PageContainer
