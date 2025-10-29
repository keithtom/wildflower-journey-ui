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
import { appWithTranslation } from "next-i18next";
import Layout from "../components/Layout";
import { H } from "highlight.run";
import { ErrorBoundary } from "@highlight-run/react";
import { SWRConfig } from "swr";

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
      networkBodyKeysToRedact: [
        // insert keys that you want to redact from network bodies here
        "user",
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
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);

  // ignore abort / cancel errors
  const isAbortLikeError = (err) => {
    if (!err) return true;
    const name = err.name;
    const code = err.code;
    const message = (err.message || "").toLowerCase();
    // SWR/dom aborts, Axios cancels, Axios timeouts in background tabs
    return (
      name === "AbortError" ||
      name === "CanceledError" ||
      code === "ERR_CANCELED" ||
      code === "ECONNABORTED" ||
      message === "canceled"
    );
  };

  const reportToHighlight = (err, key) => {
    if (!err) return;
    if (isAbortLikeError(err)) return;
    if (H.consumeError) H.consumeError(err, { tags: { swr_key: key } });
  };

  return (
    <ErrorBoundary>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SWRConfig
            value={{
              onError: (err, key) => {
                // AbortError is ignored;
                reportToHighlight(err, key);
              },

              // Only skip retries for AbortError.
              shouldRetryOnError: (err) => {
                if (!err) return false;
                if (isAbortLikeError(err)) return false;
                return true; // keep SWR’s default behavior for all others
              },

              // Skip retry work only for AbortError; otherwise backoff.
              onErrorRetry: (err, _key, _cfg, revalidate, ctx) => {
                if (!err) return;
                if (isAbortLikeError(err)) return; // do not retry aborts/cancels/timeouts

                const retries = ctx.retryCount || 0;
                if (retries >= 5) return;
                const delay = Math.min(1000 * Math.pow(2, retries), 30000);
                setTimeout(
                  () => revalidate({ retryCount: retries + 1 }),
                  delay
                );
              },
            }}
          >
            <UserProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </SWRConfig>
        </ThemeProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
