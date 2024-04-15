import { useState } from "react";
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Typography,
} from "@mui/material";
import { Icon } from "@components/ui";
import ProcessDrawer from "./ProcessDrawer";

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
              <Chip
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
          isEditing={!isAddingProcess}
        />
      )}
    </>
  );
};

export default ProcessItem;
