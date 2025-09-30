import { useMemo } from "react";
import {
  Card,
  Typography,
  Stack,
  Grid,
  Button,
  Icon,
  Link,
  Spinner,
} from "../ui";
import { useTranslation } from "next-i18next";
import useAssignedStepsCount from "@hooks/useAssignedStepsCount";
import useMilestones from "@hooks/useMilestones";
import { theme } from "../../styles/theme";
import { format } from "date-fns";

const AssignedStepsCard = ({
  workflows = [],
  selectedWorkflow,
  schoolId,
  schoolStatus,
  currentPhase,
}) => {
  const { t } = useTranslation("common");
  const isOpen = schoolStatus === "Open";

  // Get the month range for open schools
  const monthRange = useMemo(() => {
    const currentDate = new Date();
    return {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
    };
  }, []);

  // Get total assigned steps count
  // console.log({ workflows });
  const { assignedSteps, isLoading: isLoadingCount } = useAssignedStepsCount(
    workflows,
    { current_user: true }
  );
  // debugger;
  // Use selectedWorkflow passed from parent to avoid duplicate fetching

  // Fetch milestones for the selected workflow only when assignedSteps is 0
  const { milestones, isLoading: isLoadingMilestones } = useMilestones(
    assignedSteps === 0 ? selectedWorkflow?.id : null,
    selectedWorkflow?.attributes?.recurring
      ? { timeframe: format(Date.now(), "yyyy-MM-dd"), omit_include: true }
      : { phase: currentPhase, omit_include: true }
  );

  // Filter milestones based on school status and conditions
  const milestonesToDo = useMemo(() => {
    if (!milestones?.data?.data || assignedSteps > 0) return [];

    const milestonesData = milestones.data.data;

    // Filter out "done" milestones first
    const incompleteMilestones = milestonesData.filter(
      (milestone) => milestone?.attributes?.status !== "done"
    );

    if (isOpen) {
      return incompleteMilestones.filter((milestone) => {
        const dueDate = milestone?.attributes?.dueDate
          ? new Date(milestone?.attributes?.dueDate)
          : null;
        return (
          dueDate && dueDate >= monthRange.start && dueDate <= monthRange.end
        );
      });
    }

    return incompleteMilestones.filter(
      (milestone) => milestone?.attributes?.phase === currentPhase
    );
  }, [milestones, isOpen, currentPhase, monthRange, assignedSteps]);

  // console.log(milestonesToDo);

  // Combined loading state - only include milestone loading when we need it
  const isLoading =
    isLoadingCount || (assignedSteps === 0 && isLoadingMilestones);

  if (isLoading) {
    return (
      <Card variant="primaryLightened">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Spinner />
          </Grid>
        </Grid>
      </Card>
    );
  }

  return assignedSteps === 0 ? (
    <Card noPadding>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Card size="large" noBorder noRadius sx={{ height: "100%" }}>
            <Stack spacing={6}>
              <Icon type="calendarCheck" variant="primary" />
              <Typography variant="h3" bold>
                {t("ssj_ui_content.looks_like_you_have_no_tasks")}
              </Typography>
              <Typography variant="bodyLarge" lightened>
                {t("ssj_ui_content.to_start_try_a_milestone")}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card noBorder variant="lightened" noRadius sx={{ height: "100%" }}>
            <Stack spacing={2}>
              {milestonesToDo?.map((milestone, index) => (
                <Link
                  href={
                    isOpen
                      ? `/school/${schoolId}/open-school/${
                          milestone.relationships.workflow.data.id
                        }/checklist/${new Date(
                          milestone.attributes.dueDate
                        ).getFullYear()}/${
                          new Date(milestone.attributes.dueDate).getMonth() + 1
                        }/${milestone.id}`
                      : `/school/${schoolId}/ssj/${milestone.relationships.workflow.data.id}/${milestone.attributes.phase}/${milestone.id}`
                  }
                  key={index}
                >
                  <Card variant="light" size="small" hoverable>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="bodyRegular" bold>
                        {milestone.attributes.title}
                      </Typography>
                      <Button small variant="text">
                        {t("ssj_ui_content.start_here")}
                      </Button>
                    </Stack>
                  </Card>
                </Link>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Card>
  ) : (
    <Card variant="primaryLightened">
      <Grid container alignItems="center">
        <Grid item flex={1} data-cy="you-have-tasks-statement">
          <Stack direction="row" spacing={2}>
            <Typography variant="h3" bold>
              {t("ssj_ui_content.you_have")}{" "}
              <span style={{ color: theme.color.primary.main }}>
                {assignedSteps} {t("ssj_ui_content.task")}
                {assignedSteps > 1 ? `s` : null}{" "}
              </span>{" "}
              {t("ssj_ui_content.on_your_to_do_list")}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Link href={`/school/${schoolId}/to-do-list`}>
            <Button>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="bodyLarge" bold light>
                  {t("ssj_ui_content.start_working")}
                </Typography>
                <Icon type="rightArrow" variant="light" />
              </Stack>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AssignedStepsCard;
