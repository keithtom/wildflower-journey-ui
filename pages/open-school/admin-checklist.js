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

const AdminChecklist = () => {
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
                    <Icon type="calendar" variant="primary" />
                    <Typography variant="bodyLarge">Admin Checklist</Typography>
                    <Chip label="Coming Q1 2024" size="small" />
                  </Stack>
                  <Stack spacing={3}>
                    <Typography variant="h3" bold>
                      Collaboratively manage your school's tasks in a single,
                      simple place.
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      The admin checklists you're already familiar with are
                      getting a facelift. Assign, sort, and complete tasks right
                      here in My Wildflower, together.
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
                <Box sx={{ maxHeight: "360px" }}>
                  <img
                    src="/assets/images/open-school/monthly-checklist.png"
                    style={{ height: "640px" }}
                  />
                </Box>
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
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Card variant="lightened">
                <Stack spacing={3}>
                  <Icon type="check" variant="primary" />
                  <Stack>
                    <Typography variant="bodyRegular" bold>
                      Task assignment
                    </Typography>
                    <Typography variant="bodyRegular" lightened>
                      Assign tasks to yourself and partners and check them off
                      together.
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="lightened">
                <Stack spacing={3}>
                  <Icon type="check" variant="primary" />
                  <Stack>
                    <Typography variant="bodyRegular" bold>
                      View monthly, quarterly, yearly
                    </Typography>
                    <Typography variant="bodyRegular" lightened>
                      View tasks by month, quarter, or year and keep organized.
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

export default AdminChecklist;
