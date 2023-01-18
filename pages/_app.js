import { useEffect } from "react";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider, useUserContext } from "../lib/useUserContext";

function AppWrapper(props) {
  const { currentUser, setCurrentUser } = useUserContext();
  useEffect(() => {
    props.currentUser && setCurrentUser(props.currentUser);
  }, [currentUser]);

  return <>{props.children}</>;
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <AppWrapper {...pageProps}>
          <Component {...pageProps} />
        </AppWrapper>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
