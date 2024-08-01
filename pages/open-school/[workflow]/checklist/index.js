import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fr } from "date-fns/locale";

import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Skeleton,
} from "@mui/material";

import peopleApi from "@api/people";
import { useUserContext, useAssignViewingSchool } from "@lib/useUserContext";
import { clearLoggedInState } from "@lib/handleLogout";
import { handleFindMatchingItems } from "@lib/utils/usefulHandlers";
import useAuth from "@lib/utils/useAuth";
import useMilestones from "@hooks/useMilestones";
import {
  PageContainer,
  Grid,
  Typography,
  Avatar,
  Card,
  Stack,
  Button,
  Icon,
  IconButton,
  Chip,
  Box,
  Link,
} from "@ui";
import Milestone from "@components/Milestone";

const AdminChecklist = () => {
  const { currentUser } = useUserContext();
  const router = useRouter();
  const workflowId = currentUser?.attributes.schools[0].workflowId;

  // get the current date
  // const currentDate = new Date();
  // const formattedTodayDate = currentDate.toISOString().split("T")[0];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  }, [currentMonth, currentYear]);

  const handleIncrementMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // Reset to January
      setCurrentYear((prevYear) => prevYear + 1); // Increment the year
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1); // Increment the month
    }
  };

  const handleDecrementMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // Reset to December
      setCurrentYear((prevYear) => prevYear - 1); // Decrement the year
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1); // Decrement the month
    }
  };

  const handleResetDate = () => {
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  // Create a new Date object with the currentYear and currentMonth
  const timeframeDate = new Date(currentYear, currentMonth);

  // Format the Date object as "YYYY-MM-DD"
  const timeframe = `${timeframeDate.getFullYear()}-${String(
    timeframeDate.getMonth() + 1
  ).padStart(2, "0")}-01`;

  console.log({ timeframe });

  const [year, month] = timeframe.split("-");
  const nonZeroBasedDate = new Date(year, month - 1);

  const { milestones, isLoading } = useMilestones(workflowId, {
    // timeframe: currentMonth,
    timeframe,
    omit_include: true,
  });

  function groupMilestones(milestones) {
    // First, group by status
    const groupedByStatus = milestones.data.data.reduce((acc, item) => {
      const status = item.attributes.status.replace(/\s+/g, "_");
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(item);
      return acc;
    }, {});

    // Then, within each status group, group by recurringType
    for (let status in groupedByStatus) {
      groupedByStatus[status] = groupedByStatus[status].reduce((acc, item) => {
        let recurringType = item.attributes.recurringType;
        // If the recurringType is "annually_month_specific", "summer", or "monthly", use a common key
        if (
          recurringType === "annually_month_specific" ||
          recurringType === "summer" ||
          recurringType === "monthly"
        ) {
          recurringType = "monthlyCombined";
        }
        if (!acc[recurringType]) {
          acc[recurringType] = [];
        }
        acc[recurringType].push(item);
        return acc;
      }, {});

      // Sort the items within the "monthlyCombined" group
      if (groupedByStatus[status]["monthlyCombined"]) {
        groupedByStatus[status]["monthlyCombined"].sort((a, b) => {
          const order = {
            annually_month_specific: 1,
            summer: 2,
            monthly: 3,
          };
          return (
            order[a.attributes.recurringType] -
            order[b.attributes.recurringType]
          );
        });
      }
    }

    return groupedByStatus;
  }

  // Assuming `milestones` is your data object
  const groupedMilestones = isLoading ? null : groupMilestones(milestones);

  console.log({ groupedMilestones });
  console.log({ milestones });
  console.log({ currentUser });
  // useAuth("/login");

  return (
    <PageContainer>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h3" bold>
                {new Date(nonZeroBasedDate).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  onClick={handleResetDate}
                  variant="text"
                  small
                  disabled={isToday}
                >
                  <Typography variant="bodyRegular" bold highlight>
                    {isToday ? "Current Month" : "Return to Today"}
                  </Typography>
                </Button>

                <IconButton onClick={handleDecrementMonth}>
                  <Icon type="chevronLeft" variant="primary" />
                </IconButton>
                <IconButton onClick={handleIncrementMonth}>
                  <Icon type="chevronRight" variant="primary" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        {isLoading ? (
          <Grid item xs={12}>
            <Card noPadding>
              <List
                subheader={
                  <Card variant="lightened" size="small" noRadius>
                    <Skeleton variant="text" width={120} />
                  </Card>
                }
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <ListItem key={index} divider>
                    <ListItemText>
                      <Skeleton variant="text" width={120} />
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        ) : milestones.data.data.length ? (
          <>
            {groupedMilestones.in_progress ? (
              <Grid item xs={12}>
                <Card noPadding>
                  <List
                    subheader={
                      <Card variant="lightened" size="small" noRadius>
                        <Stack
                          direction="row"
                          spacing={5}
                          pl={1}
                          alignItems="center"
                        >
                          <Icon
                            type="rightArrowCircleSolid"
                            variant="primary"
                          />
                          <Typography variant="bodyRegular" bold>
                            In Progress
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {Object.values(
                              groupedMilestones?.in_progress || {}
                            ).reduce((total, array) => total + array.length, 0)}
                          </Typography>
                        </Stack>
                      </Card>
                    }
                  >
                    {groupedMilestones.in_progress.past_months && (
                      <MilestoneGroup
                        periodName="Past Months"
                        milestones={groupedMilestones.in_progress.past_months}
                      />
                    )}
                    {groupedMilestones.in_progress.monthlyCombined && (
                      <MilestoneGroup
                        periodName="This Month"
                        milestones={
                          groupedMilestones.in_progress.monthlyCombined
                        }
                      />
                    )}
                    {groupedMilestones.in_progress.quarterly && (
                      <MilestoneGroup
                        periodName="This Quarter"
                        milestones={groupedMilestones.in_progress.quarterly}
                      />
                    )}
                    {groupedMilestones.in_progress.annually && (
                      <MilestoneGroup
                        periodName="This Year"
                        milestones={groupedMilestones.in_progress.annually}
                      />
                    )}
                  </List>
                </Card>
              </Grid>
            ) : null}
            {groupedMilestones.to_do ? (
              <Grid item xs={12}>
                <Card noPadding>
                  <List
                    subheader={
                      <Card variant="lightened" size="small" noRadius>
                        <Stack
                          direction="row"
                          spacing={5}
                          pl={1}
                          alignItems="center"
                        >
                          <Icon
                            className="rightArrowCircle"
                            type="rightArrowCircle"
                            variant="primary"
                          />
                          <Typography variant="bodyRegular" bold>
                            To Do
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {Object.values(
                              groupedMilestones?.to_do || {}
                            ).reduce((total, array) => total + array.length, 0)}
                          </Typography>
                        </Stack>
                      </Card>
                    }
                  >
                    {groupedMilestones.to_do.past_months && (
                      <MilestoneGroup
                        periodName="Past Months"
                        milestones={groupedMilestones.to_do.past_months}
                      />
                    )}
                    {groupedMilestones.to_do.monthlyCombined && (
                      <MilestoneGroup
                        periodName="This Month"
                        milestones={groupedMilestones.to_do.monthlyCombined}
                      />
                    )}
                    {groupedMilestones.to_do.quarterly && (
                      <MilestoneGroup
                        periodName="This Quarter"
                        milestones={groupedMilestones.to_do.quarterly}
                      />
                    )}
                    {groupedMilestones.to_do.annually && (
                      <MilestoneGroup
                        periodName="This Year"
                        milestones={groupedMilestones.to_do.annually}
                      />
                    )}
                  </List>
                </Card>
              </Grid>
            ) : null}

            {groupedMilestones.done ? (
              <Grid item xs={12}>
                <Card noPadding>
                  <List
                    subheader={
                      <Card variant="lightened" size="small" noRadius>
                        <Stack
                          direction="row"
                          spacing={5}
                          pl={1}
                          alignItems="center"
                        >
                          <Typography variant="bodyRegular" bold>
                            Done
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {Object.values(
                              groupedMilestones?.done || {}
                            ).reduce((total, array) => total + array.length, 0)}
                          </Typography>
                        </Stack>
                      </Card>
                    }
                  >
                    {groupedMilestones.done.past_months && (
                      <MilestoneGroup
                        periodName="Past Months"
                        milestones={groupedMilestones.done.past_months}
                      />
                    )}
                    {groupedMilestones.done.monthlyCombined && (
                      <MilestoneGroup
                        periodName="This Month"
                        milestones={groupedMilestones.done.monthlyCombined}
                      />
                    )}
                    {groupedMilestones.done.quarterly && (
                      <MilestoneGroup
                        periodName="This Quarter"
                        milestones={groupedMilestones.done.quarterly}
                      />
                    )}
                    {groupedMilestones.done.annually && (
                      <MilestoneGroup
                        periodName="This Year"
                        milestones={groupedMilestones.done.annually}
                      />
                    )}
                  </List>
                </Card>
              </Grid>
            ) : null}
          </>
        ) : (
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={8}>
                <Box p={24}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={6}
                  >
                    <Typography variant="h3">
                      There is nothing to do here!
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      This month is outside the current academic year, and
                      therefore has no checklist!
                    </Typography>
                    <Button
                      onClick={handleResetDate}
                      variant="primary"
                      disabled={isToday}
                    >
                      <Typography variant="bodyRegular" bold>
                        Return to Today
                      </Typography>
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default AdminChecklist;

const MilestoneGroup = ({ workflowId, milestones, periodName }) => {
  const router = useRouter();
  const { workflow } = router.query;

  const [open, setOpen] = useState(true);
  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{ borderTop: "1px solid #f1f1f1" }}
      >
        <ListItemIcon sx={{ minWidth: "48px", paddingLeft: "1px" }}>
          <Icon
            type="chevronRight"
            size="medium"
            sx={{
              rotate: open ? "90deg" : "0deg",
              transition: "all .15s ease-in-out",
            }}
          />
        </ListItemIcon>
        <ListItemText>
          <Stack direction="row" spacing={5}>
            <Typography variant="bodyRegular" bold>
              {periodName}
            </Typography>
            <Typography variant="bodyRegular" lightened>
              {milestones.length}
            </Typography>
          </Stack>
        </ListItemText>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {milestones.map((m, i) => (
            <Milestone
              key={i}
              link={`/open-school/${workflow}/checklist/${m.id}`}
              title={m.attributes.title}
              description={m.attributes.description}
              categories={m.attributes.categories}
              status={m.attributes.status}
              stepCount={m.relationships.steps.data.length}
              completedStepsCount={m.attributes.completedStepsCount}
              stepsAssignedCount={m.attributes.stepsAssignedCount}
              flag={
                m.attributes.recurringType === "monthly" ? "Every month" : null
              }
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
