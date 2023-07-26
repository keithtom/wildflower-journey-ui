import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { styled, css } from "@mui/material/styles";
import { AppBar, IconButton, ListItem } from "@mui/material";
import Router from "next/router";
import { useUserContext } from "../lib/useUserContext";
import { clearLoggedInState } from "../lib/handleLogout";
import registrationsAPI from "../api/registrations";
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
  ${(props) =>
    props.env === "dev" &&
    css`
      background: red;
    `}
  ${(props) =>
    props.env === "STAGING" &&
    css`
      background: blue;
    `}
`;

const Header = ({ toggleNavOpen }) => {
  const isSm = useMediaQuery({ maxDeviceWidth: theme.breakpoints.values.sm });

  const { currentUser, isLoggedIn } = useUserContext();

  const logo = "/assets/images/wildflower-logo.png";

  const showNetwork = !currentUser?.attributes?.ssj;

  // console.log({ currentUser });
  // console.log(process.env.APP_ENV);

  return (
    <CustomAppBar env={process.env.APP_ENV}>
      <Grid
        container
        justifyContent={isLoggedIn ? "space-between" : "center"}
        alignItems="center"
      >
        <Grid item>
          {isSm && isLoggedIn ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleNavOpen}
              >
                <Icon type="menu" />
              </IconButton>
              <img src={logo} style={{ height: "24px" }} />
              <Typography variant="bodyRegular" bold noWrap>
                My Wildflower
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={3}>
              <img src={logo} style={{ height: "32px" }} />
              <Typography variant="bodyLarge" bold noWrap>
                My Wildflower
              </Typography>
            </Stack>
          )}
        </Grid>
        {isLoggedIn ? (
          <Grid item>
            <AvatarMenu
              myProfileLink={
                showNetwork ? `/network/people/${currentUser.id}` : null
              }
              avatarSrc={currentUser?.attributes?.imageUrl}
              userName={`${currentUser.attributes.firstName} ${currentUser.attributes.lastName}`}
            />
          </Grid>
        ) : null}
      </Grid>
    </CustomAppBar>
  );
};

export default Header;

const AvatarMenu = ({ avatarSrc, userName, myProfileLink }) => {
  const [profileNavOpen, setProfileNavOpen] = useState(false);
  const handleOpen = (event) => {
    setProfileNavOpen(event.currentTarget);
  };
  const handleClose = () => {
    setProfileNavOpen(null);
  };

  const open = Boolean(profileNavOpen);
  const id = open ? "profile-nav" : null;
  const { setCurrentUser } = useUserContext();

  const StyledOption = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== "hoverable",
  })`
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
    margin-top: ${({ theme }) => theme.util.buffer * 2}px;
    .MuiPopover-paper {
      width: 240px;
    }
  `;

  async function handleLogOut() {
    try {
      const res = await registrationsAPI.logout();
      console.log(res);
      clearLoggedInState({});
      setCurrentUser(null);
      Router.push("/logged-out");
    } catch (err) {
      if (err?.response?.status === 401) {
        clearLoggedInState({});
        setCurrentUser(null);
        Router.push("/logged-out");
      }
    }
  }

  return (
    <>
      <Avatar
        alt={userName}
        hoverable
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
          <Typography variant="bodyRegular" lightened>
            Signed in as {userName}
          </Typography>
        </StyledOption>
        {myProfileLink ? (
          <NavLink to={myProfileLink} label="My Profile" />
        ) : null}
        <NavLink to="/settings" label="Settings" />
        <StyledOption onClick={handleLogOut} hoverable>
          <Typography variant="bodyRegular">Sign out</Typography>
        </StyledOption>
      </StyledUserMenu>
    </>
  );
};
