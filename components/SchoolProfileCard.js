import {
  Container,
  Grid,
  Text,
  Icon,
  ConditionalLink
} from './ui'

const SchoolProfileCard = ({
  schoolName,
  schoolImage,
  subtitle,
  address,
  schoolLink,
  large
}) => {
  return (
    <ConditionalLink linkUrl={schoolLink}>
      <Container bgImage={schoolImage} display link={schoolLink}>
        <Grid container justifyContent="space-between" alignItems="flex-end">

          <Grid item>
            <Grid container flexDirection="column" spacing={1}>
              <Grid item>
                <Text title large={large} small={!large} bold light={schoolImage}>{schoolName}</Text>
              </Grid>
              <Grid item>
                <Text body regular opacity="dark" light={schoolImage}>{subtitle}</Text>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Icon type="map" opacity="dark" light={schoolImage}/>
              </Grid>
              <Grid item>
                <Text body regular opacity="dark" light={schoolImage}>{address}</Text>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </ConditionalLink>
  )
}

export default SchoolProfileCard
