import { useState } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { styled, css } from "@mui/material/styles";

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
} from "@ui";
import Task from "../../components/Task";
import Resource from "../../components/Resource";

const TaskPage = ({}) => {
  const [userIsEditing, setUserIsEditing] = useState(false);
  const isSensibleDefault = false;
  const isDecision = true;

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={3}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Link href="/ssj/milestone">
                  <IconButton>
                    <Icon type="chevronLeft" />
                  </IconButton>
                </Link>
                <Typography>Name your school</Typography>
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
          <Task
            notNavigable
            title="Complete WF School Name Research Document"
            isDecision={isDecision}
            isNext={true}
          />
        </Stack>

        {isDecision ? (
          <DecisionForm
            options={FakeDecisionOptions}
            disabled={userIsEditing}
          />
        ) : null}

        <Card>
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
        </Card>
      </Stack>
    </PageContainer>
  );
};

export default TaskPage;

const FakeResources = [
  {
    title: "School name research document",
    link: "/",
  },
];

const NewResourceInput = ({}) => {
  const [resourceTitle, setResourceTitle] = useState("");
  const handleResourceTitleChange = (event) => {
    setResourceTitle(event.target.value);
  };
  const [resourceLink, setResourceLink] = useState("");
  const handleResourceLinkChange = (event) => {
    setResourceLink(event.target.value);
  };

  return (
    <Grid container flexDirection="row" spacing={3} alignItems="center">
      <Grid item flex={1}>
        <Card size="small">
          <Grid container spacing={3}>
            <Grid item flex={1}>
              <TextField
                label="Title"
                placeholder="Provide a title for this resource"
                value={resourceTitle}
                onChange={handleResourceTitleChange}
              />
            </Grid>
            <Grid item flex={1}>
              <TextField
                label="Link URL"
                placeholder="Add a link to a resource to help complete this task"
                value={resourceLink}
                onChange={handleResourceLinkChange}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item>
        <IconButton>
          <Icon type="plus" />
        </IconButton>
      </Grid>
    </Grid>
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
  const [decisionOption, setDecisionOption] = useState();
  const handleDecisionOptionChange = (e) => {
    setDecisionOption(e.target.value);
  };
  const notDecided = !decisionOption;

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
    <StyledDecisionCard variant="primaryOutlined" disabled={disabled}>
      <Stack spacing={3}>
        <RadioGroup value={decisionOption} handleOptionsChange>
          {options.map((o, i) => (
            <FormControlLabel
              key={i}
              value={o.value}
              control={<Radio />}
              label={o.label}
              onChange={handleDecisionOptionChange}
            />
          ))}
        </RadioGroup>
        <Grid container>
          <Grid item>
            <Button disabled={notDecided}>
              <Typography>Decide</Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </StyledDecisionCard>
  );
};

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
