import { useRouter } from "next/router";
import { useState } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import setAuthHeader from "../../../../../lib/setAuthHeader";
import axios from "axios";

import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Grid,
  Button,
  TextField,
  Radio,
  Box,
} from "@ui";
import Task from "../../../../../components/Task";
import Resource from "../../../../../components/Resource";

const StyledTaskHeader = styled(Box)`
  /* downplayed */
  ${(props) =>
    props.downplayed &&
    css`
      opacity: 0.5;
    `}
`;
const StyledTaskResources = styled(Card)`
  /* downplayed */
  ${(props) =>
    props.downplayed &&
    css`
      opacity: 0.5;
    `}
`;

const TaskPage = ({
  MilestoneId,
  MilestoneTitle,
  TaskTitle,
  FakeDecisionOptions,
  FakeResources,
}) => {
  const [userIsEditing, setUserIsEditing] = useState(false);
  const isSensibleDefault = false;
  const isDecision = false;
  const isUpNext = false;

  const router = useRouter();
  const { phase, task } = router.query;
  const taskId = task;

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={3}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Link href={`/ssj/${phase}/${MilestoneId}`}>
                  <IconButton>
                    <Icon type="chevronLeft" />
                  </IconButton>
                </Link>
                <Typography capitalize>{MilestoneTitle}</Typography>
              </Stack>
            </Grid>
            <Grid item>
              {userIsEditing ? (
                <Stack spacing={1} direction="row">
                  <Button
                    variant="light"
                    onClick={() => setUserIsEditing(false)}
                  >
                    <Typography variant="bodyRegular">Cancel</Typography>
                  </Button>
                  <Button variant="primary">
                    <Typography variant="bodyRegular">Save</Typography>
                  </Button>
                </Stack>
              ) : (
                <Button variant="light" onClick={() => setUserIsEditing(true)}>
                  <Stack spacing={3} direction="row" alignItems="center">
                    <Icon type="pencil" size="small" />
                    <Typography variant="bodyRegular">Edit</Typography>
                  </Stack>
                </Button>
              )}
            </Grid>
          </Grid>
          <StyledTaskHeader downplayed={isUpNext}>
            <Task
              taskId={taskId}
              notNavigable
              title={TaskTitle}
              isDecision={isDecision}
              isNext={true}
            />
          </StyledTaskHeader>
        </Stack>

        {isDecision ? (
          <DecisionForm
            options={FakeDecisionOptions}
            disabled={userIsEditing}
          />
        ) : null}

        <StyledTaskResources downplayed={isUpNext}>
          <Stack spacing={3}>
            <Typography variant="bodyLarge" bold>
              Resources
            </Typography>
            {userIsEditing ? (
              <>
                <NewResourceInput />
                {FakeResources &&
                  FakeResources.map((r, i) => (
                    <EditableResourceItem title={r.title} key={i} />
                  ))}
              </>
            ) : FakeResources ? (
              FakeResources.map((r, i) => (
                <Resource title={r.title} link={r.link} />
              ))
            ) : (
              <Card hoverable elevated size="small">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Stack>
                      <Typography variant="bodyRegular" bold>
                        Looks like there are no resources for this task.
                      </Typography>
                      <Typography variant="bodySmall" lightened>
                        Add a resource that will help complete this task.
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Icon type="plus" variant="primary" />
                  </Grid>
                </Grid>
              </Card>
            )}
          </Stack>
        </StyledTaskResources>
      </Stack>
    </PageContainer>
  );
};

export default TaskPage;

const NewResourceInput = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      linkUrl: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container flexDirection="row" spacing={3} alignItems="center">
        <Grid item flex={1}>
          <Card size="small">
            <Grid container spacing={3}>
              <Grid item flex={1}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Resource title"
                      placeholder="Provide a title for this resource"
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
              </Grid>
              <Grid item flex={1}>
                <Controller
                  name="linkUrl"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Link URL"
                      placeholder="Add a link to a resource to help complete this task"
                      error={errors.linkUrl}
                      helperText={
                        errors &&
                        errors.linkUrl &&
                        errors.linkUrl &&
                        "This field is required"
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item>
          <IconButton type="submit">
            <Icon type="plus" />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};
const EditableResourceItem = ({ title }) => {
  return (
    <Grid container flexDirection="row" spacing={3} alignItems="center">
      <Grid item flex={1}>
        <Card size="small" variant="lightened">
          <Stack direction="row" spacing={3} alignItems="center">
            <Icon type="link" size="small" variant="primary" />
            <Typography varaint="bodyRegular">{title}</Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid item>
        <IconButton>
          <Icon type="close" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
const DecisionForm = ({ options, disabled }) => {
  const [userIsUpdatingDecision, setUserIsUpdatingDecision] = useState(false);
  const [decisionOption, setDecisionOption] = useState();
  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };
  const notDecided = !decisionOption;
  const isDecided = userIsUpdatingDecision ? false : true;

  const StyledDecisionCard = styled(Card)`
    /* Disabled */
    ${(props) =>
      props.disabled &&
      css`
        opacity: 0.25;
        pointer-events: none;
      `}
  `;

  return (
    <StyledDecisionCard
      variant={isDecided ? "outlined" : "primaryOutlined"}
      disabled={disabled}
    >
      <Stack spacing={3}>
        <RadioGroup value={decisionOption} handleOptionsChange>
          {options.map((o, i) => (
            <FormControlLabel
              key={i}
              value={o.value}
              control={<Radio disabled={isDecided} />}
              label={o.label}
              onChange={handleDecisionOptionChange}
            />
          ))}
        </RadioGroup>
        <Grid container>
          <Grid item>
            {isDecided ? (
              <Button
                variant="light"
                onClick={() => setUserIsUpdatingDecision(true)}
              >
                <Typography>Change decision</Typography>
              </Button>
            ) : (
              <Button
                disabled={notDecided}
                onClick={() => setUserIsUpdatingDecision(false)}
              >
                <Typography>Decide</Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Stack>
    </StyledDecisionCard>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const MilestoneId = query.milestone;
  const TaskId = query.task;
  const apiRoute = `${process.env.API_URL}/v1/workflow/processes/${MilestoneId}/steps/${TaskId}`;
  setAuthHeader({ req, res });

  const response = await axios.get(apiRoute);
  const data = await response.data;

  const milestone = data.included.filter((e) => e.type == "process")[0];
  const MilestoneTitle = milestone.attributes.title;
  const TaskTitle = data.data.attributes.title;
  const FakeDecisionOptions = [
    {
      value: "wildflower group exemption",
      label: "I will apply with the Wildflower Group Exemption",
    },
    {
      value: "independently with irs",
      label: "I will apply independently using Form 1023 with the IRS",
    },
  ];
  const FakeResources = [
    {
      title: "School name research document",
      link: "/",
    },
  ];

  return {
    props: {
      MilestoneId,
      TaskId,
      MilestoneTitle,
      TaskTitle,
      FakeDecisionOptions,
      FakeResources,
    },
  };
}
