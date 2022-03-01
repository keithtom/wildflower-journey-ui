import {
  Grid,
  Card,
  Typography
} from '@ui'

const SchoolResultItem = ({ schoolName }) => {
  return (
    <Card>
      <Grid container>
        <Grid item>
          <Typography>{schoolName}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default SchoolResultItem
