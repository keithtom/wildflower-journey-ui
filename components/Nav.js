import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  Divider,
  Popover,
  Collapse,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "next-i18next";

import { clearLoggedInState } from "../lib/handleLogout";
import { getScreenSize } from "../hooks/react-responsive";
import { useUserContext } from "../lib/useUserContext";
import { user } from "../lib/utils/fake-data";
import { theme } from "../styles/theme";
import {
  Select,
  Card,
  Typography,
  Stack,
  Grid,
  Link,
  Box,
  NavLink,
  Icon,
  Snackbar,
  Chip,
  Avatar,
} from "./ui/index";
import Header from "./Header";
import useAssignedSteps from "@hooks/useAssignedSteps";
import TranslationToggle from "./TranslationToggle";

// import AdviceProcessNavigation from "./page-content/advice/AdviceProcessNavigation";

const StyledNav = styled(Box)`
  display: flex;
  position: fixed;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndex.drawer};
`;

const CustomDrawer = styled(Drawer)`
  margin: 0;
  flex-shrink: 0;
  width: ${({ theme }) => theme.util.drawerWidth}px;
  z-index: 1;
  .MuiDrawer-paper {
    width: ${({ theme }) => theme.util.drawerWidth}px;
    outline: 1px solid ${({ theme }) => theme.color.neutral.main};
    border: none;
    margin-top: 0;
    padding: ${({ theme }) => theme.spacing(2, 2)};
  }
`;

const NavList = styled(List)`
  padding: ${({ theme }) => theme.spacing(2, 2)};
`;

const NavListItemButton = styled(ListItemButton)`
  padding: ${({ theme }) => theme.spacing(2, 2)};
  margin: ${({ theme }) => theme.spacing(0.5, 0)};
  border-radius: ${({ theme }) => theme.radius.md}px;
  &:hover {
    background-color: ${({ theme }) => theme.color.neutral.lightened};
  }
  &.Mui-selected {
    background-color: ${({ theme }) => theme.color.neutral.lightened};
    .MuiTypography-root {
      color: ${({ theme }) => theme.color.primary.main};
    }
    .MuiListItemIcon-root svg {
      color: ${({ theme }) => theme.color.primary.main};
    }
    &:hover {
      background-color: ${({ theme }) => theme.color.neutral.lightened};
    }
  }
`;

const NavListItemText = ({ primary, secondary, bold, ...props }) => (
  <ListItemText
    primary={
      <Typography
        variant="bodyRegular"
        bold={bold}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {primary}
      </Typography>
    }
    secondary={
      secondary && (
        <Typography
          variant="bodyRegular"
          lightened
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {secondary}
        </Typography>
      )
    }
    {...props}
  />
);

const NavPopover = styled(Popover)`
  .MuiPaper-root {
    width: ${({ theme }) => theme.util.drawerWidth - theme.util.buffer * 8}px;
    margin-top: ${({ theme }) => theme.spacing(1)};
    box-shadow: ${({ theme }) => theme.shadow.small.lightened};
    border-radius: ${({ theme }) => theme.radius.lg}px;
    border: ${({ theme }) => theme.util.borderWidth} solid
      ${({ theme }) => theme.color.neutral.main};
    background: ${({ theme }) => theme.color.neutral.light};
  }
`;

const NavListItemIcon = styled(ListItemIcon)`
  min-width: 56px;
  display: flex;
  justify-content: left;
  padding-left: 8px;
`;

