import styled from 'styled-components'

import {
  Container,
  Grid,
  Text
} from './ui'


const SchoolProfileHero = ({
  schoolName,
  subtitle,
  address
}) => {
  return (
    <Container yellow paddingTopLarge>
      <Grid container justifyContent="space-between" alignItems="flex-end">

        <Grid item>
          <Grid container flexDirection="column" spacing={1}>
            <Grid item>
              <Text title large bold>{schoolName}</Text>
            </Grid>
            <Grid item>
              <Text body regular opacity="medium">{subtitle}</Text>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Text body regular opacity="medium">{address}</Text>
        </Grid>

      </Grid>
    </Container>
  )
}

export default SchoolProfileHero
