import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import getAuthHeader from "@lib/getAuthHeader";
import processesApi from "@api/workflow/processes";
import { getCookie } from "cookies-next";
import ssj_categories from "@lib/ssj/categories";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";
import Skeleton from "@mui/material/Skeleton";
import { mutate } from "swr";
import { useTranslation } from "next-i18next";
import { theme } from "../../../../../../styles/theme";
import { List } from "@mui/material";

import useAuth from "@lib/utils/useAuth";
import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  Grid,
  Modal,
  TextField,
  Select,
  Button,
} from "@ui";
import Milestone from "@components/Milestone";
import Hero from "@components/Hero";

import useMilestones from "@hooks/useMilestones";
import useSchool from "@hooks/useSchool";
import { getTranslatedAttr } from "@lib/utils/getTranslatedAttr";

const PhasePage = () => {
  const [phaseCompleteModalOpen, setPhaseCompleteModalOpen] = useState(false);
  const [addMilestoneModalOpen, setAddMilestoneModalOpen] = useState(false);

  const { t } = useTranslation("common");

  const router = useRouter();
  const { workflow, phase, schoolId } = router.query;

  const { data: school } = useSchool(schoolId, {
    serialization_fields: ["name"],
  });

  const planningHero = "/assets/images/ssj/planning.jpg";
  const visioningHero = "/assets/images/ssj/visioning.jpg";
  const startupHero = "/assets/images/ssj/startup.jpg";

  const {
    milestonesByCurrentPhase,
    isLoadingMilestonesByCurrentPhase,
    isValidating,
  } = useMilestones(
    workflow,
    {
      phase: phase,
      omit_include: true,
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
      keepPreviousData: true,
    }
  );

  // console.log({ milestonesByCurrentPhase });
  // console.log({ isLoadingMilestonesByCurrentPhase });
  // console.log(milestonesByCurrentPhase);

  useAuth("/login");

  return (
    <>
      <PageContainer title={school?.data.attributes.name}>
        <Stack spacing={12}>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={6}>
                <Typography
                  variant="h2"
                  bold
                  capitalize
                  id={`${phase}-header`}
                  data-cy={`${phase}-header`}
                >
                  {t(`ssj_phases.${phase}`)}
                </Typography>
                <Typography variant="bodyLarge" lightened>
                  {t(`ssj_ui_content.${phase}_description`)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                style={{ width: "100%", borderRadius: theme.radius.lg }}
                src={
                  phase === "planning"
                    ? planningHero
                    : phase === "visioning"
                    ? visioningHero
                    : phase === "startup"
                    ? startupHero
                    : undefined
                }
              />
            </Grid>
          </Grid>

          {isLoadingMilestonesByCurrentPhase ? (
            <Stack spacing={6}>
              {Array.from({ length: 4 }, (_, i) => (
                <Card key={i}>
                  <Stack spacing={6}>
                    <Skeleton width={240} height={48} />
                    <Stack spacing={3}>
                      {Array.from({ length: 4 }, (_, j) => (
                        <Skeleton key={j} height={64} m={0} variant="rounded" />
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          ) : (
            <Stack spacing={6}>
              {milestonesByCurrentPhase?.in_progress?.length ? (
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
                            {t("statuses.in_progress")}
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {milestonesByCurrentPhase?.in_progress?.length}
                          </Typography>
                        </Stack>
                      </Card>
                    }
                  >
                    {milestonesByCurrentPhase?.in_progress?.map((m, i) => (
                      <Milestone
                        link={`/school/${schoolId}/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={
                          m.attributes[
                            getTranslatedAttr(router.locale, "title")
                          ] || m.attributes.title
                        }
                        description={
                          m.attributes[
                            getTranslatedAttr(router.locale, "description")
                          ] || m.attributes.description
                        }
                        categories={m.attributes.categories}
                        status={m.attributes.status}
                        stepCount={m.relationships.steps.data.length}
                        completedStepsCount={m.attributes.completedStepsCount}
                        stepsAssignedCount={m.attributes.stepsAssignedCount}
                      />
                    ))}
                  </List>
                </Card>
              ) : null}
              {milestonesByCurrentPhase?.to_do?.length ? (
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
                            {t("statuses.to_do")}
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {milestonesByCurrentPhase?.to_do?.length}
                          </Typography>
                        </Stack>
                      </Card>
                    }
                  >
                    {milestonesByCurrentPhase?.to_do?.map((m, i) => (
                      <Milestone
                        link={`/school/${schoolId}/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={
                          m.attributes[
                            getTranslatedAttr(router.locale, "title")
                          ] || m.attributes.title
                        }
                        description={
                          m.attributes[
                            getTranslatedAttr(router.locale, "description")
                          ] || m.attributes.description
                        }
                        categories={m.attributes.categories}
                        status={m.attributes.status}
                        stepCount={m.relationships.steps.data.length}
                        completedStepsCount={m.attributes.completedStepsCount}
                        stepsAssignedCount={m.attributes.stepsAssignedCount}
                      />
                    ))}
                  </List>
                </Card>
              ) : null}
              {milestonesByCurrentPhase?.up_next?.length ? (
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
                          <Icon type="circle" variant="lightened" />
                          <Typography variant="bodyRegular" bold>
                            {t("statuses.up_next")}
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {milestonesByCurrentPhase?.up_next?.length}
                          </Typography>
                        </Stack>
                      </Card>
                    }
                  >
                    {milestonesByCurrentPhase?.up_next?.map((m, i) => (
                      <Milestone
                        link={`/school/${schoolId}/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={
                          m.attributes[
                            getTranslatedAttr(router.locale, "title")
                          ] || m.attributes.title
                        }
                        description={
                          m.attributes[
                            getTranslatedAttr(router.locale, "description")
                          ] || m.attributes.description
                        }
                        categories={m.attributes.categories}
                        status={m.attributes.status}
                        stepCount={m.relationships.steps.data.length}
                        completedStepsCount={m.attributes.completedStepsCount}
                        stepsAssignedCount={m.attributes.stepsAssignedCount}
                      />
                    ))}
                  </List>
                </Card>
              ) : null}
              {milestonesByCurrentPhase?.done?.length ? (
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
                          <Icon type="checkCircle" variant="success" />
                          <Typography variant="bodyRegular" bold>
                            {t("statuses.done")}
                          </Typography>
                          <Typography variant="bodyRegular" lightened>
                            {milestonesByCurrentPhase?.done?.length}
                          </Typography>
                        </Stack>
                      </Card>
                    }
                  >
                    {milestonesByCurrentPhase?.done?.map((m, i) => (
                      <Milestone
                        link={`/school/${schoolId}/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={
                          m.attributes[
                            getTranslatedAttr(router.locale, "title")
                          ] || m.attributes.title
                        }
                        description={
                          m.attributes[
                            getTranslatedAttr(router.locale, "description")
                          ] || m.attributes.description
                        }
                        categories={m.attributes.categories}
                        status={m.attributes.status}
                        stepCount={m.relationships.steps.data.length}
                        completedStepsCount={m.attributes.completedStepsCount}
                        stepsAssignedCount={m.attributes.stepsAssignedCount}
                      />
                    ))}
                  </List>
                </Card>
              ) : null}
            </Stack>
          )}

          {/* <Card variant="lightened">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="bodyRegular" bold>
                    Is there a milestone you need to work toward that isn't
                    here?
                  </Typography>
                  <Typography variant="bodyRegular" lightened>
                    Add a custom milestone to your journey so you can track your
                    progress!
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Button
                  variant="secondary"
                  onClick={() => setAddMilestoneModalOpen(true)}
                >
                  <Typography variant="bodyRegular">
                    Add custom milestone
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Card> */}
        </Stack>
      </PageContainer>
      <AddMilestoneModal
        title="Add a milestone"
        toggle={() => setAddMilestoneModalOpen(!addMilestoneModalOpen)}
        open={addMilestoneModalOpen}
      />
      {phaseCompleteModalOpen ? (
        <Modal
          title={t("ssj_ui_content.great_work")}
          open={phaseCompleteModalOpen}
          toggle={() => setPhaseCompleteModalOpen(!phaseCompleteModalOpen)}
        >
          <Card variant="lightened" size="large">
            <Stack spacing={4} alignItems="center">
              <Stack direction="row" spacing={3} alignItems="center">
                <Icon type="flag" variant="primary" size="large" />
                <Typography variant="bodyLarge" bold highlight>
                  {t("ssj_ui_content.phase_completed")}
                </Typography>
              </Stack>
              <Typography variant="h2" bold capitalize>
                {t(`ssj_phases.${phase}`)}
              </Typography>
              <Typography variant="bodyLarge" lightened center>
                {t("ssj_ui_content.youre_making_great_progress")}
              </Typography>
            </Stack>
          </Card>
        </Modal>
      ) : null}
    </>
  );
};

export default PhasePage;

const AddMilestoneModal = ({ toggle, title, open }) => {
  const resetFormTime = 1000;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      status: "",
      description: "",
    },
  });
  const onSubmit = (data) => {
    //TODO: Submit the custom milestone data to the backend
    // console.log(data);
    setTimeout(() => {
      toggle();
    }, resetFormTime);
  };
  useEffect(() => {
    setTimeout(() => {
      reset({
        title: "",
        category: "",
        status: "",
        description: "",
      });
    }, resetFormTime);
  }, [isSubmitSuccessful]);

  return (
    <Modal title={title} toggle={toggle} open={open}>
      {isSubmitSuccessful ? (
        <Card variant="lightened" size="large">
          <Stack spacing={6} alignItems="center">
            <Typography variant="h4" bold>
              You added a custom milestone!
            </Typography>
          </Stack>
        </Card>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Title"
                    placeholder="Milestone title..."
                    error={errors.title}
                    helperText={
                      errors &&
                      errors.title &&
                      errors.title &&
                      "This field is required"
                    }
                    {...field}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    multiline
                    label="Description"
                    placeholder="Milestone description..."
                    error={errors.description}
                    helperText={
                      errors &&
                      errors.description &&
                      errors.description &&
                      "This field is required"
                    }
                    {...field}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    label="Category"
                    placeholder="Select a category..."
                    options={Object.values(ssj_categories)}
                    error={errors.category}
                    helperText={
                      errors &&
                      errors.category &&
                      errors.category &&
                      "This field is required"
                    }
                    {...field}
                  />
                )}
              />
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    label="Status"
                    placeholder="Select a status..."
                    options={["To Do", "Done"]}
                    error={errors.status}
                    helperText={
                      errors &&
                      errors.status &&
                      errors.status &&
                      "This field is required"
                    }
                    {...field}
                  />
                )}
              />
            </Stack>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button variant="light" onClick={toggle}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="primary" disabled={isSubmitting} type="submit">
                  <Typography light variant="bodyRegular">
                    Add milestone
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </form>
      )}
    </Modal>
  );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
