import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";

import {
  Card,
  Typography,
  Stack,
  Grid,
  Icon,
  IconButton,
  Chip,
  Divider,
  Avatar,
} from "./ui/index";
import EffortChip from "./EffortChip";
import CategoryChip from "./CategoryChip";
import StatusChip from "./StatusChip";
import Resource from "./Resource";

const CustomDrawer = styled(Drawer)`
  margin: 0;
  flex-shrink: 0;
  width: ${({ theme }) => theme.util.infoDrawerWidth}px;
  z-index: 1;
  .MuiDrawer-paper {
    width: ${({ theme }) => theme.util.infoDrawerWidth}px;
    outline: 1px solid ${({ theme }) => theme.color.neutral.main};
    border: none;
    margin-top: 0;
    padding-top: ${({ theme }) => theme.util.appBarHeight}px;
  }
`;

const InfoDrawer = ({
  toggle,
  open,
  assignee,
  about,
  taskId,
  title,
  status,
  resources,
  categories,
  effort,
  actions,
  isDecision,
  isComplete,
  includedDocuments,
}) => {
  return (
    <CustomDrawer anchor="right" open={open} onClose={toggle}>
      <Stack
        justifyContent="space-between"
        direction="column"
        sx={{ height: "100%" }}
      >
        <Card noBorder>
          <Stack spacing={12}>
            <Stack spacing={6}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Chip
                    label={
                      isDecision ? "Decision" : taskId ? "Task" : "Milestone"
                    }
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={toggle}>
                    <Icon type="close" />
                  </IconButton>
                </Grid>
              </Grid>

              <Typography variant="bodyLarge" bold struck={isComplete}>
                {title}
              </Typography>
              <Stack direction="row" spacing={4}>
                {taskId && (
                  <Stack spacing={2}>
                    <Typography variant="bodyMini" lightened bold>
                      ASSIGNEE
                    </Typography>
                    <Avatar
                      size="mini"
                      // TODO: can we get the assignee information for each task in the process serializer
                      src={assignee && assignee.imageUrl}
                    />
                  </Stack>
                )}
                {status && (
                  <Stack spacing={2}>
                    <Typography variant="bodyMini" lightened bold>
                      STATUS
                    </Typography>
                    <StatusChip status={status} size="small" withIcon />
                  </Stack>
                )}
                {categories && (
                  <Stack spacing={2}>
                    <Typography variant="bodyMini" lightened bold>
                      CATEGORY
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {categories.map((m, i) => (
                        <CategoryChip
                          category={m}
                          size="small"
                          withIcon
                          key={i}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}
                {effort && (
                  <Stack spacing={2}>
                    <Typography variant="bodyMini" lightened bold>
                      EFFORT
                    </Typography>
                    <EffortChip size="small" effort={effort} withIcon />
                  </Stack>
                )}
              </Stack>
            </Stack>
            {resources && resources.length ? (
              <Stack spacing={2}>
                {resources.map((r, i) => (
                  <Resource
                    link={includedDocuments[r.id].attributes.link}
                    title={includedDocuments[r.id].attributes.title}
                    key={i}
                  />
                ))}
              </Stack>
            ) : null}
            {about && (
              <Stack spacing={4}>
                <Stack direction="row" spacing={4}>
                  <Icon type="glasses" variant="primary" size="medium" />
                  <Typography variant="bodyRegular" bold>
                    About
                  </Typography>
                </Stack>
                <Divider />
                <Typography>{about}</Typography>
              </Stack>
            )}
          </Stack>
        </Card>
        <Card noBorder>
          <Stack spacing={6}>
            <Divider />
            {actions}
          </Stack>
        </Card>
      </Stack>
    </CustomDrawer>
  );
};

export default InfoDrawer;
