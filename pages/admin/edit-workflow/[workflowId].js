import { useState } from "react";
import { styled } from "@mui/material/styles";
import { FormControlLabel, RadioGroup } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Drawer } from "@mui/material";

import {
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Icon,
  Avatar,
  Modal,
  TextField,
  Radio,
  Spinner,
  Link,
  Divider,
  IconButton,
  Select,
  Switch,
} from "@ui";

const EditWorkflowPage = () => {
  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container>
          <Grid item>
            <Typography variant="bodyLarge" bold>
              Workflow Definition
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <ProcessOrStepGroup>
              {FakeProcesses.map((p, i) => (
                <ProcessItem key={i} number={i} process={p} />
              ))}
            </ProcessOrStepGroup>
          </Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default EditWorkflowPage;

const CustomDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    flex-shrink: 0;
    z-index: 1;
    outline: 1px solid ${({ theme }) => theme.color.neutral.main};
    border: none;
    margin-top: 0;
    width: ${({ theme }) => theme.util.infoDrawerWidth}px;
    height: ${({ theme }) => `100vh - ${theme.util.appBarHeight}px`};
    box-shadow: ${({ theme }) => theme.shadow.large.main};
  }
`;
const StyledCard = styled(Card)`
  overflow-y: scroll;
`;
const ActionsContainer = styled(Card)`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.color.neutral.main};
  width: 100%;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  overflow: visible;
`;

const AddChip = styled(Chip)`
  width: ${({ theme }) => theme.util.buffer * 6}px;
  height: ${({ theme }) => theme.util.buffer * 6}px;
  background: ${({ theme }) => theme.palette.neutral.lightest};

  .MuiChip-label {
    padding: 0;
  }
