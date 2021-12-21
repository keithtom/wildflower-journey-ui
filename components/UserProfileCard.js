import styled from 'styled-components'

import UserInfo from './UserInfo'
import {
  Container,
  Grid,
  Text
} from './ui'


const UserProfileCard = ({
  user,
  large
}) => {
  return (
    <Container outline paddingTopLarge={large}>
      <Grid container alignItems="flex-end">

        <Grid item>
          <Grid container flexDirection="column" spacing={1}>
            <Grid item>
              <UserInfo
                large={large}
                name={user.name}
                badge={user.badge}
                profileImage={user.profileImage}
              />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Container>
  )
}

export default UserProfileCard
