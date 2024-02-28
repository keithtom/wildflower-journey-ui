import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import { FormControlLabel, RadioGroup } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Drawer } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import useWorkflow from "@hooks/workflow/definition/useWorkflow";
import useMilestones from "@hooks/workflow/definition/useMilestones";
import useStep from "@hooks/workflow/definition/useStep";

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
  MultiSelect,
} from "@ui";

const EditWorkflowPage = () => {
  const router = useRouter();
  const { workflowId } = router.query;

  const { milestonesByPhase, isLoading: milestonesByPhaseLoading } =
    useMilestones();
  const { workflow, isLoading, isError } = useWorkflow(workflowId);

  // console.log({ workflow });
  // console.log({ milestonesByPhase });

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
        <Grid container spacing={6}>
          {milestonesByPhase?.map((m, i) => (
            <Grid item xs={12}>
              <Stack spacing={6}>
                <Typography variant="bodyLarge" bold>
                  {m.phase}
                </Typography>
                <ProcessOrStepGroup key={i}>
                  {m.milestones.map((p, i) => (
                    <ProcessItem
                      isLoading={milestonesByPhaseLoading}
                      key={i}
                      number={i}
                      process={p}
                      listLength={m.milestones.length}
                    />
                  ))}
                </ProcessOrStepGroup>
              </Stack>
            </Grid>
          ))}
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

const ProcessFields = ({ control, errors }) => {
  return (
    <Stack spacing={6}>
      <Controller
        name="title"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Title"
            placeholder="e.g. Complete The Visioning Advice Process"
            error={errors.title}
            helperText={errors && errors.title && errors.title.message}
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            multiline
            label="Description"
            placeholder="The description of this process"
            error={errors.description}
            helperText={
              errors && errors.description && errors.description.message
            }
            {...field}
          />
        )}
      />

      <Controller
        name="categories"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <MultiSelect
            withCheckbox
            label="Categories"
            placeholder="Select categories"
            options={[
              { label: "Finance", value: "finance" },
              { label: "Album", value: "album" },
            ]}
            error={errors.categories}
            defaultValue={[]}
            helperText={
              errors &&
              errors.categories &&
              errors.categories.type === "required" &&
              "This field is required"
            }
            {...field}
          />
        )}
      />
      <Controller
        name="phase"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <Select
            label="Phase"
            placeholder="Select an SSJ phase"
            options={[
              { label: "Visioning", value: "visioning" },
              { label: "Planning", value: "planning" },
              { label: "Startup", value: "startup" },
            ]}
            error={errors.phase}
            helperText={
              errors &&
              errors.phase &&
              errors.phase.type === "required" &&
              "This field is required"
            }
            {...field}
          />
        )}
      />
      <Controller
        name="prerequisite"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <Select
            label="Prerequisite"
            placeholder="Select a prerequisite process"
            options={[{ label: "Process 1", value: "asdf-asdf" }]}
            error={errors.prerequisite}
            helperText={
              errors &&
              errors.prerequisite &&
              errors.prerequisite.type === "required" &&
              "This field is required"
            }
            {...field}
          />
        )}
      />
    </Stack>
  );
};
const StepFields = ({ control, errors }) => {
  return (
    <Stack spacing={6}>
      <Controller
        name="title"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Title"
            placeholder="e.g. Complete The Visioning Advice Process"
            error={errors.title}
            helperText={errors && errors.title && errors.title.message}
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            multiline
            label="Description"
            placeholder="The description of this step"
            error={errors.description}
            helperText={
              errors && errors.description && errors.description.message
            }
            {...field}
          />
        )}
      />

      <Controller
        name="worktime"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Worktime"
            placeholder="e.g. 2 hours, or 3 minutes"
            error={errors.worktime}
            helperText={errors && errors.worktime && errors.worktime.message}
            {...field}
          />
        )}
      />
      <Controller
        name="resource_link"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Resource Link"
            placeholder="e.g. www.linkToResource.com"
            error={errors.resource_link}
            helperText={
              errors && errors.resource_link && errors.resource_link.message
            }
            {...field}
          />
        )}
      />
      <Controller
        name="resource_title"
        control={control}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Resource Title"
            placeholder="e.g. Resource Title"
            error={errors.resource_title}
            helperText={
              errors && errors.resource_title && errors.resource_title.message
            }
            {...field}
          />
        )}
      />

      <Stack spacing={2}>
        <Typography variant="bodyRegular">Assignment</Typography>
        <Controller
          name="assignment"
          control={control}
          rules={{ required: true, message: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value}>
              <FormControlLabel
                value={"each_person"}
                control={<Radio />}
                label={
                  "Individual (everyone can assign - everyone should complete)"
                }
                onChange={onChange}
              />
              <FormControlLabel
                value={"one_per_group"}
                control={<Radio />}
                label={
                  "Collaborative (everyone can assign - only one can complete per group)"
                }
                onChange={onChange}
              />
            </RadioGroup>
          )}
        />
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
const StepDrawer = ({
  newProcess,
  setNewProcess,
  step,
  open,
  toggle,
  isAdding,
}) => {
  const [isAddingDecision, setIsAddingDecision] = useState(false);
  const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
  const [isDecision, setIsDecision] = useState(
    step?.decisionOptions ? true : false
  );

  if (open) {
    console.log({ step });
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: !isAdding && {
      title: step?.attributes?.title,
      //TODO worktime: step?.attributes?.worktime,
      description: step?.attributes?.description,
      // resource_link: step?.attributes?.resource_link,
      // resource_title: step?.attributes?.resource_title,
      assignment: step?.attributes?.completionType,
    },
  });
  const onSubmit = (data) => {
    setNewProcess((newProcess) => {
      return {
        ...newProcess,
        steps: [...newProcess.steps, { data }],
      };
    });
  };

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

          <StepFields control={control} errors={errors} />

          <StepFields control={control} errors={errors} />

          {isDecision ? (
            <>
              <Switch
                label="This step is a decision"
                checked={isDecision ? isDecision : isAddingDecision}
                disabled={!isAdding}
              />
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
            </>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              full
              onClick={handleAddStep}
              type="submit"
              disabled={!isValid}
            >
              <Typography variant="bodyRegular" bold>
                Add
              </Typography>
            </Button>
          </form>
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
  const [newProcess, setNewProcess] = useState({ steps: [] });
  const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  if (open) {
    console.log(process);
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  const handleAddProcess = () => {
    toggle();
    setActiveStep(0);
    console.log("new process in final", newProcess);
    setNewProcess({});
    // mutate and add new process to the list
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: open &&
      !isAdding && {
        title: process?.attributes?.title,
        description: process?.attributes?.description,
        categories: process?.attributes?.categories,
        phase: process?.attributes?.phase,
        // TODO: prerequisite: process?.attributes?.prerequisite,
      },
  });

  const onSubmit = (data) => {
    setNewProcess((newProcess) => {
      return {
        ...newProcess,
        ...data,
      };
    });
  };

  const handleAddStepToNewProcess = (position) => {
    setOpenInsideDrawer(true);
    console.log(position);
  };

  // console.log({ newProcess });
  // console.log({ isValid });

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
                  <ProcessFields
                    control={control}
                    reset={reset}
                    errors={errors}
                  />
                ) : activeStep === 1 ? (
                  newProcess.steps && newProcess.steps.length > 0 ? (
                    <ProcessOrStepGroup
                      handleAddStep={handleAddStepToNewProcess}
                    >
                      {newProcess.steps.map((s, i) => (
                        <StepItem
                          key={i}
                          step={s.data}
                          number={i}
                          totalSteps={newProcess.steps.length}
                        />
                      ))}
                    </ProcessOrStepGroup>
                  ) : (
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
                  )
                ) : (
                  activeStep === 2 && (
                    <Stack spacing={3}>
                      <Typography variant="bodyRegular" bold lightened>
                        PROCESS
                      </Typography>
                      <Card>
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Typography variant="bodyRegular" bold>
                            {newProcess.title}
                          </Typography>
                        </Stack>
                      </Card>
                      <Typography variant="bodyRegular" bold lightened>
                        STEPS
                      </Typography>
                      <ProcessOrStepGroup
                        notEditable
                        handleAddStep={handleAddStepToNewProcess}
                      >
                        {newProcess.steps.map((s, i) => (
                          <StepItem
                            notEditable
                            key={i}
                            step={s.data}
                            number={i}
                            totalSteps={newProcess.steps.length}
                          />
                        ))}
                      </ProcessOrStepGroup>
                    </Stack>
                  )
                )}
              </>
            ) : (
              <Stack spacing={6}>
                <ProcessFields
                  control={control}
                  reset={reset}
                  errors={errors}
                />
                <Stack spacing={3}>
                  <Typography variant="bodyRegular" bold>
                    Steps
                  </Typography>
                  <ProcessOrStepGroup>
                    {process.relationships.steps.data.map((s, i) => (
                      <StepItem
                        key={i}
                        stepId={s.id}
                        number={i}
                        totalSteps={process.relationships.steps.data.length}
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
                <Button variant="text" onClick={handlePrev}>
                  <Typography variant="bodyRegular" bold light>
                    Prev
                  </Typography>
                </Button>
              </Grid>
            )}
            <Grid item>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  type={activeStep < 2 ? "submit" : null}
                  onClick={activeStep < 2 ? handleNext : handleAddProcess}
                  disabled={!isValid}
                >
                  <Typography variant="bodyRegular" bold light>
                    {activeStep < 2 ? "Next" : "Add Process"}
                  </Typography>
                </Button>
              </form>
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
      <StepDrawer
        newProcess={newProcess}
        setNewProcess={setNewProcess}
        step={process.step}
        open={openInsideDrawer}
        toggle={() => setOpenInsideDrawer(!openInsideDrawer)}
        isAdding={isAdding}
      />
    </CustomDrawer>
  );
};

