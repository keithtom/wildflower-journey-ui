import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";

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

const StyledInviteHero = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.neutral.dark};
`;
const StyledHeroText = styled(Box)`
  position: absolute;
  padding: ${({ theme }) => theme.util.buffer * 8}px;
`;

const ExistingTL = ({}) => {
  const { currentUser } = useUserContext();
  // console.log(currentUser);
  return (
    <PageContainer hideNav>
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
                    It's time to join My Wildflower!
                  </Typography>
                </Stack>
              </StyledHeroText>
            </StyledInviteHero>

            <Card noBorder>
              <Stack spacing={6}>
                <Typography variant="h3" bold>
                  Welcome in, {currentUser?.attributes.firstName}
                </Typography>
                <Typography variant="bodyRegular">
                  We've been hard at work building tools for you. Get ready for
                  more support and connection on your teaching journey!
                </Typography>

                <Link href="/welcome/existing-member/create-password">
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

export default ExistingTL;
