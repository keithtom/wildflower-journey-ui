import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import getAuthHeader from "@lib/getAuthHeader";
import processesApi from "@api/workflow/processes";
import { getCookie } from "cookies-next";
import ssj_categories from "@lib/ssj/categories";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";
import Skeleton from "@mui/material/Skeleton";

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

const PhasePage = ({
  milestonesInProgress,
  milestonesToDo,
  milestonesUpNext,
  milestonesDone,
}) => {
  const [phaseCompleteModalOpen, setPhaseCompleteModalOpen] = useState(false);
  const [addMilestoneModalOpen, setAddMilestoneModalOpen] = useState(false);

  const router = useRouter();
  const { workflow, phase } = router.query;

  const planningHero = "/assets/images/ssj/planning.jpg";
  const visioningHero = "/assets/images/ssj/visioning.jpg";
  const startupHero = "/assets/images/ssj/startup.jpg";

  const { milestonesByCurrentPhase, isLoadingMilestonesByCurrentPhase } =
    useMilestones(workflow, {
      phase: phase,
    });
  // console.log({ milestonesByCurrentPhase });
  // console.log({ isLoadingMilestonesByCurrentPhase });

  useAuth("/login");

  return (
    <>
      <PageContainer>
        <Stack spacing={12}>
          <Hero
            imageUrl={
              phase === "planning"
                ? planningHero
                : phase === "visioning"
                ? visioningHero
                : phase === "startup" && startupHero
            }
          />
          <Typography variant="h2" bold capitalize id={`${phase}-header`}>
            {phase}
          </Typography>

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
                <Card>
                  <Stack spacing={3}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item ml={3}>
                        <Stack direction="row" spacing={6}>
                          <Icon
                            type="rightArrowCircleSolid"
                            variant="primary"
                          />
                          <Typography variant="bodyLarge" bold>
                            In Progress
                          </Typography>
                          <Typography variant="bodyLarge" lightened>
                            {milestonesByCurrentPhase?.in_progress?.length}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Stack spacing={3}>
                      {milestonesByCurrentPhase?.in_progress?.map((m, i) => (
                        <Milestone
                          link={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                          key={i}
                          title={m.attributes.title}
                          description={m.attributes.description}
                          categories={m.attributes.categories}
                          status={m.attributes.status}
                          stepCount={m.relationships.steps.data.length}
                          completedStepsCount={m.attributes.completedStepsCount}
                          stepsAssignedCount={m.attributes.stepsAssignedCount}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              ) : null}
              {milestonesByCurrentPhase?.to_do?.length ? (
                <Card>
                  <Stack spacing={3}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item ml={3}>
                        <Stack direction="row" spacing={6}>
                          <Icon type="rightArrowCircle" variant="primary" />
                          <Typography variant="bodyLarge" bold>
                            To do
                          </Typography>
                          <Typography variant="bodyLarge" lightened>
                            {milestonesByCurrentPhase?.to_do?.length}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Stack spacing={3}>
                      {milestonesByCurrentPhase?.to_do?.map((m, i) => (
                        <Milestone
                          link={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                          key={i}
                          title={m.attributes.title}
                          description={m.attributes.description}
                          categories={m.attributes.categories}
                          status={m.attributes.status}
                          stepCount={m.relationships.steps.data.length}
                          completedStepsCount={m.attributes.completedStepsCount}
                          stepsAssignedCount={m.attributes.stepsAssignedCount}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              ) : null}
              {milestonesByCurrentPhase?.up_next?.length ? (
                <Card>
                  <Stack spacing={3}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item ml={3}>
                        <Stack direction="row" spacing={6}>
                          <Icon type="circle" variant="lightened" />
                          <Typography variant="bodyLarge" bold>
                            Up Next
                          </Typography>
                          <Typography variant="bodyLarge" lightened>
                            {milestonesByCurrentPhase?.up_next?.length}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Stack spacing={3}>
                      {milestonesByCurrentPhase?.up_next?.map((m, i) => (
                        <Milestone
                          link={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                          key={i}
                          title={m.attributes.title}
                          description={m.attributes.description}
                          categories={m.attributes.categories}
                          status={m.attributes.status}
                          stepCount={m.relationships.steps.data.length}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              ) : null}
              {milestonesByCurrentPhase?.done?.length ? (
                <Card>
                  <Stack spacing={3}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item ml={3}>
                        <Stack direction="row" spacing={6}>
                          <Icon type="checkCircle" variant="success" />
                          <Typography variant="bodyLarge" bold>
                            Done
                          </Typography>
                          <Typography variant="bodyLarge" lightened>
                            {milestonesByCurrentPhase?.done?.length}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Stack spacing={3}>
                      {milestonesByCurrentPhase?.done?.map((m, i) => (
                        <Milestone
                          link={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                          key={i}
                          title={m.attributes.title}
                          description={m.attributes.description}
                          categories={m.attributes.categories}
                          status={m.attributes.status}
                          stepCount={m.relationships.steps.data.length}
                        />
                      ))}
                    </Stack>
                  </Stack>
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
          title="Great work!"
          open={phaseCompleteModalOpen}
          toggle={() => setPhaseCompleteModalOpen(!phaseCompleteModalOpen)}
        >
          <Card variant="lightened" size="large">
            <Stack spacing={4} alignItems="center">
              <Stack direction="row" spacing={3} alignItems="center">
                <Icon type="flag" variant="primary" size="large" />
                <Typography variant="bodyLarge" bold highlight>
                  Phase completed!
                </Typography>
              </Stack>
              <Typography variant="h2" bold capitalize>
                {phase}
              </Typography>
              <Typography variant="bodyLarge" lightened center>
                You're making great progress!
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
