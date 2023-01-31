import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CardActionArea } from "@mui/material";

import {
  Box,
  Grid,
  TextField,
  Select,
  MultiSelect,
  Button,
  Card,
  Typography,
  Stack,
  Switch,
  Checkbox,
} from "@ui";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ShareDecisionContent = ({ toggle }) => {
  const shareLink = "wildflowerplatform.com/d/a4b$sp";
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => [setLinkCopied(false)], 1000);
    return () => clearTimeout(timer);
  }, [linkCopied]);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="body1">
              Awesome! Share this link with someone you trust.
            </Typography>

            <CopyToClipboard text={shareLink}>
              <Card>
                <CardActionArea onClick={() => setLinkCopied(true)}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="body1">{shareLink}</Typography>
                    </Grid>
                    <Grid item>
                      {linkCopied ? (
                        <Stack direction="row" spacing={4} alignItems="center">
                          <div>Copied!</div>
                          <ContentCopyIcon />
                        </Stack>
                      ) : (
                        <ContentCopyIcon />
                      )}
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </CopyToClipboard>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShareDecisionContent;
