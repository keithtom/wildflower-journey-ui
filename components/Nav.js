import { useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";

import { user } from "../lib/utils/fake-data";
import { theme } from "../styles/theme";
import {
  Card,
  Typography,
  Stack,
  Grid,
  Link,
  Box,
  NavLink,
  Icon,
} from "./ui/index";
import Header from "./Header";

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
  const isSm = useMediaQuery({ maxDeviceWidth: theme.breakpoints.values.sm });

  return (
    <StyledNav sx={{ display: "flex" }}>
      <CustomDrawer
        variant={isSm ? `temporary` : `permanent`}
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
              <Link href="mailto:support@wildflowerschools.org?subject=Wildflower Platform Feedback">
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

const Navigation = ({}) => {
  const router = useRouter();
  return (
    <Box>
      {/* <NavLink
        to="/network"
        active={router.pathname.includes("/network")}
        label="Network"
        icon="bookReader"
      /> */}
      <NavLink
        variant="primary"
        to="/ssj"
        active={router.asPath === "/ssj"}
        label="School Startup Journey"
        icon="home"
      />
      {router.pathname.includes("/ssj") && <SSJNavigation />}
      {/* <NavLink
        to="/advice"
        active={router.pathname.includes("/advice")}
        label="Advice"
        icon="conversation"
        />
      {router.pathname.includes("/advice") && <AdviceProcessNavigation />} */}
    </Box>
  );
};

const SSJNavigation = ({}) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <Box>
      <NavLink
        variant="secondary"
        to="/ssj/to-do-list"
        active={router.asPath === "/ssj/to-do-list"}
        label="Your to do list"
        icon="calendarCheck"
      />
      <NavLink
        variant="secondary"
        to="/ssj/milestones"
        active={router.asPath === "/ssj/milestones"}
        label="Milestones"
        icon="layer"
      />
      <NavLink
        variant="tertiary"
        to="/ssj/visioning"
        active={router.asPath === "/ssj/visioning"}
        label="Visioning"
        icon={true}
      />
      <NavLink
        variant="tertiary"
        to="/ssj/planning"
        active={router.asPath === "/ssj/planning"}
        label="Planning"
        icon={true}
      />
      <NavLink
        variant="tertiary"
        to="/ssj/startup"
        active={router.asPath === "/ssj/startup"}
        label="Startup"
        icon={true}
      />
      <NavLink
        variant="secondary"
        to="/ssj/resources"
        active={router.asPath === "/ssj/resources"}
        label="Resources"
        icon="fileBlank"
      />
    </Box>
  );
};
