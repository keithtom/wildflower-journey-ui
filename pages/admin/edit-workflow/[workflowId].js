import { useState } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
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
            <Card noPadding>
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
                  {isAdding ? "Add" : "Edit"} Decision
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
