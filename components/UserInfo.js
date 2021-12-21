import styled from 'styled-components'

import {
  Grid,
  Text,
  Button
} from './ui'

const StyledUserInfo = styled.div`
  width: 100%;
`;
const StyledProfileImage = styled.div`
  width: ${props => props.large ? props.theme.util.buffer*20 : props.theme.util.buffer*12}px;
  height: ${props => props.large ? props.theme.util.buffer*20 : props.theme.util.buffer*12}px;
  background-image: ${props => props.bg && `url('${props.bg}')`};
  background-size: cover;
  border-radius: ${({ theme }) => theme.util.radiusLarge*20}px;
`;

const UserInfo = ({
  name,
  badge,
  profileImage,
  phoneNumber,
  large
}) => {
  return (
    <StyledUserInfo>
      <Grid container spacing={4}>

        {(name && badge && profileImage) ?
          <Grid item>
            <Grid container spacing={large ? 8 : 4} alignItems="center">
              <Grid item>
                <StyledProfileImage large bg={profileImage} />
              </Grid>
              <Grid item>
                <Grid container spacing={1} flexDirection="column">
                  <Grid item>
                    <Text title={large} body={!large} large bold>{name}</Text>
                  </Grid>
                  <Grid item>
                    <Text body regular lightened>{badge}</Text>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        : null}

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
    </StyledUserInfo>
  )
}

export default UserInfo
