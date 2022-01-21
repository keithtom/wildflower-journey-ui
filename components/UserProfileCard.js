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

  console.log({user})

  return (
    <Container outline paddingTopLarge={large}>
      <Grid container alignItems="flex-end">

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

      </Grid>
    </Container>
  )
}

export default UserProfileCard
