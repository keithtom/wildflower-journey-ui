import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import peopleApi from "@api/people";
import { useUserContext, useAssignViewingSchool } from "@lib/useUserContext";
import { clearLoggedInState } from "@lib/handleLogout";
import { handleFindMatchingItems } from "@lib/utils/usefulHandlers";
import useAuth from "@lib/utils/useAuth";

import {
  PageContainer,
  Grid,
  Typography,
  Avatar,
  Card,
  Stack,
  Button,
  Icon,
  Chip,
  Box,
  Link,
} from "@ui";

const ChecklistThisYear = () => {
  const { currentUser } = useUserContext();
  const router = useRouter();

  // console.log({ currentUser });
  // useAuth("/login");

  return (
    <PageContainer>
      <Grid container>
        <Grid item>
          <Typography variant="h3" bold>
            This Year
          </Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ChecklistThisYear;
