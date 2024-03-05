import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Grid,
  List,
  Card,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Icon } from "@components/ui";
import { styled } from "@mui/material/styles";

import ProcessFields from "./ProcessFields";
import ProcessOrStepGroup from "./ProcessOrStepGroup";
import StepItem from "./StepItem";
import StepDrawer from "./StepDrawer";

const ActionsContainer = styled(Box)`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.color.neutral.main};
  width: 100%;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  overflow: visible;
  background: ${({ theme }) => theme.palette.neutral.lightest};
`;

const ProcessDrawer = ({ process, open, toggle, isAdding }) => {
  const [newProcess, setNewProcess] = useState({
    relationships: { steps: { data: [] } },
  });
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
  const handleRemoveProcess = () => {
    console.log("remove process");
    toggle();
  };
  const handleUpdateProcess = () => {
    console.log("update process", newProcess);
    toggle();
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: !isAdding && {
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

  console.log({ process });

  console.log({ newProcess });
  // console.log({ isValid });

  return (
    <Drawer anchor="right" open={open} onClose={toggle}>
      <Box sx={{ width: "480px", height: "100%" }} p={5}>
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
                  newProcess.relationships.steps.data &&
                  newProcess.relationships.steps.data.length > 0 ? (
                    <ProcessOrStepGroup
                      handleAddStep={handleAddStepToNewProcess}
                    >
                      {newProcess.relationships.steps.data.map((s, i) => (
                        <StepItem
                          key={i}
                          step={s.data}
                          number={i}
                          totalSteps={
                            newProcess.relationships.steps.data.length
                          }
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
                        {newProcess.relationships.steps.data.map((s, i) => (
                          <StepItem
                            notEditable
                            key={i}
                            step={s}
                            number={i}
                            totalSteps={process.relationships.steps.data.length}
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
      </Box>
      <ActionsContainer>
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
              <Button variant="danger" full onClick={handleRemoveProcess}>
                <Typography variant="bodyRegular" bold>
                  Remove
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button disabled={!isDirty} full onClick={handleUpdateProcess}>
                <Typography variant="bodyRegular" bold>
                  Update
                </Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </ActionsContainer>
      {openInsideDrawer ? (
        <StepDrawer
          newProcess={newProcess}
          setNewProcess={setNewProcess}
          step={process.step}
          open={openInsideDrawer}
          toggle={() => setOpenInsideDrawer(!openInsideDrawer)}
          isAdding={isAdding}
        />
      ) : null}
    </Drawer>
  );
};

export default ProcessDrawer;

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
