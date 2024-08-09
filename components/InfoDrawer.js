import { useRouter } from "next/router";
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
import AssigneeRoster from "@components/AssigneeRoster";
import { useUserContext } from "@lib/useUserContext";

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

    @media (max-width: 600px) {
      width: 95vw;
    }
  }
`;

const StyledInfoCard = styled(Card)`
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

const InfoDrawer = ({
  toggle,
  open,
  assignees,
  completers,
  about,
  taskId,
  title,
  status,
  resources,
  categories,
  actions,
  isDecision,
  taskIsComplete,
  worktime,
  handleAssignUser,
  handleUnassignUser,
  assignableUsers,
}) => {
  const { currentUser, isOperationsGuide } = useUserContext();

  const router = useRouter();
  const { workflow } = router.query;

  const isTL = currentUser?.personRoleList.some(
    (role) => role === "Teacher Leader"
  );

  const isETL = currentUser?.attributes.ssj ? true : false;

  let showActions = false;

  if (isOperationsGuide) {
    if (
      // is a teacher leader, who is looking at their own checklist
      isTL &&
      router.pathname.startsWith("/open-school/") &&
      currentUser.attributes.schools[0].workflowId === workflow
    ) {
      showActions = true;
    } else if (
      // is an emerging teacher leader, who is looking at their SSJ
      isETL &&
      router.pathname.startsWith("/ssj/") &&
      currentUser.attributes.ssj.workflowId === workflow
    ) {
      showActions = true;
    } else {
      // is simply an ops guide looking at a school
      showActions = false;
    }
  } else {
    showActions = true;
  }

  return (
    <CustomDrawer anchor="right" open={open} onClose={toggle}>
      <StyledInfoCard noBorder noRadius>
        <Stack spacing={12}>
          <Stack spacing={6}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Chip
                  label={
                    isDecision ? "Decision" : taskId ? "Task" : "Milestone"
                  }
                  size="small"
                />
              </Grid>
              <Grid item>
                <IconButton onClick={toggle} id="info-drawer-close">
                  <Icon type="close" />
                </IconButton>
              </Grid>
            </Grid>

            <Typography variant="bodyLarge" bold>
              {title}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
              {taskId && (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    ASSIGNEE
                  </Typography>
                  <AssigneeRoster
                    handleAssignUser={handleAssignUser}
                    handleUnassignUser={handleUnassignUser}
                    assignableUsers={assignableUsers}
                    assignees={assignees}
                    completers={completers}
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
              {categories?.length ? (
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
              ) : null}
              {worktime ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    WORKTIME
                  </Typography>
                  <Stack direction="row">
                    <WorktimeChip size="small" worktime={worktime} withIcon />
                  </Stack>
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
                  link={r.attributes.link}
                  title={r.attributes.title}
                  key={r.id}
                />
              ))}
            </Stack>
          ) : null}
        </Stack>
      </StyledInfoCard>

      {showActions ? (
        <ActionsContainer noBorder noPadding noRadius>
          {actions}
        </ActionsContainer>
      ) : null}
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
