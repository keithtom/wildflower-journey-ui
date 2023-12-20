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

const FinanceOps = () => {
  const { currentUser } = useUserContext();
  const router = useRouter();

  useAuth("/login");

  return (
    <PageContainer>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Card
            elevated
            variant="primaryOutlined"
            size="large"
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={16}>
              <Grid item xs={12} sm={6}>
                <Stack
                  justifyContent="space-between"
                  sx={{ height: "100%" }}
                  spacing={6}
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Icon type="pieChart" variant="primary" />
                    <Typography variant="bodyLarge">
                      Finance & Operations
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    <Typography variant="h2" bold>
                      Manage your school's financial information
                    </Typography>
                  </Stack>
                  <Stack>
                    <Grid>
                      <Stack direction="row" spacing={3}>
                        <Link href="https://forms.gle/KrpzuLvtUkhvQWAN8">
                          <Button variant="lightened">
                            <Typography variant="bodyRegular" bold>
                              Offer feedback
                            </Typography>
                          </Button>
                        </Link>
                      </Stack>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  src="/assets/images/open-school/finance-ops.png"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" bold>
            Features like
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6} alignItems="stretch">
            <Grid item xs={12} sm={6}>
              <Card variant="lightened" sx={{ height: "100%" }}>
                <Stack spacing={3}>
                  <Icon type="check" variant="primary" />
                  <Stack>
                    <Typography variant="bodyRegular" bold>
                      Keep track of all key dates, information, contact
                      information to keep your school running
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="lightened" sx={{ height: "100%" }}>
                <Stack spacing={3}>
                  <Icon type="check" variant="primary" />
                  <Stack>
                    <Typography variant="bodyRegular" bold>
                      Interactive finance dashboard to track and manage cash
                      flow and budget/actuals
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default FinanceOps;
