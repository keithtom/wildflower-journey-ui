import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUserContext } from "../lib/useUserContext";
import { getCookie } from "cookies-next";
import { getScreenSize } from "../hooks/react-responsive";
import Nav from "./Nav";
import AppBar from "./AppBar";
import { Icon, Stack } from "@components/ui";

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasNav",
})(({ theme, hasNav }) => ({
  flexGrow: 1,
  marginLeft: hasNav ? `${theme.util.drawerWidth}px` : 0,
  minHeight: "100vh",
}));

const Layout = ({ children, showNav = true }) => {
  const { isLoggedIn } = useUserContext();
  const { screenSize } = getScreenSize();

  const [navOpen, setNavOpen] = useState(false);
  // Only hide nav if there's definitely no token
  const shouldShowNav = isLoggedIn && showNav;

  const logo = "/assets/images/wildflower-logo.png";

  console.log({ navOpen });

  return (
    <Box sx={{ display: "flex" }}>
      {shouldShowNav && screenSize.isSm ? (
        <AppBar>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Icon type="menu" onClick={() => setNavOpen(!navOpen)} />
            <img src={logo} alt="Wildflower Logo" style={{ height: "32px" }} />
          </Stack>
        </AppBar>
      ) : null}

      {shouldShowNav && (
        <Nav toggleNavOpen={() => setNavOpen(!navOpen)} navOpen={navOpen} />
      )}
      <MainContent hasNav={shouldShowNav && !screenSize.isSm}>
        {children}
      </MainContent>
    </Box>
  );
};

export default Layout;
