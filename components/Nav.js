import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

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
} from "./ui/index";
import Header from "./Header";
import useAssignedSteps from "@hooks/useAssignedSteps";

// import AdviceProcessNavigation from "./page-content/advice/AdviceProcessNavigation";

const StyledNav = styled(Box)`
  display: flex;
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
    padding-top: ${({ theme }) => theme.util.appBarHeight}px;
  }
`;

const Nav = ({ toggleNavOpen, navOpen }) => {
  const { screenSize } = getScreenSize();

  // console.log(screenSize.isSm);

  return (
    <StyledNav sx={{ display: "flex" }}>
      <CustomDrawer
        variant={screenSize.isSm ? "temporary" : "permanent"}
        anchor="left"
        open={navOpen}
        onClose={toggleNavOpen}
      >
        <Stack
          justifyContent="space-between"
          direction="column"
          sx={{ height: "100%" }}
        >
          <Navigation />
          <Grid container p={4}>
            <Grid item xs={12}>
              <Link href="mailto:support@wildflowerschools.org?subject=My Wildflower Feedback">
                <Card variant="lightened" size="small" hoverable>
                  <Stack spacing={1}>
                    <Grid container alignItems="center">
                      <Grid item flex={1}>
                        <Typography variant="bodyRegular" bold highlight>
                          We want to hear from you!
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Icon type="chevronRight" variant="primary" />
                      </Grid>
                    </Grid>
                    <Typography variant="bodyRegular" lightened>
                      Click here to send us an email with any and all feedback.
                    </Typography>
                  </Stack>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </CustomDrawer>
    </StyledNav>
  );
};

export default Nav;

const Navigation = () => {
  const router = useRouter();
  const { currentUser, isOperationsGuide } = useUserContext();
  const [ogViewingSchool, setOgViewingSchool] = useState();
  const { workflow } = router.query;

  useEffect(() => {
    if (router.asPath === "/your-schools") {
      sessionStorage.removeItem("schoolName");
    }
    if (
      router.pathname.includes("/ssj/") &&
      sessionStorage.getItem("schoolName")
    ) {
      setOgViewingSchool(sessionStorage.getItem("schoolName"));
    }
  }, []);

  const isTeacherLeader =
    currentUser?.personRoleList?.includes("Teacher Leader");

  // console.log({ ogViewingSchool });
  // console.log({ isTeacherLeader });
  // console.log({ currentUser });

  return currentUser ? (
    <Box>
      {isOperationsGuide && router.pathname.includes("/ssj/") ? (
        <Snackbar
          open={ogViewingSchool}
          autoHideDuration={null}
          anchorOrigin={{ vertical: "middle", horizontal: "center" }}
        >
          <div>
            <Card size="small" variant="primaryLightened">
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="bodySmall" bold highlight>
                  VIEWING
                </Typography>
                <Typography variant="bodyRegular">{ogViewingSchool}</Typography>
              </Stack>
            </Card>
          </div>
        </Snackbar>
      ) : null}

      {router.pathname.includes("/admin") ? (
        <>
          <NavLink
            variant="primary"
            to="/admin"
            active={router.asPath === "/admin"}
            label="Admin Dashboard"
          />
        </>
      ) : (
        <>
          <NavLink
            variant="primary"
            to="/network"
            active={router.pathname.includes("/network")}
            label="Network"
            icon="bookReader"
          />

          {isTeacherLeader ? (
            <NavLink
              variant="primary"
              to="/open-school"
              active={router.asPath === `/open-school`}
              label="Your School Dashboard" //TODO: Make actual school name
              icon="home"
            />
          ) : null}

          {router.pathname.includes("/open-school") ? (
            <OpenSchoolNavigation />
          ) : null}

          {!isOperationsGuide && currentUser?.attributes?.ssj ? (
            <NavLink
              variant="primary"
              to={`/ssj/${currentUser?.attributes?.ssj?.workflowId}`}
              active={router.asPath === `/ssj/${workflow}`}
              label="School Startup Journey"
              icon="home"
            />
          ) : null}
          {isOperationsGuide ? (
            <Stack spacing={3}>
              <NavLink
                variant="primary"
                to="/your-schools"
                active={router.asPath === "/your-schools"}
                label="Your Schools"
                icon="buildingHouse"
              />

              {ogViewingSchool && router.pathname.includes("/ssj/") ? (
                <Box pl={3} pr={3} pb={3}>
                  <Card size="small" variant="primaryLightened">
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Typography variant="bodySmall" bold highlight>
                        VIEWING
                      </Typography>
                      <Typography variant="bodyRegular">
                        {ogViewingSchool}
                      </Typography>
                    </Stack>
                  </Card>
                </Box>
              ) : null}
            </Stack>
          ) : null}

          {router.pathname.includes("/ssj") ? (
            <SSJNavigation
              SSJworkflowId={workflow}
              opsView={isOperationsGuide}
            />
          ) : null}
        </>
      )}
    </Box>
  ) : (
    <Box />
  );
};

