import{
  Grid,
  Stack,
  Card,
  Typography,
  NavLink
} from '@ui'
import {
  Edit,
  QuestionAnswer,
  EmojiObjects,
  MenuBook
} from '@mui/icons-material'

const AdviceDraftsContent = () => {
  return (
    <Grid container p={8}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}><AdviceProcessNavigation /></Grid>
        <Grid item xs={12} sm={8}>Content</Grid>
      </Grid>
    </Grid>
  )
}

export default AdviceDraftsContent

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