`;

const FormStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>Add Process</StepLabel>
      </Step>
      <Step>
        <StepLabel>Add Steps</StepLabel>
      </Step>
      <Step>
        <StepLabel>Summary</StepLabel>
      </Step>
    </Stepper>
  );
};

const ProcessFields = () => {
  return (
    <Stack spacing={6}>
      <TextField
        label="Title"
        placeholder="e.g. Complete The Visioning Advice Process"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
      <TextField
        multiline
        label="Description"
        placeholder="The description of this process"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
      <Select
        label="Category"
        placeholder="Select a category"
        options={[{ label: "Finance", value: "finance" }]}
        // error={errors.state}
        // helperText={
        //   errors &&
        //   errors.state &&
        //   errors.state.type === "required" &&
        //   "This field is required"
        // }
        // {...field}
      />
      <Select
        label="Phase"
        placeholder="Select an SSJ phase"
        options={[{ label: "Visioning", value: "visioning" }]}
        // error={errors.state}
        // helperText={
        //   errors &&
        //   errors.state &&
        //   errors.state.type === "required" &&
        //   "This field is required"
        // }
        // {...field}
      />
      <Select
        label="Prerequisite"
        placeholder="Select a prerequisite process"
        options={[{ label: "Process 1", value: "1234-asdf" }]}
        // error={errors.state}
        // helperText={
        //   errors &&
        //   errors.state &&
        //   errors.state.type === "required" &&
        //   "This field is required"
        // }
        // {...field}
      />
    </Stack>
  );
};
const StepFields = () => {
  return (
    <Stack spacing={6}>
      <TextField
        label="Title"
        placeholder="e.g. Identify and invite advice givers"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
      <TextField
        label="Worktime"
        placeholder="e.g. 2 hours, or 3 minutes"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
      <TextField
        multiline
        label="About"
        placeholder="About this step"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
      <TextField
        label="Resource Link"
        placeholder="e.g. www.linkToResource.com"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
      <TextField
        label="Resource Title"
        placeholder="e.g. Resource Title"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
      <Stack spacing={6}>
        <Typography variant="bodyRegular">Assignment</Typography>
        <RadioGroup value={"value"}>
          <FormControlLabel
            value={"individual"}
            control={<Radio />}
            label={
              "Individual (everyone can assign - everyone should complete)"
            }
            // onChange={handleDecisionOptionChange}
          />
          <FormControlLabel
            value={"collaborative"}
            control={<Radio />}
            label={
              "Collaborative (everyone can assign - only one can complete per group)"
            }
            // onChange={handleDecisionOptionChange}
          />
        </RadioGroup>
      </Stack>
    </Stack>
  );
};
const DecisionFields = () => {
  return (
    <Stack spacing={6}>
      <TextField
        label="Title"
        placeholder="e.g. Continue to the next phase"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
    </Stack>
  );
};

const DecisionDrawer = ({ open, toggle, isAdding }) => {
  const handleAddOption = () => {
    console.log("adding option");
    toggle();
  };
  return (
    <CustomDrawer
      anchor="right"
      open={open}
      onClose={toggle}
      sx={{ "& .MuiDrawer-paper": { width: "440px" } }}
      hideBackdrop
    >
      <StyledCard noBorder noRadius>
        <Stack spacing={12}>
          <Stack spacing={6}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="bodyLarge" bold>
                  {isAdding ? "Add" : "Edit"} Decision Option
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={toggle} id="info-drawer-close">
                  <Icon type="close" />
                </IconButton>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <DecisionFields />
      </StyledCard>
      <ActionsContainer noRadius noBorder>
        {isAdding ? (
          <Button full onClick={handleAddOption}>
            <Typography variant="bodyRegular" bold>
              Add
            </Typography>
          </Button>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button full variant="danger">
                <Typography variant="bodyRegular" bold>
                  Remove
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button full disabled>
                <Typography variant="bodyRegular" bold>
                  Update
                </Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </ActionsContainer>
    </CustomDrawer>
  );
};
const StepDrawer = ({ step, open, toggle, isAdding }) => {
  const [isAddingDecision, setIsAddingDecision] = useState(false);
  const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
  const [isDecision, setIsDecision] = useState(
    step.decisionOptions ? true : false
  );

  const handleAddStep = () => {
    console.log("adding step");
    toggle();
  };
  const handleRemoveDecision = () => {
    setIsDecision(false);
  };

  return (
    <CustomDrawer
      anchor="right"
      open={open}
      onClose={toggle}
      sx={{ "& .MuiDrawer-paper": { width: "480px" } }}
      hideBackdrop
    >
      <StyledCard noBorder noRadius>
        <Stack spacing={6}>
          <Stack spacing={6}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="bodyLarge" bold>
                  {isAdding ? "Add" : "Edit"} Step
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={toggle} id="info-drawer-close">
                  <Icon type="close" />
                </IconButton>
              </Grid>
            </Grid>
          </Stack>
          <StepFields />

          <Switch
            label="This step is a decision"
            checked={isDecision ? isDecision : isAddingDecision}
            onChange={
              isDecision
                ? handleRemoveDecision
                : () => setIsAddingDecision(!isAddingDecision)
            }
          />
          {isDecision ? (
            <ProcessOrStepGroup>
              {step.decisionOptions.map((d, i) => (
                <DecisionItem
                  key={i}
                  number={i}
                  totalOptions={step.decisionOptions.length}
                  decision={d}
                />
              ))}
            </ProcessOrStepGroup>
          ) : isAddingDecision ? (
            <Card>
              <Card noBorder noRadius>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Typography variant="bodyRegular" lightened>
                      No options yet
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
              <Button
                full
                variant="lightened"
                onClick={() => setOpenInsideDrawer(!openInsideDrawer)}
              >
                <Typography variant="bodyRegular" bold>
                  Add decision option
                </Typography>
              </Button>
            </Card>
          ) : null}
        </Stack>
      </StyledCard>
      <ActionsContainer noRadius noBorder>
        {isAdding ? (
          <Button full onClick={handleAddStep}>
            <Typography variant="bodyRegular" bold>
              Add
            </Typography>
          </Button>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button full onClick={handleAddStep} variant="danger">
                <Typography variant="bodyRegular" bold>
                  Remove
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button full onClick={handleAddStep} disabled>
                <Typography variant="bodyRegular" bold>
                  Update
                </Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </ActionsContainer>
      <DecisionDrawer
        open={openInsideDrawer}
        toggle={() => setOpenInsideDrawer(!openInsideDrawer)}
        isAdding={isAddingDecision}
      />
    </CustomDrawer>
  );
};
const ProcessDrawer = ({ process, open, toggle, isAdding }) => {
  const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  const handleAddProcess = () => {
    console.log("add process");
  };
  return (
    <CustomDrawer anchor="right" open={open} onClose={toggle}>
      <StyledCard noBorder noRadius>
        <Stack spacing={12}>
          <Stack spacing={6}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="bodyLarge" bold>
                  {isAdding ? "Add" : "Edit"} Process
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={toggle} id="info-drawer-close">
                  <Icon type="close" />
                </IconButton>
              </Grid>
            </Grid>
            {isAdding ? (
              <>
                <Card variant="lightened">
                  <FormStepper activeStep={activeStep} />
                </Card>
                {activeStep === 0 ? (
                  <>
                    <ProcessFields />
                    {/* <AddProcess/> */}
                  </>
                ) : activeStep === 1 ? (
                  <Card>
                    <Card noBorder noRadius>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Typography variant="bodyRegular" lightened>
                            No steps yet
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                    <Button
                      full
                      variant="lightened"
                      onClick={() => setOpenInsideDrawer(!openInsideDrawer)}
                    >
                      <Typography variant="bodyRegular" bold>
                        Add a step
                      </Typography>
                    </Button>
                  </Card>
                ) : (
                  activeStep === 2 && (
                    <Stack spacing={3}>
                      <Card size="small">
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Typography variant="bodySmall" bold lightened>
                            PROCESS
                          </Typography>
                          <Typography variant="bodyRegular" bold>
                            Process Name
                          </Typography>
                        </Stack>
                      </Card>
                      <Card size="small">... list of steps ...</Card>
                    </Stack>
                  )
                )}
              </>
            ) : (
              <Stack spacing={6}>
                <ProcessFields />
                <Stack spacing={3}>
                  <Typography variant="bodyRegular" bold>
                    Steps
                  </Typography>
                  <ProcessOrStepGroup>
                    {process.steps.map((s, i) => (
                      <StepItem
                        key={i}
                        step={s}
                        number={i}
                        totalSteps={process.steps.length}
                      />
                    ))}
                  </ProcessOrStepGroup>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </StyledCard>
      <ActionsContainer noRadius noBorder>
        {isAdding ? (
          <Grid
            container
            justifyContent={activeStep === 0 ? "flex-end" : "space-between"}
          >
            {activeStep === 0 ? null : (
              <Grid item>
                <Button type="submit" variant="text" onClick={handlePrev}>
                  <Typography variant="bodyRegular" bold light>
                    Prev
                  </Typography>
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                type="submit"
                onClick={activeStep < 2 ? handleNext : handleAddProcess}
                //  disabled={!isValid}
              >
                <Typography variant="bodyRegular" bold light>
                  {activeStep < 2 ? "Next" : "Add Process"}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button variant="danger" full>
                <Typography variant="bodyRegular" bold>
                  Remove
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button disabled={true} full>
                <Typography variant="bodyRegular" bold>
                  Update
                </Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </ActionsContainer>
      {/* <StepDrawer
        step={process.step}
        open={openInsideDrawer}
        toggle={() => setOpenInsideDrawer(!openInsideDrawer)}
        isAdding={isAdding}
      /> */}
    </CustomDrawer>
  );
};

const ProcessItem = ({ process, number }) => {
  const [showAddChip, setShowAddChip] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);
  const [processDrawerOpen, setProcessDrawerOpen] = useState(false);
  const [isAddingProcess, setIsAddingProcess] = useState(true);

  const handleAddProcess = () => {
    setIsAddingProcess(true);
    setProcessDrawerOpen(true);
    console.log("add");
  };
  const handleEditProcess = () => {
    // not adding, so editing
    setIsAddingProcess(false);
    setProcessDrawerOpen(true);
    console.log("edit");
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Grid stack>
            <Chip label="hi" />
          </Grid>
        }
      >
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Show Draggable Grabber */}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ width: "48px", height: "24px" }}
            onMouseEnter={() => setShowDraggable(true)}
            onMouseLeave={() => setShowDraggable(false)}
          >
            <Grid item>
              {showDraggable ? (
                <Icon type="dotsVertical" variant="lightened" hoverable />
              ) : (
                <Typography variant="bodySmall" bold lightened>
                  {number + 1}
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* Add Chip Container */}
          <Grid
            container
            onMouseLeave={() => setShowAddChip(false)}
            onMouseEnter={() => setShowAddChip(true)}
            sx={{
              width: "48px",
              height: "24px",
              position: "absolute",
              bottom: "-12px",
              left: 0,
              zIndex: 15,
            }}
            alignItems="center"
            justifyContent="center"
          >
            {showAddChip && number + 1 < FakeProcesses.length ? (
              <AddChip
                size="small"
                onClick={handleAddProcess}
                variant="outlined"
                label={<Icon type="plus" size="small" variant="primary" />}
              />
            ) : null}
          </Grid>
        </Box>
        <ListItemButton
          sx={{ borderLeft: "1px solid #eaeaea" }}
          onClick={handleEditProcess}
        >
          <ListItemText primary={process.title} />
        </ListItemButton>
      </ListItem>

      <ProcessDrawer
        // something like "position" to indicate where it should be added in the array
        process={process}
        anchor="right"
        open={processDrawerOpen}
        toggle={() => setProcessDrawerOpen(!processDrawerOpen)}
        isAdding={isAddingProcess}
      />
    </>
  );
};
const StepItem = ({ step, number, totalSteps }) => {
  const [showAddChip, setShowAddChip] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);
  const [stepDrawerOpen, setStepDrawerOpen] = useState(false);
  const [isAddingStep, setIsAddingStep] = useState(true);

  const handleAddStep = () => {
    setIsAddingStep(true);
    setStepDrawerOpen(true);
    console.log("add");
  };
  const handleEditStep = () => {
    // not adding, so editing
    setIsAddingStep(false);
    setStepDrawerOpen(true);
    console.log("edit");
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Grid stack>
            <Chip label="hi" />
          </Grid>
        }
      >
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Show Draggable Grabber */}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ width: "48px", height: "24px" }}
            onMouseEnter={() => setShowDraggable(true)}
            onMouseLeave={() => setShowDraggable(false)}
          >
            <Grid item>
              {showDraggable ? (
                <Icon type="dotsVertical" variant="lightened" hoverable />
              ) : (
                <Typography variant="bodySmall" bold lightened>
                  {number + 1}
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* Add Chip Container */}
          <Grid
            container
            onMouseLeave={() => setShowAddChip(false)}
            onMouseEnter={() => setShowAddChip(true)}
            sx={{
              width: "48px",
              height: "24px",
              position: "absolute",
              bottom: "-12px",
              left: 0,
              zIndex: 15,
            }}
            alignItems="center"
            justifyContent="center"
          >
            {showAddChip && number + 1 < totalSteps ? (
              <AddChip
                size="small"
                onClick={handleAddStep}
                variant="outlined"
                label={<Icon type="plus" size="small" variant="primary" />}
              />
            ) : null}
          </Grid>
        </Box>
        <ListItemButton
          sx={{ borderLeft: "1px solid #eaeaea" }}
          onClick={handleEditStep}
        >
          <ListItemText primary={step.title} />
        </ListItemButton>
      </ListItem>
      <StepDrawer
        step={step}
        open={stepDrawerOpen}
        toggle={() => setStepDrawerOpen(!stepDrawerOpen)}
        isAdding={isAddingStep}
      />
    </>
  );
};

const DecisionItem = ({ decision, number, totalOptions }) => {
  const [showAddChip, setShowAddChip] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);
  const [decisionDrawerOpen, setDecisionDrawerOpen] = useState(false);
  const [isAddingOption, setIsAddingOption] = useState(true);

  const handleAddDecision = () => {
    setIsAddingOption(true);
    setDecisionDrawerOpen(true);
    console.log("add");
  };
  const handleEditDecision = () => {
    // not adding, so editing
    setIsAddingOption(false);
    setDecisionDrawerOpen(true);
    console.log("edit");
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Grid stack>
            <Chip label="hi" />
          </Grid>
        }
      >
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Show Draggable Grabber */}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ width: "48px", height: "24px" }}
            onMouseEnter={() => setShowDraggable(true)}
            onMouseLeave={() => setShowDraggable(false)}
          >
            <Grid item>
              {showDraggable ? (
                <Icon type="dotsVertical" variant="lightened" hoverable />
              ) : (
                <Typography variant="bodySmall" bold lightened>
                  {number + 1}
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* Add Chip Container */}
          <Grid
            container
            onMouseLeave={() => setShowAddChip(false)}
            onMouseEnter={() => setShowAddChip(true)}
            sx={{
              width: "48px",
              height: "24px",
              position: "absolute",
              bottom: "-12px",
              left: 0,
              zIndex: 15,
            }}
            alignItems="center"
            justifyContent="center"
          >
            {showAddChip && number + 1 < totalOptions ? (
              <AddChip
                size="small"
                onClick={handleAddDecision}
                variant="outlined"
                label={<Icon type="plus" size="small" variant="primary" />}
              />
            ) : null}
          </Grid>
        </Box>
        <ListItemButton
          sx={{ borderLeft: "1px solid #eaeaea" }}
          onClick={handleEditDecision}
        >
          <ListItemText primary={decision.title} />
        </ListItemButton>
      </ListItem>
      <DecisionDrawer
        step={decision}
        open={decisionDrawerOpen}
        toggle={() => setDecisionDrawerOpen(!decisionDrawerOpen)}
        isAdding={isAddingOption}
      />
    </>
  );
};

const ProcessOrStepGroup = ({ children }) => {
  const [showStartAddChip, setShowStartAddChip] = useState(false);
  const [showEndAddChip, setShowEndAddChip] = useState(false);
  const handleAddAtStart = () => {
    console.log("add at start");
  };
  const handleAddAtEnd = () => {
    console.log("add at end");
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Grid
        container
        onMouseLeave={() => setShowStartAddChip(false)}
        onMouseEnter={() => setShowStartAddChip(true)}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "48px",
          height: "24px",
          position: "absolute",
          top: "-12px",
          left: 0,
          zIndex: 15,
        }}
      >
        {showStartAddChip ? (
          <AddChip
            size="small"
            onClick={handleAddAtStart}
            variant="outlined"
            label={<Icon type="plus" size="small" variant="primary" />}
          />
        ) : null}
      </Grid>
      <Card noPadding>
        <List>{children}</List>
      </Card>
      <Grid
        container
        onMouseLeave={() => setShowEndAddChip(false)}
        onMouseEnter={() => setShowEndAddChip(true)}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "48px",
          height: "24px",
          position: "absolute",
          bottom: "-12px",
          left: 0,
          zIndex: 15,
        }}
      >
        {showEndAddChip ? (
          <AddChip
            size="small"
            onClick={handleAddAtEnd}
            variant="outlined"
            label={<Icon type="plus" size="small" variant="primary" />}
          />
        ) : null}
      </Grid>
    </Box>
  );
};

const FakeProcesses = [
  {
    title: "Process 1",
    steps: [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }],
  },
  {
    title: "Process 2",
    steps: [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }],
  },
  {
    title: "Process 3",
    steps: [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }],
  },
  {
    title: "Process 4 -- has decision inside",
    steps: [
      {
        title: "Step 1 -- decision",
        decisionOptions: [{ title: "Option 1" }, { title: "Option 2" }],
      },
      { title: "Step 2" },
      { title: "Step 3" },
    ],
  },
  {
    title: "Process 5",
    steps: [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }],
  },
];
