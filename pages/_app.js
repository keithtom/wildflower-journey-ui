import { useState, React } from "react";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Card, Stack, Grid, Typography, TextField, Button } from "@ui";

function MyApp({ Component, pageProps }) {
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const [passwordValue, setPasswordValue] = useState("");

  const password = "techPilot";

  const handleChange = (e) => {
    setPasswordValue(e.target.value);
  };

  // console.log(passwordValue)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {passwordCorrect ? (
        <Component {...pageProps} />
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid item>
            <Card sx={{ width: "480px" }}>
              <Stack spacing={8} p={8}>
                <Typography variant="h2" sx={{ fontWeight: 600 }}>
                  Welcome to Wildflower Platform!
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  We're currently in a closed Beta, enter the password to
                  continue.
                </Typography>
                <Stack spacing={4}>
                  <TextField
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <Button
                    disabled={passwordValue === password ? false : true}
                    onClick={() => setPasswordCorrect(true)}
                  >
                    Enter
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}

export default MyApp;
