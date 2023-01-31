import { useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";

import { user } from "../lib/utils/fake-data";
import { theme } from "../styles/theme";
import { Card, Typography, Stack, Grid, Link, Box, NavLink } from "./ui/index";
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
              <Link href="mailto:tech-pilot@wildflowerschools.org?subject=Directory">
                <Card variant="lightened" size="small" hoverable>
                  <Stack spacing={1}>
                    <Typography variant="bodyRegular" bold highlight>
                      We want to hear from you!
                    </Typography>
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
        to="/ssj"
        active={router.pathname === "/ssj"}
        label="School Startup Journey"
        icon="bus"
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
  return (
    <Box>
      <NavLink
        secondary
        to="/ssj/view-all"
        active={router.pathname.includes("/ssj/view-all")}
        label="View all"
        icon={true}
      />
      <NavLink
        secondary
        to="/ssj/visioning"
        active={router.pathname.includes("/ssj/visioning")}
        label="Visioning"
        icon={true}
      />
      <NavLink
        secondary
        to="/ssj/planning"
        active={router.pathname.includes("/ssj/planning")}
        label="Planning"
        icon={true}
      />
      <NavLink
        secondary
        to="/ssj/startup"
        active={router.pathname.includes("/ssj/startup")}
        label="Startup"
        icon={true}
      />
    </Box>
  );
};