const Nav = ({ toggleNavOpen, navOpen }) => {
  const { screenSize } = getScreenSize();
  const router = useRouter();
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState(null);
  const [schoolExpanded, setSchoolExpanded] = useState(false);
  const [checklistExpanded, setChecklistExpanded] = useState(false);
  const [journeyExpanded, setJourneyExpanded] = useState(false);
  const {
    currentUser,
    isLoggedIn,
    setCurrentUser,
    isAdmin,
    isOperationsGuide,
  } = useUserContext();

  useEffect(() => {
    // Main school section
    setSchoolExpanded(router.pathname.includes("/school/"));

    // Open School Checklist section
    setChecklistExpanded(router.pathname.includes("/open-school/"));

    // School Startup Journey section
    setJourneyExpanded(
      router.pathname.includes("/ssj/") ||
        router.pathname.includes("/visioning") ||
        router.pathname.includes("/planning") ||
        router.pathname.includes("/startup") ||
        router.pathname.includes("/resources")
    );
  }, [router.pathname]);

  // Don't render nav if user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { workflow } = router.query;
  const approvedWorkflowIds = ["5c8f-d17c"]; // Maggie's workflow ID
  const isApproved = approvedWorkflowIds.includes(workflow);

  async function handleLogOut() {
    try {
      const res = await registrationsAPI.logout();
      console.log(res);
    } catch (err) {
      if (err?.response?.status !== 401) {
        console.error("Error logging out:", err);
      }
    } finally {
      router.push("/logged-out", "/logged-out", { locale: "en" }).then(() => {
        // Clear the authentication tokens and user state after redirecting
        clearLoggedInState({});
        setCurrentUser(null);
      });
    }
  }

  // console.log(screenSize.isSm);

  return (
    <StyledNav sx={{ display: "flex" }}>
      <CustomDrawer
        variant={screenSize.isSm ? "temporary" : "permanent"}
        anchor="left"
        open={navOpen}
        onClose={toggleNavOpen}
        sx={{ p: 2 }}
      >
        <NavList>
          <NavListItemButton
            onClick={handleUserClick}
            sx={{ cursor: "pointer" }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{ height: 40, width: 40 }}
                src={currentUser?.attributes.imageUrl}
              />
            </ListItemAvatar>
            <NavListItemText
              primary={`${currentUser?.attributes.firstName} ${currentUser?.attributes.lastName}`}
              secondary={currentUser?.personRoleList.map((m) => {
                return `${m}, `;
              })}
              bold
            />
            <Box
              sx={{
                ml: 1,
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon type="dotsVertical" variant="lightened" />
            </Box>
          </NavListItemButton>
          <NavListItemButton onClick={() => router.push("/network")}>
            <NavListItemIcon>
              <Icon type="bookReader" />
            </NavListItemIcon>
            <NavListItemText primary="Network" bold />
          </NavListItemButton>
          <NavListItemButton onClick={() => router.push("/your-schools")}>
            <NavListItemIcon>
              <Icon type="buildingHouse" />
            </NavListItemIcon>
            <NavListItemText primary="Your Schools" bold />
          </NavListItemButton>
        </NavList>
        <NavPopover
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
          <NavList>
            <NavListItemButton
              onClick={() => router.push(`/network/people/${currentUser?.id}`)}
            >
              <NavListItemIcon>
                <Icon type="user" variant="lightened" />
              </NavListItemIcon>
              <NavListItemText primary="Your Profile" />
            </NavListItemButton>
            <Divider
              sx={{ my: 2, borderColor: theme.color.neutral.lightened }}
            />
            <NavListItemButton onClick={() => router.push("/admin")}>
              <NavListItemIcon>
                <Icon type="data" variant="lightened" />
              </NavListItemIcon>
              <NavListItemText primary="Switch To Admin" />
            </NavListItemButton>
            <NavListItemButton onClick={() => router.push("/settings")}>
              <NavListItemIcon>
                <Icon type="cog" variant="lightened" />
              </NavListItemIcon>
              <NavListItemText primary="Settings" />
            </NavListItemButton>
            <Divider
              sx={{ my: 2, borderColor: theme.color.neutral.lightened }}
            />
            <NavListItemButton onClick={handleLogOut}>
              <NavListItemIcon>
                <Icon type="logOut" variant="lightened" />
              </NavListItemIcon>
              <NavListItemText primary="Logout" />
            </NavListItemButton>
          </NavList>
        </NavPopover>

        <Divider sx={{ my: 2, borderColor: theme.color.neutral.lightened }} />

        <NavList>
          {currentUser?.attributes.schools.map((school, i) => (
            <>
              <NavListItemButton
                key={i}
                onClick={() => router.push(`/school/${school.id}`)}
                selected={router.asPath === `/school/${school.id}`}
              >
                <NavListItemIcon>
                  <Box
                    sx={{
                      height: 24,
                      width: 24,
                      borderRadius: (theme) => theme.radius.md + "px",
                      backgroundColor: (theme) => theme.color.neutral.main,
                    }}
                  />
                </NavListItemIcon>
                <NavListItemText primary={school.name} bold />
                <Icon variant="lightened" size="small" />
              </NavListItemButton>
              <Collapse in={schoolExpanded} timeout="auto" unmountOnExit>
                <NavList sx={{ padding: 0 }}>
                  <NavListItemButton
                    onClick={() =>
                      router.push(`/school/${school.id}/to-do-list`)
                    }
                    selected={router.pathname.endsWith("/to-do-list")}
                    sx={{ pl: 8 }}
                  >
                    <NavListItemIcon>
                      <Icon type="inbox" />
                    </NavListItemIcon>
                    <NavListItemText primary="To Do List" />
                  </NavListItemButton>

                  <NavListItemButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setChecklistExpanded(!checklistExpanded);
                    }}
                    sx={{ pl: 8 }}
                  >
                    <NavListItemIcon>
                      <Icon type="calendar" />
                    </NavListItemIcon>
                    <NavListItemText primary="Open School Checklist" />
                    <Icon
                      type={checklistExpanded ? "chevronDown" : "chevronRight"}
                      variant="lightened"
                      size="small"
                    />
                  </NavListItemButton>
                  <Collapse in={checklistExpanded} timeout="auto" unmountOnExit>
                    <NavList sx={{ padding: 0 }}>
                      <NavListItemButton
                        onClick={() =>
                          router.push(
                            "/school/1234/open-school/1234-1234/checklist/2025/1"
                          )
                        }
                        sx={{ pl: 8 }}
                      >
                        <NavListItemIcon></NavListItemIcon>
                        <NavListItemText secondary="Checklist" />
                      </NavListItemButton>
                    </NavList>
                  </Collapse>
                  <NavListItemButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setJourneyExpanded(!journeyExpanded);
                    }}
                    sx={{ pl: 8 }}
                  >
                    <NavListItemIcon>
                      <Icon type="map" />
                    </NavListItemIcon>
                    <NavListItemText primary="School Startup Journey" />
                    <Icon
                      type={journeyExpanded ? "chevronDown" : "chevronRight"}
                      variant="lightened"
                      size="small"
                    />
                  </NavListItemButton>
                  <Collapse in={journeyExpanded} timeout="auto" unmountOnExit>
                    <NavList sx={{ padding: 0 }}>
                      <NavListItemButton
                        onClick={() =>
                          router.push("/school/1234/ssj/1234-1234/visioning")
                        }
                        selected={router.pathname.endsWith("/visioning")}
                        sx={{ pl: 8 }}
                      >
                        <NavListItemIcon></NavListItemIcon>
                        <NavListItemText secondary="Visioning" />
                      </NavListItemButton>
                      <NavListItemButton
                        onClick={() =>
                          router.push("/school/1234/ssj/1234-1234/planning")
                        }
                        sx={{ pl: 8 }}
                      >
                        <NavListItemIcon></NavListItemIcon>
                        <NavListItemText secondary="Planning" />
                      </NavListItemButton>
                      <NavListItemButton
                        onClick={() =>
                          router.push("/school/1234/ssj/1234-1234/startup")
                        }
                        sx={{ pl: 8 }}
                      >
                        <NavListItemIcon></NavListItemIcon>
                        <NavListItemText secondary="Startup" />
                      </NavListItemButton>
                      <NavListItemButton
                        onClick={() =>
                          router.push("/school/1234/ssj/1234-1234/resources")
                        }
                        sx={{ pl: 8 }}
                      >
                        <NavListItemIcon></NavListItemIcon>
                        <NavListItemText secondary="Resources" />
                      </NavListItemButton>
                    </NavList>
                  </Collapse>
                </NavList>
              </Collapse>
            </>
          ))}
        </NavList>
        {/* <Stack
          justifyContent="space-between"
          direction="column"
          sx={{ height: "100%" }}
        >
          <div>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar />
              </Grid>
              <Grid item>
                <Typography variant="bodyRegular" bold>
                  Maggie Paulin
                </Typography>
                <Typography variant="bodyRegular" lightened>
                  Emerging Teacher Leader
                </Typography>
              </Grid>
            </Grid>
            <NavLink
              variant="primary"
              to="/network"
              active={router.pathname.includes("/network")}
              label="Network"
              icon="bookReader"
            />
            <Navigation />
          </div>
          <Grid container p={4} spacing={3}>
            <Grid item xs={12}>
              <Link href="mailto:support@wildflowerschools.org?subject=My Wildflower Feedback">
                <Card variant="lightened" size="small" hoverable>
                  <Stack spacing={1}>
                    <Grid container alignItems="center">
                      <Grid item flex={1}>
                        <Typography variant="bodyRegular" bold highlight>
                          {t("navigation.we_want_to_hear_from_you")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Icon type="chevronRight" variant="primary" />
                      </Grid>
                    </Grid>
                    <Typography variant="bodyRegular" lightened>
                      {t("navigation.click_here")}
                    </Typography>
                  </Stack>
                </Card>
              </Link>
            </Grid>
            {isApproved && router.pathname.includes("/ssj/") ? (
              <Grid item xs={12}>
                <TranslationToggle />
              </Grid>
            ) : null}
          </Grid>
        </Stack> */}
      </CustomDrawer>
    </StyledNav>
  );
};

export default Nav;
