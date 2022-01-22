import { useState } from 'react'
import styled from 'styled-components'

import {
  Grid,
  Text,
  Button,
  Icon,
  Dialog,
  Container
} from './ui'

const StyledUserInfo = styled.div`
  width: 100%;
`;
const StyledProfileImage = styled.div`
  width: ${props => props.large ? props.theme.util.buffer*20 : props.theme.util.buffer*8}px;
  height: ${props => props.large ? props.theme.util.buffer*20 : props.theme.util.buffer*8}px;
  background-image: ${props => props.bg && `url('${props.bg}')`};
  background-size: cover;
  border-radius: ${({ theme }) => theme.util.radiusLarge*20}px;
  position: relative;
`;
const StyledBadge = styled.div`
  position: absolute;
  top: -${({ theme }) => theme.util.buffer * 2}px;
  right: -${({ theme }) => theme.util.buffer * 2}px;
  outline: 2px solid ${({ theme }) => theme.color.neutral.white};
  width: ${(props) => props.large ? props.theme.util.buffer * 8 : props.theme.util.buffer * 5}px;
  height: ${(props) => props.large ? props.theme.util.buffer * 8 : props.theme.util.buffer * 5}px;
  background: ${({ theme }) => theme.color.primary.purple.main};
  border-radius: ${({ theme }) => theme.util.radiusLarge}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = ({
  name,
  role,
  profileImage,
  phoneNumber,
  isFoundationLeader,
  large
}) => {

  const [contactCardOpen, setContactCardOpen] = useState(false)

  return (
    <>
      <StyledUserInfo>
        <Grid container spacing={4}>

          {(name && role && profileImage) ?
            <Grid item>
              <Grid container spacing={large ? 8 : 4} alignItems="center">
                <Grid item>
                  <StyledProfileImage large={large} bg={profileImage}>
                    {isFoundationLeader ?
                      <StyledBadge large={large}>
                        <Icon type="star" light size={large ? 24 : 12}/>
                      </StyledBadge>
                    : null}
                  </StyledProfileImage>
                </Grid>
                <Grid item>
                  <Grid container spacing={large ? 1 : 0} flexDirection="column">
                    <Grid item>
                      <Text title={large} body={!large} regular bold>{name}</Text>
                    </Grid>
                    <Grid item>
                      <Text body small={!large} large={large} lightened>{role}</Text>
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
                  <Button primary lightened full onClick={() => setContactCardOpen(true)}>
                    Contact {name}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          : null}

        </Grid>
      </StyledUserInfo>

      <Dialog
        open={contactCardOpen}
        toggleDialog={() => setContactCardOpen(!contactCardOpen)}
        title={`Contact ${name}`}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Text body regular lightened>Please contact members of this community within daylight hours.</Text>
          </Grid>
          <Grid item xs={12}>
            <Container small>
              <Grid container spacing={4}>
                <Grid item>
                  <Icon type="phone" />
                </Grid>
                <Grid item>
                  <Text body regular>{phoneNumber}</Text>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Dialog>

    </>
  )
}

export default UserInfo
