import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { getScreenSize } from "@hooks/react-responsive";
import peopleApi from "@api/people";
import { useUserContext, useAssignViewingSchool } from "@lib/useUserContext";
import { clearLoggedInState } from "@lib/handleLogout";
import { handleFindMatchingItems } from "@lib/utils/usefulHandlers";
import useAuth from "@lib/utils/useAuth";
import usePerson from "@hooks/usePerson";

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
  const { workflow } = router.query;

  const { screenSize } = getScreenSize();

  const personId = currentUser?.id;
  // Fetch data
  const { data: personData, isLoading } = usePerson(personId, {
    network: true,
  });

  if (isLoading || !personData) return <PageContainer isLoading={true} />;

  const included = personData?.included;
  const schools = personData?.data?.relationships?.schools?.data;

  const userSchool =
    isLoading || !personData
      ? []
      : handleFindMatchingItems(included, schools, "id");
  const school = userSchool[0];

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  const FutureFeatures = [
    {
      name: "Enrollment & Family Communications",
      iconType: "highlight",
      imageUrl: "/assets/images/open-school/enrollment-comms.png",
      ctaLink: `/open-school/${workflow}/enrollment-and-communications`,
    },
    {
      name: "Finance & Operations",
      iconType: "pieChart",
      imageUrl: "/assets/images/open-school/finance-ops.png",
      ctaLink: `/open-school/${workflow}/finance-and-operations`,
    },
    {
      name: "My Board",
      iconType: "group",
      imageUrl: "/assets/images/open-school/board.png",
      ctaLink: `/open-school/${workflow}/my-board`,
    },
    {
      name: "Resources",
      iconType: "listUl",
      imageUrl: "/assets/images/open-school/resources.png",
      ctaLink: `/open-school/${workflow}/resources`,
    },
    {
      name: "Support@",
      iconType: "homeHeart",
      imageUrl: "/assets/images/open-school/support.png",
      ctaLink: `/open-school/${workflow}/support`,
    },
  ];

  // console.log({ included });
  // useAuth("/login");
  // console.log({ userSchool });
  // console.log({ data });

  return (
    <PageContainer>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card data-cy="open-school-dashboard-card">
            <Grid container justifyContent="space-between" spacing={6}>
              <Grid item flex={1}>
                <Stack direction="row" alignItems="center" spacing={6}>
                  <Avatar
                    size="lg"
                    src={school.attributes.logoUrl}
                    sx={{ borderRadius: 4, border: "1px solid #f1f1f1" }}
                    imgProps={{ sx: { objectFit: "contain" } }}
                  />
                  <Stack spacing={1}>
                    <Typography variant="bodyRegular">
                      Welcome, {currentUser.attributes.firstName}
                    </Typography>
                    <Typography variant="h3">
                      {school.attributes.name}
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      {school.attributes.location}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item flex={screenSize.isSm ? 1 : null}>
                <Link href={`/network/schools/${school.id}`}>
                  <Button variant="lightened" small full={screenSize.isSm}>
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
          <Link
            data-cy="open-school-checklist-cta"
            href={`/open-school/${workflow}/checklist/${thisYear}/${thisMonth}`}
          >
            <Card
              elevated
              size={screenSize.isSm ? null : "large"}
              sx={{ overflow: "hidden" }}
              variant="primaryOutlined"
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
                      <Typography variant="bodyLarge">
                        Open School Checklist
                      </Typography>
                      <Chip label="New" size="small" variant="primary" />
                    </Stack>
                    <Stack spacing={3}>
                      <Typography variant="h3" bold>
                        Collaboratively manage your school's tasks in a single,
                        simple place.
                      </Typography>
                      <Typography variant="bodyLarge" lightened>
                        The checklists you're already familiar with are here in
                        My Wildflower. Assign, sort, and complete tasks right
                        here, together.
                      </Typography>
                    </Stack>
                    <Stack>
                      <Grid>
                        <Stack direction="row" spacing={3}>
                          <Button>
                            <Typography variant="bodyRegular" bold light>
                              Get started
                            </Typography>
                          </Button>

                          {/* <Link href="https://forms.gle/KrpzuLvtUkhvQWAN8">
                          <Button variant="text">
                            <Typography variant="bodyRegular" bold>
                              Offer feedback
                            </Typography>
                          </Button>
                        </Link> */}
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
          </Link>
        </Grid>
        <Grid item>
          <Stack spacing={3} pt={12}>
            <Grid>
              <Chip
                icon={<Icon type="loader" size="small" />}
                label="Future features"
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
