import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
console.log();
import { UserProvider } from "../lib/useUserContext";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { H } from "highlight.run";
import { ErrorBoundary } from "@highlight-run/react";

if (process.env.NODE_ENV === "production") {
  console.log("enabling highlight.io", process.env);
  H.init(process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID, {
    environment: process.env.APP_ENV,
    enableStrictPrivacy: false,
    tracingOrigins: true,
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