const ProcessItem = ({ listLength, process, number }) => {
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
            {process.attributes.categories.map((c, i) => (
              <Chip label={c} key={i} />
            ))}
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
            {showAddChip && number + 1 < listLength ? (
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
          <ListItemText primary={process.attributes.title} />
        </ListItemButton>
      </ListItem>

      {processDrawerOpen && (
        <ProcessDrawer
          // something like "position" to indicate where it should be added in the array
          process={process}
          anchor="right"
          open={processDrawerOpen}
          toggle={() => setProcessDrawerOpen(!processDrawerOpen)}
          isAdding={isAddingProcess}
        />
      )}
    </>
  );
};
const StepItem = ({ notEditable, stepId, number, totalSteps }) => {
  const [showAddChip, setShowAddChip] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);
  const [stepDrawerOpen, setStepDrawerOpen] = useState(false);
  const [isAddingStep, setIsAddingStep] = useState(true);

  const { step, isLoading, isError } = useStep(stepId);
  // console.log({ step });

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
          step?.attributes?.kind === "decision" ? (
            <Chip label="decision" disabled={notEditable} />
          ) : null
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
            onMouseEnter={() => !notEditable && setShowDraggable(true)}
            onMouseLeave={() => !notEditable && setShowDraggable(false)}
          >
            <Grid item>
              {!notEditable && showDraggable ? (
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
            onMouseLeave={() => !notEditable && setShowAddChip(false)}
            onMouseEnter={() => !notEditable && setShowAddChip(true)}
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
          disabled={notEditable}
          sx={{ borderLeft: "1px solid #eaeaea" }}
          onClick={handleEditStep}
        >
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={step?.attributes?.title}
          />
        </ListItemButton>
      </ListItem>
      {stepDrawerOpen ? (
        <StepDrawer
          step={step}
          open={stepDrawerOpen}
          toggle={() => setStepDrawerOpen(!stepDrawerOpen)}
          isAdding={isAddingStep}
        />
      ) : null}
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
const StepItem = ({ step, number, totalSteps }) => {
  const [showAddChip, setShowAddChip] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);
  const [stepDrawerOpen, setStepDrawerOpen] = useState(false);
  const [isAddingStep, setIsAddingStep] = useState(true);

const ProcessOrStepGroup = ({ handleAddStep, notEditable, children }) => {
  const [showStartAddChip, setShowStartAddChip] = useState(false);
  const [showEndAddChip, setShowEndAddChip] = useState(false);
  const handleAddAtStart = () => {
    // make this the dynamic start
    handleAddStep(0);
    console.log("add at start");
  };
  const handleAddAtEnd = () => {
    // make this the dynamic end
    handleAddStep(1000);
    console.log("add at end");
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Grid
        container
        onMouseLeave={() => !notEditable && setShowStartAddChip(false)}
        onMouseEnter={() => !notEditable && setShowStartAddChip(true)}
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
        {!notEditable && showStartAddChip ? (
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
        onMouseLeave={() => !notEditable && setShowEndAddChip(false)}
        onMouseEnter={() => !notEditable && setShowEndAddChip(true)}
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
        {!notEditable && showEndAddChip ? (
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
