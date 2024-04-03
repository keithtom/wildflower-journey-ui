import {
  Stack,
  Grid,
  Typography,
  IconButton,
  Card,
  Drawer,
  Button,
  Box,
} from "@mui/material";
import { Icon } from "@components/ui";
import { styled } from "@mui/material/styles";

import DecisionFields from "./DecisionFields";

const ActionsContainer = styled(Box)`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.color.neutral.main};
  width: 100%;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  overflow: visible;
  background: ${({ theme }) => theme.palette.neutral.lightest};
`;

const DecisionDrawer = ({ open, toggle, isAdding }) => {
  const handleAddOption = () => {
    console.log("adding option");
    toggle();
  };
  return (
    <Drawer anchor="right" open={open} onClose={toggle}>
      <Box sx={{ width: "480px", height: "100%" }} py={3} px={5}>
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
      </Box>
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
    </Drawer>
  );
};

export default DecisionDrawer;
