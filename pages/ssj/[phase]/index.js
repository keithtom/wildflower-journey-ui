import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { RadioGroup, FormControlLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import setAuthHeader from "../../../lib/setAuthHeader";
import axios from "axios";
import baseUrl from "../../../lib/utils/baseUrl";

import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  Grid,
  Modal,
  IconButton,
  TextField,
  Select,
  Radio,
  Button,
  Divider,
  Link,
} from "@ui";
import Milestone from "../../../components/Milestone";

const PhasePage = ({
  startConsideringMilestones,
  data,
  milestonesInProgress,
  milestonesToDo,
  milestonesUpNext,
  milestonesDone,
}) => {
  const [phaseCompleteModalOpen, setPhaseCompleteModalOpen] = useState(false);
  const [addMilestoneModalOpen, setAddMilestoneModalOpen] = useState(false);

  const router = useRouter();
  const { phase } = router.query;

  // console.log({ data });

  return (
    <>
      <PageContainer>
        <Stack spacing={12}>
          <Typography variant="h2" bold capitalize>
            {phase}
          </Typography>

          <Stack spacing={6}>
            {milestonesInProgress.length ? (
              <Card>
                <Stack spacing={3}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item ml={3}>
                      <Stack direction="row" spacing={6}>
                        <Icon type="rightArrowCircleSolid" variant="primary" />
                        <Typography variant="bodyLarge" bold>
                          In Progress
                        </Typography>
                        <Typography variant="bodyLarge" lightened>
                          {milestonesInProgress.length}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Stack spacing={3}>
                    {milestonesInProgress.map((m, i) => (
                      <Milestone
                        link={`/ssj/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={m.attributes.title}
                        description={m.attributes.description}
                        effort={m.attributes.effort}
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
            {milestonesToDo.length ? (
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
                          {milestonesToDo.length}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Stack spacing={3}>
                    {milestonesToDo.map((m, i) => (
                      <Milestone
                        link={`/ssj/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={m.attributes.title}
                        description={m.attributes.description}
                        effort={m.attributes.effort}
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
            {milestonesUpNext.length ? (
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
                          {milestonesUpNext.length}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack spacing={3}>
                    {milestonesUpNext.map((m, i) => (
                      <Milestone
                        link={`/ssj/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={m.attributes.title}
                        description={m.attributes.description}
                        effort={m.attributes.effort}
                        categories={m.attributes.categories}
                        status={m.attributes.status}
                        stepCount={m.relationships.steps.data.length}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ) : null}
            {milestonesDone.length ? (
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
                          {milestonesDone.length}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack spacing={3}>
                    {milestonesDone.map((m, i) => (
                      <Milestone
                        link={`/ssj/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={m.attributes.title}
                        description={m.attributes.description}
                        effort={m.attributes.effort}
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

          <Card variant="lightened">
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
          </Card>

          {startConsideringMilestones && phase !== "startup" && (
            <>
              <Stack direction="column">
                <Typography variant="bodyRegular" bold lightened>
                  Start considering
                </Typography>
                <Typography variant="h3" bold>
                  {phase === "visioning"
                    ? "Planning"
                    : phase === "planning" && "Startup"}{" "}
                  Milestones
                </Typography>
              </Stack>
              <Card>
                <Stack spacing={6}>
                  <Stack spacing={3}>
                    {startConsideringMilestones.map((m, i) => (
                      <Milestone
                        link={`/ssj/${m.attributes.phase}/${m.id}`}
                        key={i}
                        title={m.attributes.title}
                        description={m.attributes.description}
                        effort={m.attributes.effort}
                        categories={m.attributes.categories}
                        status={m.attributes.status}
                        stepCount={m.relationships.steps.data.length}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </>
          )}
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
    console.log(data);
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
                    options={[
                      "Finance",
                      "Facilities",
                      "Governance & Compliance",
                      "Human Resources",
                      "Community & Family Engagement",
                      "Classroom & Program Practices",
                      "Albums",
                      "Advice & Affiliation",
                      "WF Community & Culture",
                    ]}
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

export async function getServerSideProps({ params, req, res }) {
  // const userId = query.userId;
  // const ssjId = query.ssjId;

  const { phase } = params;
  const workflowId = "c502-4f84";
  // const workflowId = "5947-ab7f"
  const apiRoute = `${baseUrl}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}&start_considering=true`;
  setAuthHeader({ req, res });

  const response = await axios.get(apiRoute);
  const data = await response.data;

  const milestonesInProgress = [];
  const milestonesToDo = [];
  const milestonesUpNext = [];
  const milestonesDone = [];

  const currentPhaseMilestones = data.data.filter(
    (m) => m.attributes.phase === phase
  );
  const startConsideringMilestones = data.data.filter(
    (m) => m.attributes.phase !== phase
  );

  currentPhaseMilestones.forEach((milestone) => {
    if (milestone.attributes.status == "to do") {
      milestonesToDo.push(milestone);
    } else if (milestone.attributes.status == "up next") {
      milestonesUpNext.push(milestone);
    } else if (milestone.attributes.status == "done") {
      milestonesDone.push(milestone);
    } else if (milestone.attributes.status == "in progress") {
      milestonesInProgress.push(milestone);
    }
  });

  return {
    props: {
      startConsideringMilestones,
      data,
      currentPhaseMilestones,
      milestonesInProgress,
      milestonesToDo,
      milestonesUpNext,
      milestonesDone,
    },
  };
}
