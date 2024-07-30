import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fr } from "date-fns/locale";

import {
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
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
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const { milestones, isLoading } = useMilestones(workflowId, {
    // timeframe: formattedDate,
    timeframe: "2024-09-01",
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
        // If the recurringType is "annually_month_specific" or "monthly", use a common key
        if (
          recurringType === "annually_month_specific" ||
          recurringType === "monthly"
        ) {
          recurringType = "monthlyCombined";
        }
        if (!acc[recurringType]) {
          acc[recurringType] = [];
        }
        // If the recurringType is "annually_month_specific", unshift (add to the beginning) the item
        if (item.attributes.recurringType === "annually_month_specific") {
          acc[recurringType].unshift(item);
        } else {
          acc[recurringType].push(item);
        }
        return acc;
      }, {});
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
              <Typography variant="bodySmall" lightened>
                This Month
              </Typography>
              <Typography variant="h3" bold>
                July
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <Icon type="chevronLeft" variant="primary" />
              </IconButton>
              <IconButton>
                <Icon type="chevronRight" variant="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {!isLoading && groupedMilestones.to_do ? (
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
                        {Object.values(groupedMilestones?.to_do || {}).reduce(
                          (total, array) => total + array.length,
                          0
                        )}
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
      </Grid>
    </PageContainer>
  );
};

export default AdminChecklist;

const MilestoneGroup = ({ workflowId, milestones, periodName }) => {
  const router = useRouter();
  const { workflow } = router.query;

  const [open, setOpen] = useState(false);
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
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
