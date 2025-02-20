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
import { useTranslation } from "next-i18next";

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

const Header = ({ title, toggleNavOpen }) => {
  const router = useRouter();
  const { screenSize } = getScreenSize();

  const { currentUser, isLoggedIn, isAdmin } = useUserContext();

  const showNetwork = !(
    currentUser?.personRoleList?.includes("Emerging Teacher Leader") &&
    !currentUser?.personRoleList?.includes("Teacher Leader")
  );

  // console.log({ currentUser });
  // console.log({ isAdmin });
  // console.log(process.env.APP_ENV);

  const { t } = useTranslation("common");

  const adminView = isAdmin && router.asPath.includes("/admin") ? true : false;

  return (
    <AppBar
      env={process.env.APP_ENV}
      isAdmin={adminView}
      sx={{
        marginTop: screenSize.isSm ? `${theme.util.appBarHeight}px` : 0,
        width: screenSize.isSm
          ? "100%"
          : `calc(100% - ${theme.util.drawerWidth}px)`,
        padding: 6,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography variant="bodyLarge" bold noWrap lightened={adminView}>
          {title}
        </Typography>
        {/* {adminView ? (
          <Typography variant="bodyLarge" light>
            Admin
          </Typography>
        ) : null} */}
      </Stack>
    </AppBar>
  );
};

export default Header;
