import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUserContext } from "../lib/useUserContext";
import { getCookie } from "cookies-next";
import Nav from "./Nav";

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasNav",
})(({ theme, hasNav }) => ({
  flexGrow: 1,
  marginLeft: hasNav ? `${theme.util.drawerWidth}px` : 0,
  minHeight: "100vh",
}));

const Layout = ({ children, showNav = true }) => {
  const { isLoggedIn } = useUserContext();

  // Only hide nav if there's definitely no token
  const shouldShowNav = isLoggedIn && showNav;

  return (
    <Box sx={{ display: "flex" }}>
      {shouldShowNav && <Nav />}
      <MainContent hasNav={shouldShowNav}>{children}</MainContent>
    </Box>
  );
};

export default Layout;
