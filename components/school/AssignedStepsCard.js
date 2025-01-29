import { Card, Typography, Stack, Grid, Button, Icon, Link } from "../ui";
import { useTranslation } from "next-i18next";

const AssignedStepsCard = ({
  assignedSteps,
  workflow,
  schoolId,
  milestonesToDo = [],
}) => {
  const { t } = useTranslation("common");
  if (assignedSteps === 0) {
    return (
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
                    // href={`/ssj/${workflow}/${milestone.attributes.phase}/${milestone.id}`}
                    href={`school/${schoolId}/ssj/${workflow}/${milestone.attributes.phase}/${milestone.id}`}
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
    );
  }

  return (
    <Card variant="primaryLightened">
      <Grid container alignItems="center">
        <Grid item flex={1} data-cy="you-have-tasks-statement">
          <Stack direction="row" spacing={2}>
            <Typography variant="h3" bold>
              {t("ssj_ui_content.you_have")}{" "}
            </Typography>
            <Typography variant="h3" highlight bold>
              {assignedSteps} {t("ssj_ui_content.task")}
              {assignedSteps > 1 ? `s` : null}
            </Typography>{" "}
            <Typography variant="h3" bold>
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
