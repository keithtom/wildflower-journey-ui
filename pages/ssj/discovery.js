import { useState } from "react";
import { RadioGroup, FormControlLabel } from "@mui/material";

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
} from "@ui";
import Milestone from "../../components/Milestone";

const DiscoveryPage = ({}) => {
  const [addMilestoneModalOpen, setAddMilestoneModalOpen] = useState(false);

  return (
    <>
      <PageContainer>
        <Stack spacing={12}>
          <Typography variant="h3" bold>
            Discovery
          </Typography>

          <Stack spacing={6}>
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
                        {FakeMilestonesToDo.length}
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
                  {FakeMilestonesToDo.map((m, i) => (
                    <Milestone
                      key={i}
                      title={m.title}
                      effort={m.effort}
                      category={m.category}
                      assignee={m.assignee}
                      status={m.status}
                    />
                  ))}
                </Stack>
              </Stack>
            </Card>
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
                        {FakeMilestonesUpNext.length}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Icon type="plus" variant="lightened" />
                  </Grid>
                </Grid>
                <Stack spacing={3}>
                  {FakeMilestonesUpNext.map((m, i) => (
                    <Milestone
                      key={i}
                      title={m.title}
                      effort={m.effort}
                      category={m.category}
                      assignee={m.assignee}
                      status={m.status}
                    />
                  ))}
                </Stack>
              </Stack>
            </Card>
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
                        {FakeMilestonesDone.length}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Icon type="plus" variant="lightened" />
                  </Grid>
                </Grid>
                <Stack spacing={3}>
                  {FakeMilestonesDone.map((m, i) => (
                    <Milestone
                      key={i}
                      title={m.title}
                      effort={m.effort}
                      category={m.category}
                      assignee={m.assignee}
                      status={m.status}
                    />
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Stack>
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

export default DiscoveryPage;

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

const AddMilestoneModal = ({ toggle, title, open }) => {
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const handleMilestoneTitleChange = (event) => {
    setMilestoneTitle(event.target.value);
  };

  const [category, setCategory] = useState("");
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [status, setStatus] = useState("");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [effort, setEffort] = useState("");
  const handleEffortChange = (event) => {
    setEffort(event.target.value);
  };

  const [assignee, setAssignee] = useState("");
  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  return (
    <Modal title={title} toggle={toggle} open={open}>
      <Stack spacing={3}>
        <TextField
          label="Title"
          placeholder="Milestone title..."
          value={milestoneTitle}
          onChange={handleMilestoneTitleChange}
        />
        <Select
          label="Category"
          value={category}
          onChange={handleCategoryChange}
          placeholder="Select a category..."
          options={["1", "2"]}
        />
        <Select
          label="Status"
          value={status}
          onChange={handleStatusChange}
          placeholder="Select a status..."
          options={["1", "2"]}
        />
        <Select
          label="Effort"
          value={effort}
          onChange={handleEffortChange}
          placeholder="Select an effort level..."
          options={["1", "2"]}
        />
        <RadioGroup value={assignee} onChange={handleAssigneeChange}>
          <Typography variant="bodyRegular">Assignee</Typography>
          <FormControlLabel value="you" control={<Radio />} label="You" />
          <FormControlLabel
            value="paula armstrong"
            control={<Radio />}
            label="Paula Armstrong"
          />
        </RadioGroup>
      </Stack>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button variant="light">Cancel</Button>
        </Grid>
        <Grid item>
          <Button variant="primary" disabled={true}>
            Add milestone
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};
