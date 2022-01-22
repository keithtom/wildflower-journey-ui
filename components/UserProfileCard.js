import UserInfo from './UserInfo'
import {
  Container,
  Grid,
  ConditionalLink
} from './ui'

const UserProfileCard = ({
  user,
  large
}) => {

  return (
    <ConditionalLink linkUrl={user.profileRoute}>
      <Container outline paddingTopLarge={large} link={user.profileRoute}>
        <Grid container alignItems="center" justifyContent="space-between">

          <Grid item>
            <Grid container flexDirection="column" spacing={1}>
              <Grid item>
                <UserInfo
                  large={large}
                  name={user.name}
                  role={user.role}
                  profileImage={user.profileImage}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item>
            <Icon type="dot-menu"/>
          </Grid> */}

        </Grid>
      </Container>
    </ConditionalLink>
  )
}

export default UserProfileCard
