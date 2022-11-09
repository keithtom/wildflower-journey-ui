import { useState } from "react";
import { RadioGroup, FormControlLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

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
} from "@ui";
import Milestone from "../../../components/Milestone";

const PhasePage = ({
  PhaseTitle,
  FakeMilestonesToDo,
  FakeMilestonesUpNext,
  FakeMilestonesToConsider,
  FakeMilestonesDone,
  data,
  MilestonesToDo,
  MilestonesUpNext,
  MilestonesDone,
}) => {
  const [addMilestoneModalOpen, setAddMilestoneModalOpen] = useState(false);
  const milestonesToConsider = true;

  console.log({ data });

  return (
    <>
      <PageContainer>
        <Stack spacing={12}>
          <Typography variant="h3" bold capitalize>
            {PhaseTitle}
          </Typography>

          <Stack spacing={6}>
            {MilestonesToDo.length ? (
              <Card>
                <Stack spacing={3}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Stack direction="row" spacing={6}>
                        <Icon type="circle" variant="primary" />
                        <Typography variant="bodyLarge" bold>
                          To do
                        </Typography>
                        <Typography variant="bodyLarge" lightened>
                          {MilestonesToDo.length}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() =>
                          setAddMilestoneModalOpen(!addMilestoneModalOpen)
                        }
                      >
                        <Icon type="plus" variant="lightened" />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Stack spacing={3}>
                    {MilestonesToDo.map((m, i) => (
                      <Milestone
                        link={`/ssj/${PhaseTitle}/${m.id}`}
                        key={i}
                        title={m.attributes.title}
                        effort={m.attributes.effort}
                        category={m.attributes.category}
                        assignee={m.attributes.assignee}
                        status={m.attributes.status}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ) : null}
            {MilestonesUpNext.length ? (
              <Card>
                <Stack spacing={3}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Stack direction="row" spacing={6}>
                        <Icon type="rightArrowCircle" variant="lightened" />
                        <Typography variant="bodyLarge" bold>
                          Up Next
                        </Typography>
                        <Typography variant="bodyLarge" lightened>
                          {MilestonesUpNext.length}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Icon type="plus" variant="lightened" />
                    </Grid>
                  </Grid>
                  <Stack spacing={3}>
                    {MilestonesUpNext.map((m, i) => (
                      <Milestone
                        link={`/ssj/${PhaseTitle}/${m.attributes.title}`}
                        key={i}
                        title={m.attributes.title}
                        effort={m.attributes.effort}
                        category={m.attributes.category}
                        assignee={m.attributes.assignee}
                        status={m.attributes.status}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ) : null}
            {MilestonesDone.length ? (
              <Card>
                <Stack spacing={3}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Stack direction="row" spacing={6}>
                        <Icon type="checkCircle" variant="success" />
                        <Typography variant="bodyLarge" bold>
                          Done
                        </Typography>
                        <Typography variant="bodyLarge" lightened>
                          {MilestonesDone.length}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Icon type="plus" variant="lightened" />
                    </Grid>
                  </Grid>
                  <Stack spacing={3}>
                    {MilestonesDone.map((m, i) => (
                      <Milestone
                        link={`/ssj/${PhaseTitle}/${m.attributes.title}`}
                        key={i}
                        title={m.attributes.title}
                        effort={m.attributes.effort}
                        category={m.attributes.category}
                        assignee={m.attributes.assignee}
                        status={m.attributes.status}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ) : null}
          </Stack>

          <Divider />

          {milestonesToConsider && (
            <>
              <Stack direction="column" spacing={2}>
                <Typography variant="bodyRegular" bold lightened>
                  Start considering
                </Typography>
                <Typography variant="h3" bold>
                  Visioning Milestones
                </Typography>
              </Stack>
              <Card>
                <Stack spacing={6}>
                  <Stack spacing={3}>
                    {FakeMilestonesToConsider.map((m, i) => (
                      <Milestone
                        link={`/ssj/${PhaseTitle}/${m.title}`}
                        key={i}
                        title={m.title}
                        effort={m.effort}
                        category={m.category}
                        assignee={m.assignee}
                        status={m.status}
                      />
                    ))}
                  </Stack>
                  <Typography variant="bodyLarge" lightened>
                    And 2 more...
                  </Typography>
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
    </>
  );
};

export default PhasePage;

const AddMilestoneModal = ({ toggle, title, open }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      status: "",
      effort: "",
      assignee: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Modal title={title} toggle={toggle} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                label="Category"
                placeholder="Select a category..."
                options={["1", "2"]}
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
                options={["1", "2"]}
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
          <Controller
            name="effort"
            control={control}
            render={({ field }) => (
              <Select
                label="Effort"
                placeholder="Select an effort level..."
                options={["1", "2"]}
                {...field}
              />
            )}
          />

          <Typography variant="bodyRegular">Assignee</Typography>

          <Controller
            name="assignee"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup value={value} onChange={onChange}>
                <FormControlLabel value="you" control={<Radio />} label="You" />
                <FormControlLabel
                  value="paula armstrong"
                  control={<Radio />}
                  label="Paula Armstrong"
                />
              </RadioGroup>
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
              <Typography light>Add milestone</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export async function getServerSideProps({ query }) {
  // const userId = query.userId;
  // const ssjId = query.ssjId;

  const apiRoute = `https://api.wildflowerschools.org/v1/workflow/workflows/1d50-fea7`;

  const res = await fetch(apiRoute);
  const data = await res.json();

  const PhaseTitle = data.data.attributes.name;
  const MilestonesToDo = data.included.filter(
    (milestone) => milestone.attributes.status === "todo"
  );
  const MilestonesUpNext = data.included.filter(
    (milestone) => milestone.attributes.status === "upnext"
  );
  const MilestonesDone = data.included.filter(
    (milestone) => milestone.attributes.status === "done"
  );

  const FakeMilestonesToConsider = [
    {
      title: "Preview the Wildflower Budget Process",
      effort: "large",
      category: "Finance",
      assignee: "unassigned",
      status: "to do",
    },
    {
      title: "Preview the Wildflower Affiliation Process",
      effort: "large",
      category: "Album Advice & Affiliation",
      assignee: "unassigned",
      status: "to do",
    },
  ];
  const FakeMilestonesToDo = [
    {
      title: "Schedule a conversation",
      effort: "large",
      category: "Album Advice & Affiliation",
      assignee: "unassigned",
      status: "to do",
    },
  ];

  const FakeMilestonesUpNext = [
    {
      title: "Decide whether to continue your SSJ",
      effort: "large",
      category: "Album Advice & Affiliation",
      assignee: "unassigned",
      status: "up next",
    },
  ];

  const FakeMilestonesDone = [
    {
      title: "Get to know Wildflower",
      effort: "large",
      category: "Album Advice & Affiliation",
      assignee: "unassigned",
      status: "done",
    },
    {
      title: "Discovery self assessment",
      effort: "large",
      category: "Album Advice & Affiliation",
      assignee: "unassigned",
      status: "done",
    },
  ];

  return {
    props: {
      PhaseTitle,
      FakeMilestonesToConsider,
      FakeMilestonesToDo,
      FakeMilestonesUpNext,
      FakeMilestonesDone,
      data,
      MilestonesToDo,
      MilestonesUpNext,
      MilestonesDone,
    },
  };
}
