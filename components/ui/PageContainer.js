import {
  Box
} from '@ui'

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
          paddingTop: 16,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default PageContainer
