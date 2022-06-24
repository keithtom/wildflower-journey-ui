import {useRouter} from 'next/router'

import {
  Card,
  Stack,
  Grid,
  Typography,
  NavLink,
  Box
} from '@ui'
import {
  MenuItem
} from '@mui/material'
import {
  Edit,
  QuestionAnswer,
  EmojiObjects,
  MenuBook
} from '@mui/icons-material'

const AdviceProcessNavigation = () => {

  //Navigation needs to be aware of the user's id?
  const userId = '2a09-fba2'

  const router = useRouter()

  return (
    <Box sx={{bgcolor: "neutral.light"}}>
      <Stack spacing={2}>
        <Stack>
          <Box sx={{padding: 4}}><Typography variant="subtitle1">Seeking advice</Typography></Box>
          <div>
            <NavLink to={`/advice/people/${userId}/decisions/draft`} secondary label="Your drafts" icon={<Edit fontSize="small" />} active={router.pathname.includes('/draft')}/>
            <NavLink to={`/advice/people/${userId}/decisions/open`} secondary label="Your open advice" icon={<QuestionAnswer fontSize="small" />} active={router.pathname.includes('/open')}/>
            <NavLink to={`/advice/people/${userId}/decisions/closed`} secondary label="Your closed advice" icon={<QuestionAnswer fontSize="small" />} active={router.pathname.includes('/closed')}/>
          </div>
        </Stack>

        <Stack>
          <Box sx={{padding: 4}}><Typography variant="subtitle1">Giving advice</Typography></Box>
          <div>
            <NavLink to={`/advice/people/${userId}/decisions/stakeholder`} secondary label="As a stakeholder" icon={<MenuBook fontSize="small" />} active={router.pathname.includes('/stakeholder')}/>
          </div>
        </Stack>
      </Stack>
    </Box>
  )
}

export default AdviceProcessNavigation
