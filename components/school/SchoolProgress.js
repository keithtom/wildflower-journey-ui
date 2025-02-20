import { Grid, Typography, Stack, Card, Link, Box } from "../ui";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import CategoryChip from "../CategoryChip";
import { styled, css } from "@mui/material/styles";

const ProgressBar = ({ processes }) => {
  const numberOfProcesses = processes?.length;
  const StyledProcessIndicator = styled(Box)`
    width: calc(100% / ${numberOfProcesses});
    height: ${({ theme }) => theme.util.buffer}px;
    background: ${({ theme }) => theme.color.neutral.main};
    border-radius: ${({ theme }) => theme.radius.full}px;
    /* done */
    ${(props) =>
      props.variant === "done" &&
      css`
        background: ${props.theme.color.primary.main};
      `}
    /* inProgress */
    ${(props) =>
      props.variant === "in progress" &&
      css`
        background: ${props.theme.color.neutral.main};
      `}
      /* toDo */
      ${(props) =>
      props.variant === "to do" &&
      css`
        background: ${props.theme.color.neutral.main};
      `}
        /* upNext */
        ${(props) =>
      props.variant === "up next" &&
      css`
        background: ${props.theme.color.neutral.main};
      `}
  `;
  let p = processes;
  let reverseProcesses = [...p].reverse();

  const { t } = useTranslation("common");

  return (
    <Stack spacing={3}>
      <Typography variant="bodyMini" bold lightened uppercase>
        {processes.filter((p) => p === "done").length} {t("ssj_ui_content.of")}{" "}
        {processes.length} {t("ssj_ui_content.milestones_completed")}
      </Typography>
      <Stack spacing={1} direction="row">
        {reverseProcesses?.map((p, i) => (
          <StyledProcessIndicator key={i} variant={p} />
        ))}
      </Stack>
    </Stack>
  );
};

const PhaseProgressCard = ({ phase, processes, link, isCurrentPhase }) => {
  const visioningImg = "/assets/images/ssj/visioning.jpg";
  const planningImg = "/assets/images/ssj/planning.jpg";
  const startupImg = "/assets/images/ssj/startup.jpg";

  const { t } = useTranslation("common");
  return (
    <Link href={link}>
      <Card
        variant={isCurrentPhase ? "primaryOutlined" : "lightened"}
        hoverable
      >
        <Stack spacing={6}>
          <Typography variant="bodyLarge" bold capitalize>
            {t(`ssj_phases.${phase.toLowerCase()}`)}
          </Typography>
          <ProgressBar processes={processes} />
          <Stack spacing={2}>
            <Card
              size="small"
              variant={isCurrentPhase && "lightened"}
              noPadding
              noBorder
            >
              <Box sx={{ width: "100%", height: "200px" }}>
                <img
                  src={
                    phase === "visioning"
                      ? visioningImg
                      : phase === "planning"
                      ? planningImg
                      : phase === "startup" && startupImg
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            </Card>
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
};

const SchoolProgress = ({ progress, workflow, isOpen, schoolId }) => {
  const { t } = useTranslation("common");
  const [viewSummaryProgress, setViewSummaryProgress] = useState(true);

  const currentMonthProgress = progress?.by_due_month?.find((month) => {
    // Parse the month name (e.g. "January 2024") into a Date object
    const monthDate = new Date(month.name);
    const currentDate = new Date();

    // Check if the month and year match current month and year
    return (
      monthDate.getMonth() === currentDate.getMonth() &&
      monthDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <Stack spacing={6}>
      <Typography variant="h3" bold>
        {isOpen ? `It's ${currentMonth}!` : t("ssj_ui_content.progress")}
      </Typography>

      <Stack direction="row" spacing={6}>
        <Typography
          variant="bodyLarge"
          bold
          hoverable
          lightened={!viewSummaryProgress}
          onClick={() => setViewSummaryProgress(true)}
        >
          Summary
        </Typography>
        <Typography
          variant="bodyLarge"
          bold
          hoverable
          lightened={viewSummaryProgress}
          onClick={() => setViewSummaryProgress(false)}
        >
          {t("ssj_ui_content.categories")}
        </Typography>
      </Stack>

      {viewSummaryProgress ? (
        isOpen ? (
          <Grid container>
            <Grid item xs={12}>
              <Card variant="lightened">
                <Stack spacing={6} direction="row" alignItems="center">
                  <img
                    src="/assets/images/school-calendar.jpg"
                    style={{
                      width: "64px",
                      borderRadius: "12px",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ width: "100%" }}>
                    <ProgressBar processes={currentMonthProgress.statuses} />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {progress?.by_phase?.map((phase, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <PhaseProgressCard
                  phase={phase.name}
                  link={`/school/${schoolId}/ssj/${workflow}/${phase.name}`}
                  processes={phase.statuses}
                />
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <Grid container spacing={3} alignItems="stretch">
          {progress?.by_category
            ?.filter(
              (category) => category.statuses && category.statuses.length > 0
            )
            ?.map((category, index) => (
              <Grid item xs={12} sm={4} key={index}>
                {/* <Link href={`/school/${schoolId}/ssj/${workflow}/milestones`}> */}
                <Card variant="lightened" sx={{ height: "100%" }}>
                  <Stack spacing={6}>
                    <Grid container>
                      <Grid item>
                        <CategoryChip category={category.name} size="small" />
                      </Grid>
                    </Grid>
                    <ProgressBar processes={category.statuses} />
                  </Stack>
                </Card>
                {/* </Link> */}
              </Grid>
            ))}
        </Grid>
      )}
    </Stack>
  );
};

export default SchoolProgress;
