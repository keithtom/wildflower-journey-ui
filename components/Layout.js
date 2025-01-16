import { Box, styled } from "@mui/material";
import { useUserContext } from "../lib/useUserContext";
import Nav from "./Nav";

const MainContent = styled(Box)`
  flex-grow: 1;
  margin-left: ${({ hasNav, theme }) =>
    hasNav ? `${theme.util.drawerWidth}px` : 0};
  width: 100%;
`;

const Layout = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  return (
    <Box sx={{ display: "flex" }}>
      {isLoggedIn && <Nav />}
      <MainContent hasNav={isLoggedIn}>{children}</MainContent>
    </Box>
  );
};

export default Layout;
