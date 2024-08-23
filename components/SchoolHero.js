import { styled } from "@mui/material/styles";

import { Box, Grid, Typography, Card } from "@ui";

const StyledLogo = styled(Box)`
  background: ${({ theme }) => theme.color.neutral.lightest};
  border: 2px solid white;
  transform: translateY(calc(-50% - 24px));
  border-radius: ${({ theme }) => theme.radius.lg}px;
  width: 100%;
  aspect-ratio: 1/1;
  box-shadow: ${({ theme }) => theme.shadow.small.main};
  margin-bottom: -124px;
  overflow: hidden;
`;

const SchoolHero = ({ heroImg, logoImg, schoolName, schoolLocation }) => {
  return (
    <>
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Card
            size="large"
            sx={{
              height: "320px",
              backgroundImage: `url(${heroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container justifyContent="center">
            <Grid item xs={8}>
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
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" bold>
            {schoolName}
          </Typography>
          {schoolLocation ? (
            <Typography variant="bodyLarge" lightened>
              {schoolLocation}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default SchoolHero;
