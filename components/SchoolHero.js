import { useState } from "react";
import { styled, css } from "@mui/material/styles";

import {
  Avatar,
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  Stack,
  IconButton,
  Icon,
  Link,
} from "@ui";

const StyledLogo = styled(Box)`
  background: ${({ theme }) => theme.color.neutral.lightest};
  border: 2px solid white;
  transform: translateY(calc(-50% - 24px));
  border-radius: ${({ theme }) => theme.radius.lg}px;
  width: 200px;
  height: 200px;
  box-shadow: ${({ theme }) => theme.shadow.small.main};
  margin-bottom: -124px;
  overflow: hidden;
`;

const SchoolHero = ({
  heroImg,
  logoImg,
  schoolName,
  schoolLocation,
  schoolLeaders,
}) => {
  return (
    <>
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Card
            noBorder
            size="large"
            sx={{
              height: "320px",
              backgroundImage: `url(${heroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </Grid>
        <Grid item ml={[6]}>
          <StyledLogo>
            <img
              src={logoImg}
              style={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
              }}
            />
          </StyledLogo>
        </Grid>
        <Grid item flex={1}>
          <Stack>
            <Typography variant="h2" bold>
              {schoolName}
            </Typography>
            {location ? (
              <Typography variant="bodyLarge" lightened>
                {schoolLocation}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        {schoolLeaders ? (
          <Grid item>
            <Stack direction="row" spacing={6}>
              {schoolLeaders.map((leader, i) => (
                <Link href={`/network/people/${leader.id}`}>
                  <Stack
                    direction="row"
                    spacing={3}
                    key={i}
                    alignItems="center"
                  >
                    <Avatar src={leader.attributes.imageUrl} />
                    <Stack>
                      <Typography variant="bodyRegular" bold>
                        {leader.attributes.firstName}{" "}
                        {leader.attributes.lastName.charAt(0)}.
                      </Typography>
                      {leader.attributes.roleList.map((r, i) => (
                        <Typography variant="bodySmall" lightened key={i}>
                          {r}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default SchoolHero;
