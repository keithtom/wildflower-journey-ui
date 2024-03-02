import { useState } from "react";
import { Box, Grid, List, Card, Chip } from "@mui/material";
import { Icon } from "@components/ui";

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
          <Chip
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
          <Chip
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

export default ProcessOrStepGroup;
