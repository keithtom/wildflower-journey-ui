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
import { logout } from "@api/auth";
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
import useWorkflow from "@hooks/useWorkflow";

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
  margin-bottom: ${({ theme }) => theme.spacing(1)};
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

const WorkflowNavItems = ({
  school,
  workflowId,
  openSection,
  onSectionClick,
}) => {
  const router = useRouter();
  const { workflow, isLoading, isError } = useWorkflow(workflowId);
  const [expanded, setExpanded] = useState(false);

  const { t } = useTranslation("common");
  // console.log({ workflow });

  // Add current date logic
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based

  useEffect(() => {
    // Check if any child route is selected
    const isChecklistSelected = router.asPath.startsWith(
      `/school/${school.id}/open-school/${workflowId}/checklist`
    );
    const isResourcesSelected =
      router.asPath ===
      `/school/${school.id}/open-school/${workflowId}/resources`;
    const isVisioningSelected =
      router.asPath === `/school/${school.id}/ssj/${workflowId}/visioning`;
    const isPlanningSelected =
      router.asPath === `/school/${school.id}/ssj/${workflowId}/planning`;
    const isStartupSelected =
      router.asPath === `/school/${school.id}/ssj/${workflowId}/startup`;
    const isSsjMilestonesSelected =
      router.asPath === `/school/${school.id}/ssj/${workflowId}/milestones`;
    const isSsjResourcesSelected =
      router.asPath === `/school/${school.id}/ssj/${workflowId}/resources`;

    // Set expanded if any child route is selected
    setExpanded(
      isChecklistSelected ||
        isResourcesSelected ||
        isVisioningSelected ||
        isPlanningSelected ||
        isStartupSelected ||
        isSsjMilestonesSelected ||
        isSsjResourcesSelected
    );
  }, [router.asPath, school.id, workflowId]);

  if (isLoading || !workflow) {
    return null;
  }

  const isOpenSchoolChecklist = workflow.attributes.recurring === true;
  const isSchoolStartupJourney = workflow.attributes.recurring === false;

  if (isOpenSchoolChecklist) {
    return (
      <>
        <NavListItemButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          sx={{ pl: 8 }}
        >
          <NavListItemIcon>
            <Icon type="calendar" />
          </NavListItemIcon>
          <NavListItemText primary="Open School Checklist" />
          <Icon
            type={expanded ? "chevronDown" : "chevronRight"}
            variant="lightened"
            size="small"
          />
        </NavListItemButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <NavList sx={{ padding: 0 }}>
            <NavListItemButton
              onClick={() =>
                router.push(
                  `/school/${school.id}/open-school/${workflowId}/checklist/${currentYear}/${currentMonth}`
                )
              }
              selected={router.asPath.startsWith(
                `/school/${school.id}/open-school/${workflowId}/checklist`
              )}
              sx={{ pl: 8 }}
            >
              <NavListItemIcon></NavListItemIcon>
              <NavListItemText secondary="Checklist" />
            </NavListItemButton>
            <NavListItemButton
              onClick={() =>
                router.push(
                  `/school/${school.id}/open-school/${workflowId}/resources`
                )
              }
              selected={
                router.asPath ===
                `/school/${school.id}/open-school/${workflowId}/resources`
              }
              sx={{ pl: 8 }}
            >
              <NavListItemIcon></NavListItemIcon>
              <NavListItemText secondary="Resources" />
            </NavListItemButton>
          </NavList>
        </Collapse>
      </>
    );
  }

  if (isSchoolStartupJourney) {
    return (
      <>
        <NavListItemButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          sx={{ pl: 8 }}
        >
          <NavListItemIcon>
            <Icon type="map" />
          </NavListItemIcon>
          <NavListItemText
            primary={t("ssj_ui_content.school_startup_journey")}
          />
          <Icon
            type={expanded ? "chevronDown" : "chevronRight"}
            variant="lightened"
            size="small"
          />
        </NavListItemButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <NavList sx={{ padding: 0 }}>
            <NavListItemButton
              onClick={() =>
                router.push(`/school/${school.id}/ssj/${workflowId}/visioning`)
              }
              selected={
                router.asPath ===
                `/school/${school.id}/ssj/${workflowId}/visioning`
              }
              sx={{ pl: 8 }}
            >
              <NavListItemIcon></NavListItemIcon>
              <NavListItemText secondary={t("ssj_phases.visioning")} />
            </NavListItemButton>
            <NavListItemButton
              onClick={() =>
                router.push(`/school/${school.id}/ssj/${workflowId}/planning`)
              }
              selected={
                router.asPath ===
                `/school/${school.id}/ssj/${workflowId}/planning`
              }
              sx={{ pl: 8 }}
            >
              <NavListItemIcon></NavListItemIcon>
              <NavListItemText secondary={t("ssj_phases.planning")} />
            </NavListItemButton>
            <NavListItemButton
              onClick={() =>
                router.push(`/school/${school.id}/ssj/${workflowId}/startup`)
              }
              selected={
                router.asPath ===
                `/school/${school.id}/ssj/${workflowId}/startup`
              }
              sx={{ pl: 8 }}
            >
              <NavListItemIcon></NavListItemIcon>
              <NavListItemText secondary={t("ssj_phases.startup")} />
            </NavListItemButton>
            <NavListItemButton
              onClick={() =>
                router.push(`/school/${school.id}/ssj/${workflowId}/milestones`)
              }
              selected={
                router.asPath ===
                `/school/${school.id}/ssj/${workflowId}/milestones`
              }
              sx={{ pl: 8 }}
            >
              <NavListItemIcon></NavListItemIcon>
              <NavListItemText secondary={t("ssj_ui_content.milestones")} />
            </NavListItemButton>
            <NavListItemButton
              onClick={() =>
                router.push(`/school/${school.id}/ssj/${workflowId}/resources`)
              }
              selected={
                router.asPath ===
                `/school/${school.id}/ssj/${workflowId}/resources`
              }
              sx={{ pl: 8 }}
            >
              <NavListItemIcon></NavListItemIcon>
              <NavListItemText secondary={t("ssj_ui_content.resources")} />
            </NavListItemButton>
          </NavList>
        </Collapse>
      </>
    );
  }

  return null;
};

