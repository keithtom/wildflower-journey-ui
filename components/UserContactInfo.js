import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Grid,
  Stack,
  Typography,
  Paper,
  IconButton,
} from "@ui";
import { ContentCopy } from "@mui/icons-material";

const UserContactInfo = ({ user }) => {
  return (
    <Stack spacing={2}>
      {user.attributes.email ? (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            background: "#fafafa",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography>{user.attributes.email}</Typography>
            </Grid>
            <Grid item>
              <CopyToClipboard text={user.attributes.email}>
                <IconButton>
                  <ContentCopy />
                </IconButton>
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Paper>
      ) : null}

      {user.attributes.phone ? (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            background: "#fafafa",
          }}
        >
          <Typography>{user.attributes.phone}</Typography>
        </Paper>
      ) : null}
    </Stack>
  );
};

export default UserContactInfo
