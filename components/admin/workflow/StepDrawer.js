import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  Typography,
  IconButton,
  Grid,
  Card,
  Button,
  Switch,
  Drawer,
  Box,
} from "@mui/material";
import { Icon } from "@components/ui";
import { styled } from "@mui/material/styles";

import StepFields from "./StepFields";
import DecisionDrawer from "./DecisionDrawer";
import DecisionItem from "./DecisionItem";
import ProcessOrStepGroup from "./ProcessOrStepGroup";

const ActionsContainer = styled(Box)`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.color.neutral.main};
  width: 100%;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  overflow: visible;
  background: ${({ theme }) => theme.palette.neutral.lightest};
`;

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
    formState: { errors, isValid, isDirty },
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
  const handleRemoveStep = () => {
    console.log("remove step");
    toggle();
  };
  const handleUpdateStep = () => {
    console.log("update step");
    toggle();
  };
  const handleRemoveDecision = () => {
    setIsDecision(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggle} hideBackdrop>
      <Box sx={{ width: "440px", height: "100%" }} py={3} px={5}>
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
      </Box>
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
              <Button full onClick={handleRemoveStep} variant="danger">
                <Typography variant="bodyRegular" bold>
                  Remove
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button full onClick={handleUpdateStep} disabled={!isDirty}>
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
    </Drawer>
  );
};

export default StepDrawer;
