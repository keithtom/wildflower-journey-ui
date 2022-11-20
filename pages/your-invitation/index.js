import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";

import { PageContainer, Grid, Stack, Typography, Card } from "@ui";
import Header from "@components/Header";

const YourInvitation = ({}) => {
  const user = false;
  return (
    <>
      <Header user={user} />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card>Hi</Card>
        </Grid>
      </Grid>
    </>
  );
};

export default YourInvitation;
