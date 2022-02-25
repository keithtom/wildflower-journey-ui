import {
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material'

const SchoolResultItem = ({ schoolName }) => {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item>
            <Typography>{schoolName}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SchoolResultItem
