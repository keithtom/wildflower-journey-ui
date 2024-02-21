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
            <Card noPadding sx={{ overflow: "visible" }}>
              <List>
                <Process />
                <Process />
                <Process />
                <Process />
                <Process />
              </List>
            </Card>
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
        <StepLabel>Process Info</StepLabel>
      </Step>
      <Step>
        <StepLabel>Steps Info</StepLabel>
      </Step>
      <Step>
        <StepLabel>Add</StepLabel>
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
      <Switch label="This step is a decision" />
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
  const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
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
        <Button onClick={() => setOpenInsideDrawer(!openInsideDrawer)}>
          asdf
        </Button>
      </StyledCard>
      <ActionsContainer noRadius noBorder>
        hi
      </ActionsContainer>
    </CustomDrawer>
  );
};
const StepDrawer = ({ open, toggle, isAdding }) => {
  const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
  return (
    <CustomDrawer
      anchor="right"
      open={open}
      onClose={toggle}
      sx={{ "& .MuiDrawer-paper": { width: "480px" } }}
      hideBackdrop
    >
      <StyledCard noBorder noRadius>
        <Stack spacing={12}>
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
        </Stack>
        <StepFields />
        <Button onClick={() => setOpenInsideDrawer(!openInsideDrawer)}>
          asdf
        </Button>
      </StyledCard>
      <ActionsContainer noRadius noBorder>
        hi
      </ActionsContainer>
      <DecisionDrawer
        open={openInsideDrawer}
        toggle={() => setOpenInsideDrawer(!openInsideDrawer)}
        isAdding={isAdding}
      />
    </CustomDrawer>
  );
};
const ProcessDrawer = ({ open, toggle, isAdding }) => {
  const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
              <Card variant="lightened">
                <FormStepper activeStep={activeStep} />
              </Card>
            ) : null}
            {/* This is where all the add new process steps go when adding new proces */}
            {/* This is where the edit ux goes too */}
            <ProcessFields />
          </Stack>
        </Stack>
        <Button onClick={() => setOpenInsideDrawer(!openInsideDrawer)}>
          asdf
        </Button>
      </StyledCard>
      <ActionsContainer noRadius noBorder>
        hi
      </ActionsContainer>
      <StepDrawer
        open={openInsideDrawer}
        toggle={() => setOpenInsideDrawer(!openInsideDrawer)}
        isAdding={isAdding}
      />
    </CustomDrawer>
  );
};

const Process = () => {
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
                  1
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
            {showAddChip ? (
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
          <ListItemText primary="Title of process" />
        </ListItemButton>
      </ListItem>

      <ProcessDrawer
        anchor="right"
        open={processDrawerOpen}
        toggle={() => setProcessDrawerOpen(!processDrawerOpen)}
        isAdding={isAddingProcess}
      />
    </>
  );
};

const FakeProcesses = [{}];
