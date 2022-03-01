import { styled } from '@mui/material/styles';
import {
  Box
} from '@ui'

import Nav from './Nav'

const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex'
}));
const PageContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(16)
}));

const PageContainer = ({ children }) => {
  return (
    <PageWrapper>
      <Nav />
      <PageContent>
        {children}
      </PageContent>
    </PageWrapper>
  )
}

export default PageContainer