const SchoolNavItem = ({
  school,
  openSchoolId,
  handleSchoolClick,
  router,
  openSection,
  onSectionClick,
}) => (
  <div data-cy="school-nav-item">
    <NavListItemButton
      onClick={() => handleSchoolClick(school.id)}
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
    </NavListItemButton>
    <Collapse in={openSchoolId === school.id} timeout="auto" unmountOnExit>
      <NavList sx={{ padding: 0 }}>
        <NavListItemButton
          onClick={() => router.push(`/school/${school.id}/to-do-list`)}
          selected={router.pathname.endsWith("/to-do-list")}
          sx={{ pl: 8 }}
        >
          <NavListItemIcon>
            <Icon type="inbox" />
          </NavListItemIcon>
          <NavListItemText primary="To Do List" />
        </NavListItemButton>

        {school.workflowIds?.map((workflowId) => (
          <WorkflowNavItems
            key={workflowId}
            school={school}
            workflowId={workflowId}
            openSection={openSection}
            onSectionClick={onSectionClick}
          />
        ))}
      </NavList>
    </Collapse>
  </div>
);

const Nav = ({ toggleNavOpen, navOpen }) => {
  const router = useRouter();
  const { screenSize } = getScreenSize();
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSchoolId, setOpenSchoolId] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const {
    currentUser,
    isLoggedIn,
    setCurrentUser,
    isAdmin,
    isOperationsGuide,
  } = useUserContext();

  // Set initial open school based on route
  useEffect(() => {
    const schoolIdMatch = router.asPath.match(/\/school\/([^/]+)/);
    if (schoolIdMatch) {
      setOpenSchoolId(schoolIdMatch[1]);
    } else {
      // If we're not on a school route, collapse the school section
      setOpenSchoolId(null);
    }

    // Close the navigation drawer when route changes (on mobile)
    if (screenSize.isSm && navOpen) {
      toggleNavOpen(false);
    }
  }, [router.asPath]);

  // Determine which section should be open based on current route
  useEffect(() => {
    if (router.pathname.includes("/school/")) {
      if (router.pathname.includes("/open-school/")) {
        setOpenSection("openSchool");
      } else if (router.pathname.includes("/ssj/")) {
        setOpenSection("ssj");
      } else {
        setOpenSection("school");
      }
    } else {
      // If we're not on a school route, collapse all sections
      setOpenSection(null);
    }
  }, [router.pathname]);

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSchoolClick = (schoolId) => {
    router.push(`/school/${schoolId}`);
    // Only toggle if it's not already open
    if (openSchoolId !== schoolId) {
      setOpenSchoolId(schoolId);
      handleSectionClick("school");
    }
  };

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

  async function handleLogOut() {
    try {
      const res = await logout();
      // console.log(res);
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
  const logo = "/assets/images/wildflower-logo.png";

  // console.log(screenSize.isSm);
  // console.log({ currentUser });

  const isTeacherLeaderSchool = (school) =>
    school.role_list?.some(
      (role) => role === "Teacher Leader" || role === "Emerging Teacher Leader"
    ) && !school.end_date;

  const teacherLeaderSchools =
    currentUser?.attributes?.schools?.filter(isTeacherLeaderSchool) || [];
  const otherSchools =
    currentUser?.attributes?.schools?.filter(
      (school) => !isTeacherLeaderSchool(school) && !school.end_date
    ) || [];
  const shouldShowDivider =
    teacherLeaderSchools.length > 0 && otherSchools.length > 0;

  // console.log({ teacherLeaderSchools, otherSchools, shouldShowDivider });

  return (
    <StyledNav
      sx={{
        display: "flex",
      }}
    >
      <CustomDrawer
        variant={screenSize.isSm ? "temporary" : "permanent"}
        anchor="left"
        open={navOpen}
        onClose={toggleNavOpen}
        sx={{
          p: 2,
          zIndex: 10,
        }}
      >
        <Stack
          justifyContent="space-between"
          direction="column"
          sx={{ height: "100%" }}
        >
          <div>
            <NavList>
              <NavListItemButton
                onClick={handleUserClick}
                sx={{ cursor: "pointer" }}
                data-cy="user-profile-button"
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ height: 40, width: 40 }}
                    src={currentUser?.attributes.imageUrl}
                  />
                </ListItemAvatar>
                <NavListItemText
                  primary={`${currentUser?.attributes?.firstName} ${currentUser?.attributes?.lastName}`}
                  secondary={
                    currentUser?.personRoleList?.length > 0
                      ? currentUser.personRoleList
                          .map((role, index, array) =>
                            index === array.length - 1 ? role : `${role}, `
                          )
                          .join("")
                      : ""
                  }
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
              {!router.asPath.includes("/admin") && (
                <>
                  <NavListItemButton
                    onClick={() => router.push("/network")}
                    selected={router.pathname.includes("/network")}
                  >
                    <NavListItemIcon>
                      <Icon type="bookReader" />
                    </NavListItemIcon>
                    <NavListItemText primary="Network" bold />
                  </NavListItemButton>
                  {currentUser?.personRoleList?.includes("Ops Guide") ? (
                    <NavListItemButton
                      onClick={() => router.push("/your-schools")}
                      selected={router.pathname.includes("/your-schools")}
                    >
                      <NavListItemIcon>
                        <Icon type="buildingHouse" />
                      </NavListItemIcon>
                      <NavListItemText primary="Your Schools" bold />
                    </NavListItemButton>
                  ) : null}
                </>
              )}

              {/* Admin Navigation */}
              {isAdmin && router.asPath.includes("/admin") && (
                <>
                  <Divider
                    sx={{ my: 2, borderColor: theme.color.neutral.lightened }}
                  />
                  <NavListItemButton
                    onClick={() => router.push("/admin")}
                    selected={router.asPath === "/admin"}
                  >
                    <NavListItemIcon>
                      <Icon type="home" />
                    </NavListItemIcon>
                    <NavListItemText primary="Dashboard" bold />
                  </NavListItemButton>
                  <NavListItemButton
                    onClick={() => {
                      localStorage.removeItem("workflowId");
                      router.push("/admin/workflows");
                    }}
                    selected={router.asPath === "/admin/workflows"}
                  >
                    <NavListItemIcon>
                      <Icon type="layer" />
                    </NavListItemIcon>
                    <NavListItemText primary="Workflows" bold />
                  </NavListItemButton>
                  <NavListItemButton
                    onClick={() => router.push("/admin/schools")}
                    selected={router.asPath === "/admin/schools"}
                  >
                    <NavListItemIcon>
                      <Icon type="buildingHouse" />
                    </NavListItemIcon>
                    <NavListItemText primary="Schools" bold />
                  </NavListItemButton>
                  <NavListItemButton
                    onClick={() => router.push("/admin/people")}
                    selected={router.asPath === "/admin/people"}
                  >
                    <NavListItemIcon>
                      <Icon type="userCircle" />
                    </NavListItemIcon>
                    <NavListItemText primary="People" bold />
                  </NavListItemButton>
                </>
              )}
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
                  onClick={() =>
                    router.push(`/network/people/${currentUser?.id}`)
                  }
                >
                  <NavListItemIcon>
                    <Icon type="user" variant="lightened" />
                  </NavListItemIcon>
                  <NavListItemText primary="Your Profile" />
                </NavListItemButton>
                <Divider
                  sx={{ my: 2, borderColor: theme.color.neutral.lightened }}
                />
                {isAdmin ? (
                  <NavListItemButton
                    onClick={() => {
                      if (router.asPath.includes("/admin")) {
                        teacherLeaderSchools.length > 0
                          ? router.push(
                              `/school/${teacherLeaderSchools[0]?.id}`
                            )
                          : currentUser?.personRoleList?.includes("Ops Guide")
                          ? router.push("/your-schools")
                          : router.push("/network");
                      } else {
                        router.push("/admin");
                      }
                    }}
                    data-cy="switch-to-admin-button"
                  >
                    <NavListItemIcon>
                      <Icon
                        type={
                          router.asPath.includes("/admin")
                            ? "buildingHouse"
                            : "data"
                        }
                        variant="lightened"
                      />
                    </NavListItemIcon>
                    <NavListItemText
                      primary={
                        router.asPath.includes("/admin")
                          ? "Switch to Platform"
                          : "Switch to Admin"
                      }
                    />
                  </NavListItemButton>
                ) : null}
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

            <Divider
              sx={{ my: 2, borderColor: theme.color.neutral.lightened }}
            />

            <NavList>
              {!router.asPath.includes("/admin") && (
                <>
                  {teacherLeaderSchools.length > 0 &&
                    teacherLeaderSchools.map((school, i) => (
                      <SchoolNavItem
                        key={`teacher-leader-${i}`}
                        school={school}
                        openSchoolId={openSchoolId}
                        handleSchoolClick={handleSchoolClick}
                        router={router}
                        openSection={openSection}
                        onSectionClick={handleSectionClick}
                      />
                    ))}

                  {shouldShowDivider && (
                    <Divider
                      sx={{ my: 2, borderColor: theme.color.neutral.lightened }}
                    />
                  )}

                  {otherSchools.length > 0 &&
                    otherSchools.map((school, i) => (
                      <SchoolNavItem
                        key={`other-${i}`}
                        school={school}
                        openSchoolId={openSchoolId}
                        handleSchoolClick={handleSchoolClick}
                        router={router}
                        openSection={openSection}
                        onSectionClick={handleSectionClick}
                      />
                    ))}
                </>
              )}
            </NavList>
          </div>

          <Grid container spacing={3} p={4}>
            <Grid item xs={12}>
              <img src={logo} style={{ height: "32px" }} />
            </Grid>
            {router.asPath.includes("/admin") ? null : (
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
            )}
          </Grid>
        </Stack>
      </CustomDrawer>
    </StyledNav>
  );
};

export default Nav;
