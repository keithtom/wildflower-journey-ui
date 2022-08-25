import { useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { styled, css } from "@mui/material/styles";
import { Drawer, AppBar, IconButton, ListItem } from "@mui/material";

import { theme } from "../styles/theme";
import { user } from "../lib/utils/fake-data";
import {
  Avatar,
  Card,
  Typography,
  Stack,
  Grid,
  Popover,
  Link,
  Icon,
  Box,
} from "./ui/index";

import AdviceProcessNavigation from "./page-content/advice/AdviceProcessNavigation";

const StyledNav = styled(Box)`
  display: flex;
`;
const CustomAppBar = styled(AppBar)`
  outline: 1px solid ${({ theme }) => theme.color.neutral.main};
  border: none;
  background: white;
  margin: 0;
  position: fixed;
  height: ${({ theme }) => theme.util.appBarHeight}px;
  z-index: 2;
  padding: 0 ${({ theme }) => theme.util.buffer * 4}px;
  justify-content: center;
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

const Nav = ({}) => {
  const [navOpen, setNavOpen] = useState(false);

  const router = useRouter();
  const isSm = useMediaQuery({ maxDeviceWidth: theme.breakpoints.values.sm });

  return (
    <StyledNav sx={{ display: "flex" }}>
      <CustomAppBar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {isSm ? (
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => setNavOpen(!navOpen)}
                >
                  <Icon type="menu" />
                </IconButton>
                <Typography variant="bodyRegular" bold noWrap>
                  Wildflower Platform
                </Typography>
              </Stack>
            ) : (
              <Typography variant="bodyLarge" bold noWrap>
                Wildflower Platform
              </Typography>
            )}
          </Grid>
          <Grid item>
            <AvatarMenu
              avatarSrc={user.profileImage}
              userName={`${user.firstName} ${user.lastName}`}
            />
          </Grid>
        </Grid>
      </CustomAppBar>

      <CustomDrawer
        variant={isSm ? `temporary` : `permanent`}
        anchor="left"
        open={navOpen}
        onClose={() => setNavOpen(!navOpen)}
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

const NavLink = ({ to, icon, active, secondary, label }) => {
  const CustomListItem = styled(ListItem)`
    padding: ${({ theme }) => theme.util.buffer * 4}px;
    &:hover {
      background: ${({ theme }) => theme.color.neutral.lightened};
    }

    //Active
    ${(props) =>
      props.active &&
      css`
        background: ${props.theme.color.neutral.lightened};
      `}

    //Secondary
    ${(props) =>
      props.secondary &&
      css`
        padding: ${props.theme.util.buffer * 2}px
          ${props.theme.util.buffer * 4}px;
        border-bottom: 1px solid ${props.theme.color.neutral.lightened};
      `}
  `;

  return (
    <Link href={to}>
      <CustomListItem button active={active} secondary={secondary}>
        <Grid container spacing={secondary ? 5 : 3} alignItems="center">
          {icon && (
            <Grid item>
              <Icon
                type={icon}
                variant={active ? "primary" : secondary && "transparent"}
                size={secondary && "small"}
              />
            </Grid>
          )}
          <Grid item>
            <Typography highlight={active} bold={!secondary}>
              {label}
            </Typography>
          </Grid>
        </Grid>
      </CustomListItem>
    </Link>
  );
};

const AvatarMenu = ({ avatarSrc, userName }) => {
  const [profileNavOpen, setProfileNavOpen] = useState(false);
  const handleOpen = (event) => {
    setProfileNavOpen(event.currentTarget);
  };
  const handleClose = () => {
    setProfileNavOpen(null);
  };

  const open = Boolean(profileNavOpen);
  const id = open ? "profile-nav" : undefined;

  const StyledOption = styled(ListItem)`
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral.lightened};
    &:last-child {
      border-bottom: none;
    }
    /* Hoverable */
    ${(props) =>
      props.hoverable &&
      css`
        &:hover {
          cursor: pointer;
          background: ${props.theme.color.neutral.lightened};
        }
      `}
  `;

  const StyledUserMenu = styled(Popover)`
    .MuiPopover-paper {
      width: 240px;
    }
  `;

  return (
    <>
      <Avatar
        size="sm"
        onClick={handleOpen}
        aria-describedby={id}
        src={avatarSrc}
      />

      <StyledUserMenu
        id={id}
        open={open}
        anchorEl={profileNavOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <StyledOption>
          <Typography highlight>Signed in as {userName}</Typography>
        </StyledOption>
        <NavLink secondary to="/user-profile" label="Your profile" />
        <NavLink secondary to="/school-profile" label="Your school" />
        <StyledOption onClick={undefined} hoverable>
          <Typography lightened>Sign out</Typography>
        </StyledOption>
      </StyledUserMenu>
    </>
  );
};

const Navigation = ({}) => {
  const router = useRouter();
  return (
    <Box>
      <NavLink
        to="/network"
        active={router.pathname.includes("/network")}
        label="Network"
        icon="bookReader"
      />
      <NavLink
        to="/ssj"
        active={router.pathname.includes("/ssj")}
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
        to="/ssj/categories"
        active={router.pathname.includes("/ssj/categories")}
        label="All categories"
        icon={true}
      />
      <NavLink
        secondary
        to="/ssj/discovery"
        active={router.pathname.includes("/ssj/discovery")}
        label="Discovery"
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
