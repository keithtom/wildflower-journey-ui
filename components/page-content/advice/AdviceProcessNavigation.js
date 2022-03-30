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
  return (
    <Card>
      <Stack spacing={8}>
        <Stack spacing={4}>
          <Typography variant="h4">Giving advice</Typography>
          <div>
            <NavLink to="/advice/drafts" label="Your drafts" icon={<Edit />} />
            <NavLink to="/advice/open" label="Your open advice" icon={<QuestionAnswer />} />
          </div>
        </Stack>

        <Stack spacing={4}>
          <Typography variant="h4">Receiving advice</Typography>
          <div>
            <NavLink to="/advice/thought-partner" label="As a thought partner" icon={<EmojiObjects />} />
            <NavLink to="/advice/stakeholder" label="As a stakeholder" icon={<MenuBook />} />
          </div>
        </Stack>
      </Stack>
    </Card>
  )
}

export default AdviceProcessNavigation