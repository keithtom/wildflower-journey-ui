import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "../lib/useUserContext";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { H } from "highlight.run";
import { ErrorBoundary } from "@highlight-run/react";

import AppBar from "../components/AppBar";

if (process.env.NODE_ENV === "production") {
  console.log("enabling highlight.io", process.env);
  H.init(process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID, {
    environment: process.env.APP_ENV,
    enableStrictPrivacy: false,
    tracingOrigins: ["api2.wildflowerschools.org"],
    networkRecording: {
      enabled: true,
      recordHeadersAndBody: true,
      urlBlocklist: [
        // insert full or partial urls that you don't want to record here
      ],
    },
  });
}

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, color: "#00A69C" });

    Router.events.on("routeChangeStart", (url) => {
      // setIsLoading(true);
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", (url) => {
      // setIsLoading(false);
      NProgress.done(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);
  return (
    <ErrorBoundary>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <AppBar />
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
