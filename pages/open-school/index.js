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

const OpenSchool = () => {
  const { currentUser } = useUserContext();
  const router = useRouter();

  useAuth("/login");

  const personId = currentUser?.id;

  const { data, error, isLoading, mutate } = useSWR(
    personId ? `/api/person/${personId}` : null,
    () => peopleApi.show(personId, { network: true }).then((res) => res.data),
    {
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) {
          clearLoggedInState({});
          router.push("/login");
        } else {
          console.error(error);
        }
      },
    }
  );
  if (error)
    return (
      <PageContainer isLoading={true}>
        failed to load ${error.message}
      </PageContainer>
    );
  if (isLoading || !data) return <PageContainer isLoading={true} />;

  const person = data.data;
  const included = data.included;
  const hasSchool = person.relationships.schools.length;
  const userSchool = handleFindMatchingItems(
    included,
    person.relationships.schools.data,
    "id"
  );
  const school = userSchool[0];

  // console.log({ userSchool });
  // console.log({ data });

  return (
    <PageContainer>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Card>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={6}>
                  <Avatar
                    size="lg"
                    src={school.attributes.logoUrl}
                    sx={{ borderRadius: 4 }}
                    imgProps={{ sx: { objectFit: "contain" } }}
                  />
                  <Stack spacing={1}>
                    <Typography variant="bodyRegular">
                      Welcome, {currentUser.attributes.firstName}
                    </Typography>
                    <Typography variant="h4">
                      {school.attributes.name}
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      {school.attributes.location}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item>
                <Link href={`/network/schools/${school.id}`}>
                  <Button variant="lightened" small>
                    <Typography variant="bodyRegular" bold>
                      View school profile
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Card>
        </Grid>
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
                        <Link href="/open-school/admin-checklist">
                          <Button>
                            <Typography variant="bodyRegular" bold light>
                              View More
                            </Typography>
                          </Button>
                        </Link>
                        <Link href="https://forms.gle/KrpzuLvtUkhvQWAN8">
                          <Button variant="text">
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
        <Grid item>
          <Stack spacing={3}>
            <Grid>
              <Chip
                label={
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Icon type="loader" size="small" />
                    <Typography>Future features</Typography>
                  </Stack>
                }
              />
            </Grid>
            <Typography variant="h3" bold>
              We're building even more.
            </Typography>
            <Typography variant="bodyLarge" lightened>
              We will partner and seek advice from TLs as we design and build
              each new feature.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6} alignItems="stretch">
            {FutureFeatures.map((f, i) => (
              <Grid item xs={12} sm={6} xl={4} key={i}>
                <Link href={f.ctaLink}>
                  <Card elevated sx={{ height: "100%" }}>
                    <Stack
                      justifyContent="space-between"
                      sx={{ height: "100%" }}
                      spacing={6}
                    >
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Icon type={f.iconType} variant="primary" />
                        <Typography variant="bodyLarge">{f.name}</Typography>
                      </Stack>
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Box sx={{ width: "100%" }}>
                            <img
                              src={f.imageUrl}
                              style={{ maxWidth: "100%" }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Stack>
                        <Grid>
                          <Button variant="lightened">
                            <Typography variant="bodyRegular" bold>
                              View more
                            </Typography>
                          </Button>
                        </Grid>
                      </Stack>
                    </Stack>
                  </Card>
                </Link>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} xl={4}>
              <Link href="https://forms.gle/KrpzuLvtUkhvQWAN8">
                <Card variant="lightened" sx={{ aspectRatio: "1/1" }}>
                  <Stack sx={{ height: "100%" }} justifyContent="space-between">
                    <Stack spacing={2}>
                      <Typography variant="h3" highlight bold>
                        Thoughts, ideas, or advice?
                      </Typography>
                      <Typography variant="h4" lightened>
                        We want to hear from you!
                      </Typography>
                    </Stack>
                    <Grid>
                      <Button>
                        <Typography variant="bodyRegular" bold>
                          Offer feedback
                        </Typography>
                      </Button>
                    </Grid>
                  </Stack>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default OpenSchool;

const FutureFeatures = [
  {
    name: "Enrollment & Family Communications",
    iconType: "highlight",
    imageUrl: "/assets/images/open-school/enrollment-comms.png",
    ctaLink: "/open-school/enrollment-and-communications",
  },
  {
    name: "Finance & Operations",
    iconType: "pieChart",
    imageUrl: "/assets/images/open-school/finance-ops.png",
    ctaLink: "/open-school/finance-and-operations",
  },
  {
    name: "My Board",
    iconType: "group",
    imageUrl: "/assets/images/open-school/board.png",
    ctaLink: "/open-school/my-board",
  },
  {
    name: "Resources",
    iconType: "listUl",
    imageUrl: "/assets/images/open-school/resources.png",
    ctaLink: "/open-school/resources",
  },
  {
    name: "Support@",
    iconType: "homeHeart",
    imageUrl: "/assets/images/open-school/support.png",
    ctaLink: "/open-school/support",
  },
];
