import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { styled, css } from "@mui/material/styles";
import { IconButton, ListItem } from "@mui/material";
import Router from "next/router";
import { useUserContext } from "../lib/useUserContext";
import { clearLoggedInState } from "../lib/handleLogout";
import registrationsAPI from "../api/registrations";
import { theme } from "../styles/theme";
import { useRouter } from "next/router";
import { getScreenSize } from "../hooks/react-responsive";

import {
  Avatar,
  Typography,
  Stack,
  Grid,
  Popover,
  Icon,
  NavLink,
} from "./ui/index";
import AppBar from "./AppBar";

const Header = ({ toggleNavOpen }) => {
  const router = useRouter();
  const { screenSize } = getScreenSize();

  const { currentUser, isLoggedIn, isAdmin } = useUserContext();

  const logo = "/assets/images/wildflower-logo.png";

  const showNetwork = !(
    currentUser?.personRoleList?.includes("Emerging Teacher Leader") &&
    !currentUser?.personRoleList?.includes("Teacher Leader")
  );

  // console.log({ currentUser });
  // console.log({ isAdmin });
  // console.log(process.env.APP_ENV);

  const adminView = isAdmin && router.asPath.includes("/admin") ? true : false;

  return (
    <AppBar env={process.env.APP_ENV} isAdmin={adminView}>
      <Grid
        container
        justifyContent={isLoggedIn ? "space-between" : "center"}
        alignItems="center"
      >
        <Grid item>
          {screenSize.isSm && isLoggedIn ? (
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
              <Typography variant="bodyRegular" bold noWrap light={adminView}>
                My Wildflower
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={3}>
              <img src={logo} style={{ height: "32px" }} />
              <Typography variant="bodyLarge" bold noWrap lightened={adminView}>
                My Wildflower
              </Typography>
              {adminView ? (
                <Typography variant="bodyLarge" light>
                  Admin
                </Typography>
              ) : null}
            </Stack>
          )}
        </Grid>
        {isLoggedIn ? (
          <Grid item>
            <AvatarMenu
              disabled={router.pathname.includes("/welcome")}
              showNetwork={showNetwork}
              myProfileLink={
                showNetwork ? `/network/people/${currentUser.id}` : null
              }
              avatarSrc={currentUser?.attributes?.imageUrl}
              userName={`${currentUser.attributes.firstName} ${currentUser.attributes.lastName}`}
            />
          </Grid>
        ) : null}
      </Grid>
    </AppBar>
  );
};

export default Header;

const AvatarMenu = ({
  avatarSrc,
  userName,
  myProfileLink,
  showNetwork,
  disabled,
}) => {
  const router = useRouter();

  const [profileNavOpen, setProfileNavOpen] = useState(false);
  const handleOpen = (event) => {
    setProfileNavOpen(event.currentTarget);
  };
  const handleClose = () => {
    setProfileNavOpen(null);
  };

  const open = Boolean(profileNavOpen);
  const id = open ? "profile-nav" : null;
  const { setCurrentUser, isAdmin } = useUserContext();

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
    } catch (err) {
      if (err?.response?.status !== 401) {
        console.error("Error logging out:", err);
      }
    } finally {
      router.push("/logged-out");
      clearLoggedInState({});
      setCurrentUser(null);
    }
  }

  return (
    <>
      <Avatar
        alt={userName}
        id="headerAvatarIcon"
        hoverable
        size="sm"
        onClick={handleOpen}
        aria-describedby={id}
        src={avatarSrc}
        sx={{ pointerEvents: disabled ? "none" : "auto" }}
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

        {isAdmin ? (
          <>
            <NavLink to="/network" label="Home" />
            <NavLink to="/admin" label="Admin" />
          </>
        ) : null}
        {/* {showNetwork ? null : <NavLink to="/settings" label="Settings" />} */}
        <StyledOption onClick={handleLogOut} hoverable>
          <Typography variant="bodyRegular">Sign out</Typography>
        </StyledOption>
      </StyledUserMenu>
    </>
  );
};
