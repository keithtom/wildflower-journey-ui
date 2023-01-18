import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { styled, css } from "@mui/material/styles";
import { AppBar, IconButton, ListItem } from "@mui/material";
import Router from "next/router";
import axios from "axios";
import { getCookie, deleteCookie } from 'cookies-next';
import { useUserContext } from "../lib/useUserContext";

import { theme } from "../styles/theme";
import {
  Avatar,
  Typography,
  Stack,
  Grid,
  Popover,
  Icon,
  NavLink,
} from "./ui/index";

// const logoutRoute = `http://localhost:3001/logout`;
const logoutRoute = `https://api.wildflowerschools.org/logout`;
const token = getCookie('auth');
axios.defaults.headers.common['Authorization'] = token;

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

const Header = ({ toggleNavOpen, user }) => {
  const isSm = useMediaQuery({ maxDeviceWidth: theme.breakpoints.values.sm });
  const loggedIn = user; //this is static fake data

  const { currentUser, isLoggedIn } = useUserContext();
  console.log({ currentUser });
  console.log({ isLoggedIn });

  return (
    <CustomAppBar>
      <Grid
        container
        justifyContent={loggedIn ? "space-between" : "center"}
        alignItems="center"
      >
        <Grid item>
          {isSm && loggedIn ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleNavOpen}
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
        {loggedIn ? (
          <Grid item>
            <AvatarMenu
              avatarSrc={user.profileImage}
              userName={`${user.firstName} ${user.lastName}`}
            />
          </Grid>
        ) : null}
      </Grid>
    </CustomAppBar>
  );
};

export default Header;


const AvatarMenu = ({ avatarSrc, userName }) => {
  const [profileNavOpen, setProfileNavOpen] = useState(false);
  const handleOpen = (event) => {
    setProfileNavOpen(event.currentTarget);
  };
  const handleClose = () => {
    setProfileNavOpen(null);
  };

  const open = Boolean(profileNavOpen);
  const id = open ? "profile-nav" : null;

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

  const handleLogOut = () => {
    axios.delete(logoutRoute)  // TODO: set base url in some variable that switches out based on env
      .then((res) => {
        // TODO: update logged out state
          console.log("successfully logged out");
          delete axios.defaults.headers.common["Authorization"];
          deleteCookie("auth", {});
          Router.push("/logged-out");
      }).catch((err) => console.error(err));
  };

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
          horizontal: "right",
        }}
      >
        <StyledOption>
          <Typography highlight>Signed in as {userName}</Typography>
        </StyledOption>
        <NavLink secondary to="/user-profile" label="Your profile" />
        <NavLink secondary to="/school-profile" label="Your school" />
        <NavLink secondary to="/settings" label="Settings" />
        <StyledOption onClick={handleLogOut} hoverable>
          <Typography lightened>Sign out</Typography>
        </StyledOption>
      </StyledUserMenu>
    </>
  );
};
