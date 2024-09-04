import { useState } from "react";
import { styled, css } from "@mui/material/styles";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import {
  Box,
  Badge,
  Stack,
  Avatar,
  Icon,
  Typography,
  Grid,
  Popover,
  Card,
} from "@components/ui/index";

const StyledAssigneeRoster = styled(Popover)`
  margin-top: ${({ theme }) => theme.util.buffer * 2}px;
  .MuiPopover-paper {
    width: 240px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const AssigneeRoster = ({
  assignees,
  completers,
  assignableUsers,
  handleAssignUser,
  handleUnassignUser,
  completionType,
}) => {
  // popover settings
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "assignee-roster" : undefined;

  // toggle assignee
  const handleToggleAssignment = (userId) => {
    // Check if userId is in assignees
    const isAssigned = assignees.some((assignee) => assignee.id === userId);
    if (isAssigned) {
      handleUnassignUser(userId);
    } else {
      handleAssignUser(userId);
    }
  };

  // unassign everyone
  const handleUnassignAll = () => {
    assignees.forEach((assignee) => handleUnassignUser(assignee.id));
  };

  const isComplete = completers.length;

  const cantAssign = completionType === "one_per_group" && completers.length;

  // console.log({ completers });
  // console.log({ assignees });
  // console.log({ completionType });
  // console.log({ assignableUsers });
  // console.log({ cantAssign });

  return (
    <>
      <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
        {assignees?.length ? (
          <Stack direction="row" spacing={1} aria-describedby={id}>
            {assignees
              .sort((a, b) =>
                a.attributes.lastName.localeCompare(b.attributes.lastName)
              )
              .map((assignee) => (
                <AvatarWrapper
                  key={assignee.id}
                  src={assignee?.attributes?.imageUrl}
                  badgeContent={
                    completers.some(
                      (completer) => completer.id === assignee.id
                    ) && (
                      <Icon
                        className="checkCircleAssignee"
                        type="checkCircle"
                        size="small"
                        variant="primary"
                        filled
                      />
                    )
                  }
                />
              ))}
          </Stack>
        ) : (
          <Icon type="userCircle" variant="lightened" aria-describedby={id} />
        )}
      </Box>
      <StyledAssigneeRoster
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="bodyRegular" lightened>
                Assign to
              </Typography>
            </ListItemText>
          </ListItem>
          {assignableUsers
            .sort((a, b) =>
              a.attributes.lastName.localeCompare(b.attributes.lastName)
            )
            .map((user, i) => (
              <ListItem
                disablePadding
                key={i}
                secondaryAction={
                  assignees.some((assignee) => assignee.id === user.id) ? (
                    <Icon
                      type="check"
                      variant={
                        completers.some(
                          (completer) => completer.id === user.id
                        ) && "lightened"
                      }
                    />
                  ) : null
                }
              >
                <ListItemText>
                  <ListItemButton
                    onClick={() => handleToggleAssignment(user.id)}
                    disabled={
                      cantAssign ||
                      completers.some((completer) => completer.id === user.id)
                    }
                  >
                    <Stack direction="row" spacing={3} alignItems="center ">
                      <AvatarWrapper
                        key={user.id}
                        src={user?.attributes?.imageUrl}
                        badgeContent={
                          completers.some(
                            (completer) => completer.id === user.id
                          ) && (
                            <Icon
                              className="checkCircleAssignee"
                              type="checkCircle"
                              size="small"
                              variant="primary"
                              filled
                            />
                          )
                        }
                      />
                      <Typography variant="bodyRegular">
                        {user.attributes.firstName} {user.attributes.lastName}
                      </Typography>
                    </Stack>
                  </ListItemButton>
                </ListItemText>
              </ListItem>
            ))}
          <ListItem disablePadding>
            <ListItemText>
              <ListItemButton onClick={handleUnassignAll} disabled={isComplete}>
                <Stack direction="row" spacing={3} alignItems="center ">
                  <Icon type="userCircle" variant="lightened" />
                  <Typography variant="bodyRegular">No assignee</Typography>
                </Stack>
              </ListItemButton>
            </ListItemText>
          </ListItem>
        </List>
      </StyledAssigneeRoster>
    </>
  );
};

export default AssigneeRoster;

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
