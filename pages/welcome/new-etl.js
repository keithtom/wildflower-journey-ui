import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";

import useAuth from "@lib/utils/useAuth";
import { useUserContext } from "@lib/useUserContext";
import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Box,
  Icon,
  Avatar,
  Link,
  PageContainer,
} from "@ui";
import Header from "@components/Header";

const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const StyledInviteHero = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.neutral.dark};
`;
const StyledHeroText = styled(Box)`
  position: absolute;
  padding: ${({ theme }) => theme.util.buffer * 24}px;
`;
const StyledGreetingAvatar = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;
const StyledShiftedAvatar = styled(Box)`
  position: absolute;
  top: -${({ theme }) => theme.util.buffer * 8}px;
`;
const StyledMessage = styled(Card)`
  margin-top: 130px;
  &:before {
  }
`;

const NewETL = ({}) => {
  const { currentUser } = useUserContext();
  const opsGuide = currentUser?.attributes?.ssj?.opsGuide?.data?.attributes;
  useAuth("/login");
  // console.log(currentUser);
  return (
    <PageContainer isLoading={!currentUser} hideNav>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card noPadding>
            <StyledInviteHero>
              <img
                src="https://images.unsplash.com/photo-1611957082141-c449bb2b4ada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  opacity: ".6",
                }}
              />
              <StyledHeroText>
                <Stack alignItems="center" spacing={3}>
                  <Stack direction="row" spacing={2}>
                    <Icon type="buildingHouse" variant="light" />
                    <Icon type="extension" variant="light" />
                    <Icon type="palette" variant="light" />
                  </Stack>
                  <Typography variant="h4" bold light center>
                    You're invited to join Wildflower Schools!
                  </Typography>
                </Stack>
              </StyledHeroText>
            </StyledInviteHero>
            {opsGuide ? (
              <StyledGreetingAvatar>
                <StyledShiftedAvatar>
                  <Stack spacing={3} alignItems="center">
                    <Avatar
                      sx={{ border: "2px solid white" }}
                      size="lg"
                      src={opsGuide.imageUrl}
                    />
                    <Stack alignItems="center">
                      <Typography variant="bodyRegular" bold>
                        {opsGuide.firstName} {opsGuide.lastName}
                      </Typography>
                      <Typography variant="bodyRegular" lightened>
                        Operations Guide
                      </Typography>
                    </Stack>
                  </Stack>
                </StyledShiftedAvatar>
              </StyledGreetingAvatar>
            ) : null}
            <Card noBorder>
              <Stack spacing={3}>
                <StyledMessage variant="primaryLightened" size="small">
                  <Typography variant="bodySmall">
                    Hi {currentUser?.attributes.firstName}! We are so excited
                    for you to join our community and start accessing support
                    and resources along the path to opening your own Montessori
                    School! Let's get started by confirming a few details.
                  </Typography>
                </StyledMessage>
                <Link href="/welcome/create-password">
                  <Button full>
                    <Typography variant="bodyRegular" light>
                      Get started
                    </Typography>
                  </Button>
                </Link>
              </Stack>
            </Card>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NewETL;
