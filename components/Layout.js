import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUserContext } from "../lib/useUserContext";
import { getCookie } from "cookies-next";
import { getScreenSize } from "../hooks/react-responsive";
import Nav from "./Nav";
import AppBar from "./AppBar";
import { Icon, Stack } from "@components/ui";
import { useRouter } from "next/router";
import { theme } from "../styles/theme";

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasNav",
})(({ theme, hasNav }) => ({
  flexGrow: 1,
  marginLeft: hasNav ? `${theme.util.drawerWidth}px` : 0,
  minHeight: "100vh",
  width: "100%",
}));

const Layout = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useUserContext();
  const { screenSize } = getScreenSize();

  const routesWithNoNav = [
    "/welcome",
    "/login",
    "/logged-out",
    "/reset-password",
  ];
  const showNav = !routesWithNoNav.some((route) =>
    router.pathname.startsWith(route)
  );

  const [navOpen, setNavOpen] = useState(false);
  // Only hide nav if there's definitely no token

  const logo = "/assets/images/wildflower-logo.png";

  // console.log({ showNav });
  // console.log({ navOpen });

  return (
    <Box sx={{ display: "flex" }}>
      {isLoggedIn && screenSize.isSm ? (
        <AppBar>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Icon type="menu" onClick={() => setNavOpen(!navOpen)} />
            <img src={logo} alt="Wildflower Logo" style={{ height: "32px" }} />
          </Stack>
        </AppBar>
      ) : null}

      {isLoggedIn && showNav && (
        <Nav toggleNavOpen={() => setNavOpen(!navOpen)} navOpen={navOpen} />
      )}
      <MainContent hasNav={isLoggedIn && !screenSize.isSm && showNav}>
        {children}
      </MainContent>
    </Box>
  );
};

export default Layout;
