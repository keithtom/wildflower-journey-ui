import { useEffect, useState, Component } from "react";
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
import { SWRConfig } from "swr";
import { withLDProvider } from "launchdarkly-react-client-sdk";
import Observability, { LDObserve } from "@launchdarkly/observability";
import SessionReplay from "@launchdarkly/session-replay";

// React Error Boundary
// Note: LaunchDarkly doesn't provide a built-in ErrorBoundary component like highlight.run did
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (typeof LDObserve !== "undefined" && LDObserve.recordError) {
      LDObserve.recordError(error, "React ErrorBoundary caught error", {
        componentStack: errorInfo?.componentStack,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Something went wrong</h2>
          <p>An error occurred. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
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

  // classify cancel/timeout cases
  const isAbortCancelError = (err) => {
    if (!err) return true;
    const name = err.name;
    const code = err.code;
    const message = (err.message || "").toLowerCase();
    // SWR/DOM aborts and axios cancels (not actionable)
    return (
      name === "AbortError" ||
      name === "CanceledError" ||
      code === "ERR_CANCELED" ||
      message.includes("cancel")
    );
  };

  const isHiddenTabTimeout = (err) => {
    const hidden =
      typeof document !== "undefined" && document.visibilityState === "hidden";
    if (!hidden) return false;
    const code = err.code;
    const message = (err.message || "").toLowerCase();
    // axios timeout while backgrounded
    return code === "ECONNABORTED" || message.includes("timeout");
  };

  const reportToLaunchDarkly = (err, key) => {
    if (!err) return;
    if (isAbortCancelError(err) || isHiddenTabTimeout(err)) return;

    // Report error to LaunchDarkly Observability
    if (typeof LDObserve !== "undefined" && LDObserve.recordError) {
      LDObserve.recordError(err, "SWR error", {
        swr_key: key,
      });
    }
  };

  return (
    <ErrorBoundary>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        httpEquiv="Content-Security-Policy"
        content="connect-src https://pub.observability.app.launchdarkly.com https://otel.observability.app.launchdarkly.com; worker-src data: blob:;"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SWRConfig
            value={{
              onError: (err, key) => {
                // AbortError is ignored;
                reportToLaunchDarkly(err, key);
              },

              // Only skip retries for cancels or hidden-tab timeouts
              shouldRetryOnError: (err) => {
                if (!err) return false;
                if (isAbortCancelError(err)) return false;
                if (isHiddenTabTimeout(err)) return false;
                return true; // keep SWR’s default behavior for all others
              },

              // Skip retry work for cancels or hidden-tab timeouts; otherwise backoff.
              onErrorRetry: (err, _key, _cfg, revalidate, ctx) => {
                if (!err) return;
                if (isAbortCancelError(err)) return; // do not retry cancels
                if (isHiddenTabTimeout(err)) return; // do not retry hidden-tab timeouts

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

// Configure LaunchDarkly plugins (only in production)
const getLaunchDarklyPlugins = () => {
  // Only enable observability in production, matching original highlight.run behavior
  if (process.env.NODE_ENV !== "production") {
    return [];
  }

  return [
    new Observability({
      tracingOrigins: ["api2.wildflowerschools.org"],
      networkRecording: {
        enabled: true,
        recordHeadersAndBody: true,
      },
      privacySetting: "default",
    }),
    new SessionReplay({
      privacySetting: "default",
    }),
  ];
};

// Only wrap with LaunchDarkly provider in production
// This prevents network errors in non-production environments
const isProduction = process.env.NODE_ENV === "production";
const clientSideID =
  process.env.NEXT_PUBLIC_LAUNCHDARKLY_OBSERVABILITY_CLIENT_ID;

// Conditionally wrap with LaunchDarkly provider only in production with valid client ID
const LDProvider =
  isProduction && clientSideID
    ? withLDProvider({
        clientSideID: clientSideID,
        options: {
          plugins: getLaunchDarklyPlugins(),
        },
      })(MyApp)
    : MyApp;

// Then wrap with translation HOC
export default appWithTranslation(LDProvider);
