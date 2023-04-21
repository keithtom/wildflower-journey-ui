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
  Box,
  Badge,
} from "./ui/index";
import WorktimeChip from "./WorktimeChip";
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

const StyledScrollArea = styled(Box)``;
const StyledInfoCard = styled(Card)`
  padding-bottom: ${({ theme }) => `calc(${theme.util.buffer * 12}px)`};
  min-height: ${(props) =>
    props.isDecision
      ? `calc(100vh - 331px - ${props.theme.util.appBarHeight}px)`
      : `calc(100vh - 97px - ${props.theme.util.appBarHeight}px)`}; //TODO: Fix this hack. 331 is height of decision actions, 97 is height of task actions
`;
const ActionsContainer = styled(Card)`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.color.neutral.main};
  width: ${({ theme }) => theme.util.infoDrawerWidth}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;

const InfoDrawer = ({
  toggle,
  open,
  assignees,
  about,
  taskId,
  title,
  status,
  resources,
  categories,
  effort,
  actions,
  isDecision,
  completionType,
  completers,
  isComplete,
  includedDocuments,
  worktime,
}) => {

  return (
    <CustomDrawer anchor="right" open={open} onClose={toggle}>
      <StyledScrollArea>
        <StyledInfoCard noBorder noRadius isDecision={isDecision}>
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
                    <Stack spacing={2} direction="row">
                      { assignees && assignees.map((assignee) => (
                        <AvatarWrapper                       
                          badgeContent={
                            assignee && assignee.id === completedBy.id ? (
                              <Icon
                                type="checkCircle"
                                size="small"
                                variant="primary"
                                filled
                              />
                            ) : null
                          }
                          src={assignee && assignee.imageUrl}
                        />
                      ))}
                    </Stack>
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
                {worktime ? (
                  <Stack spacing={2}>
                    <Typography variant="bodyMini" lightened bold>
                      WORKTIME
                    </Typography>
                    <WorktimeChip size="small" worktime={worktime} withIcon />
                  </Stack>
                ) : null}
              </Stack>
            </Stack>
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
          </Stack>
        </StyledInfoCard>
        <ActionsContainer noBorder noPadding noRadius>
          {actions}
        </ActionsContainer>
      </StyledScrollArea>
    </CustomDrawer>
  );
};

export default InfoDrawer;

const AvatarWrapper = ({ badgeContent, src }) => {
  return (
    <div>
      <Badge
        badgeContent={badgeContent}
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Avatar
          size="mini"
          // TODO: can we get the assignee information for each task in the process serializer
          src={src}
        />
      </Badge>
    </div>
  );
};
