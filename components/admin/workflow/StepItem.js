import { useState } from "react";
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Typography,
  Skeleton,
} from "@mui/material";
import { Icon } from "@components/ui";

import StepDrawer from "./StepDrawer";
import useStep from "@hooks/workflow/definition/useStep";

const StepItem = ({
  id,
  workingStep,
  notEditable,
  stepId,
  number,
  totalSteps,
  setNewProcess,
}) => {
  const [showAddChip, setShowAddChip] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);
  const [stepDrawerOpen, setStepDrawerOpen] = useState(false);
  const [isAddingStep, setIsAddingStep] = useState(true);

  let step;
  let isLoading;
  let isError;
  if (workingStep) {
    step = workingStep;
  } else {
    ({ step, isLoading, isError } = useStep(id));
  }
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
              <Chip
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
          setNewProcess={setNewProcess}
          step={step}
          open={stepDrawerOpen}
          toggle={() => setStepDrawerOpen(!stepDrawerOpen)}
          isAdding={isAddingStep}
        />
      ) : null}
    </>
  );
};

export default StepItem;