const SSJNavigation = ({ opsView, SSJworkflowId }) => {
  const router = useRouter();
  const { workflow } = router.query;
  const { assignedSteps, isLoading, isError } = useAssignedSteps(workflow);
  // console.log(assignedSteps);
  return (
    <Box>
      <NavLink
        variant="secondary"
        to={`/ssj/${SSJworkflowId}/to-do-list`}
        active={router.pathname.includes("/to-do-list")}
        label="To do list"
        icon="calendarCheck"
        secondaryAction={
          isLoading ? null : !assignedSteps.length ? null : (
            <Chip size="small" label={assignedSteps.length} variant="primary" />
          )
        }
      />
      <NavLink
        variant="secondary"
        to={`/ssj/${SSJworkflowId}/milestones`}
        active={router.pathname.includes("/milestones")}
        label="Milestones"
        icon="layer"
      />
      <NavLink
        variant="tertiary"
        to={`/ssj/${SSJworkflowId}/visioning`}
        active={router.pathname.includes("/visioning")}
        label="Visioning"
        icon={true}
      />
      <NavLink
        variant="tertiary"
        to={`/ssj/${SSJworkflowId}/planning`}
        active={router.pathname.includes("/planning")}
        label="Planning"
        icon={true}
      />
      <NavLink
        variant="tertiary"
        to={`/ssj/${SSJworkflowId}/startup`}
        active={router.pathname.includes("/startup")}
        label="Startup"
        icon={true}
      />
      {opsView ? null : (
        <NavLink
          variant="secondary"
          to={`/ssj/${SSJworkflowId}/resources`}
          active={router.pathname.includes("/resources")}
          label="Resources"
          icon="fileBlank"
        />
      )}
    </Box>
  );
};

const OpenSchoolNavigation = () => {
  const router = useRouter();
  return (
    <Box>
      <NavLink
        variant="secondary"
        to={`/open-school/admin-checklist`}
        active={router.pathname.includes("/open-school/admin-checklist")}
        label="Admin Checklist"
        secondaryAction={
          <Chip size="small" label="Q1 2024" variant="lightened" />
        }
        icon="loader"
      />
      <NavLink
        variant="secondary"
        to={`/open-school/enrollment-and-communications`}
        active={router.pathname.includes(
          "/open-school/enrollment-and-communications"
        )}
        label="Enrollment & Family Comms"
        icon="loader"
      />
      <NavLink
        variant="secondary"
        to={`/open-school/finance-and-operations`}
        active={router.pathname.includes("/open-school/finance-and-operations")}
        label="Finance & Operations"
        icon="loader"
      />
      <NavLink
        variant="secondary"
        to={`/open-school/my-board`}
        active={router.pathname.includes("/open-school/my-board")}
        label="My Board"
        icon="loader"
      />
      <NavLink
        variant="secondary"
        to={`/open-school/resources`}
        active={router.pathname.includes("/open-school/resources")}
        label="Resources"
        icon="loader"
      />
      <NavLink
        variant="secondary"
        to={`/open-school/support`}
        active={router.pathname.includes("/open-school/support")}
        label="Support@"
        icon="loader"
      />
    </Box>
  );
};
