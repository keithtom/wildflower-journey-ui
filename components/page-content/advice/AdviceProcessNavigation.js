import {
  Card,
  Stack,
  Grid,
  Typography,
  NavLink
} from '@ui'
import {
  Edit,
  QuestionAnswer,
  EmojiObjects,
  MenuBook
} from '@mui/icons-material'

const AdviceProcessNavigation = () => {

  //Navigation needs to be aware of the user's id?
  const userId = '2a09-fba2'

  return (
    <Card>
      <Stack spacing={8}>
        <Stack spacing={4}>
          <Typography variant="h4">Seeking advice</Typography>
          <div>
            <NavLink to={`/advice/people/${userId}/decisions/drafts`} label="Your drafts" icon={<Edit fontSize="small" />} />
            <NavLink to={`/advice/people/${userId}/decisions/open`} label="Your open advice" icon={<QuestionAnswer fontSize="small" />} />
            <NavLink to={`/advice/people/${userId}/decisions/closed`} label="Your closed advice" icon={<QuestionAnswer fontSize="small" />} />
          </div>
        </Stack>

        <Stack spacing={4}>
          <Typography variant="h4">Giving advice</Typography>
          <div>
            <NavLink to={`/advice/people/${userId}/decisions/stakeholder`} label="As a stakeholder" icon={<MenuBook fontSize="small" />} />
          </div>
        </Stack>
      </Stack>
    </Card>
  )
}

export default AdviceProcessNavigation
