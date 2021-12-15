import styled from 'styled-components'

import {
  Grid,
  Text,
  Button
} from './ui'

const StyledUserCard = styled.div`
  width: 100%;
`;
const StyledProfileImage = styled.div`
  width: ${({ theme }) => theme.util.buffer*12}px;
  height: ${({ theme }) => theme.util.buffer*12}px;
  background-image: ${props => props.bg && `url('${props.bg}')`};
  background-size: cover;
  border-radius: ${({ theme }) => theme.util.radiusLarge*2}px;
`;

const UserCard = ({
  name,
  badge,
  profileImage,
  phoneNumber
}) => {
  return (
    <StyledUserCard>
      <Grid container spacing={4}>
        <Grid item>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <StyledProfileImage bg={profileImage} />
            </Grid>
            <Grid item>
              <Grid container spacing={1} flexDirection="column">
                <Grid item>
                  <Text body large bold>{name}</Text>
                </Grid>
                <Grid item>
                  <Text body regular lightened>{badge}</Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {phoneNumber ?
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Button primary lightened full>
                  Contact {name}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        : null}
      </Grid>
    </StyledUserCard>
  )
}

export default UserCard
