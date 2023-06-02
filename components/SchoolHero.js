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
  transform: translateY(calc(-50% - 48px));
  border-radius: ${({ theme }) => theme.radius.lg}px;
  width: 200px;
  height: 200px;
  box-shadow: ${({ theme }) => theme.shadow.small.main};
  margin-bottom: -148px;
`;

const SchoolHero = ({ heroImg, logoImg, schoolName, schoolLocation }) => {
  return (
    <>
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Card
            full
            noBorder
            size="large"
            sx={{
              height: "240px",
              backgroundImage: `url(${heroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
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
          <Stack spacing={2}>
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
      </Grid>
    </>
  );
};

export default SchoolHero;
