import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

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
  DatePicker,
} from "@ui";
import { Check, Close } from "@mui/icons-material";
import StakeholderStatusIndicator from "@components/StakeholderStatusIndicator";

const MakeDecisionContent = ({
  toggle,
  stakeholders,
  pendingAdvice,
  hasObjections,
  noObjection,
  isValidDecision,
  isValidating,
  isDeciding,
  isSuccess,
  handleValidate,
  handleDecide,
}) => {
  const [whyDecisionMade, setWhyDecisionMade] = useState("");
  const handleWhyDecisionMadeChange = (event) => {
    setWhyDecisionMade(event.target.value);
  };
  const [decisionChanges, setDecisionChanges] = useState("");
  const handleDecisionChangesChange = (event) => {
    setDecisionChanges(event.target.value);
  };
  const [authorRole, setAuthorRole] = useState("");
  const handleAuthorRoleChange = (event) => {
    setAuthorRole(event.target.value);
  };
  const [hasAuthority, setHasAuthority] = useState(false);
  const handleHasAuthorityChange = (event) => {
    setHasAuthority(true);
  };

  return (
    <div>
      <form>
        {isValidating ? (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body1">
                {pendingAdvice
                  ? "Oops! You haven't received advice from everyone. Make sure you can really make your decision without hearing from all of your advice givers."
                  : hasObjections
                  ? "Hm, looks like your decision has objections! This is an important learning opportunity within the advice process. Follow up with those who object to see how you can make a better decision."
                  : noObjection &&
                    "Excellent! You’ve received advice from everyone. Next, carefully consider what everyone has to say and make your decision."}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {stakeholders.map((s, i) => (
                <StakeholderStatusIndicator stakeholder={s} />
              ))}
            </Grid>
            <Grid item xs={12}>
              {isValidDecision ? (
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Button variant="outlined" fullWidth onClick={toggle}>
                      I'm still thinking
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* WIL-132 */}
                    <Button fullWidth onClick={handleValidate}>
                      Make your decision
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Button fullWidth onClick={toggle}>
                      Wait for feedback
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        ) : isDeciding ? (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  Summarize why you made the decision you did. Your advice
                  givers will be notified of your decision.
                </Typography>
                <TextField
                  fullWidth
                  label="I made this decision because..."
                  placeholder="Type something..."
                  value={whyDecisionMade}
                  onChange={handleWhyDecisionMadeChange}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  Were there any changes to your decision along the way?
                </Typography>
                <TextField
                  fullWidth
                  label="There were changes to my decision such as..."
                  placeholder="Type something..."
                  value={decisionChanges}
                  onChange={handleDecisionChangesChange}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  In what role are you making this decision?
                </Typography>
                <TextField
                  fullWidth
                  label="Your role"
                  placeholder="e.g. Teacher Leader, Finance Lead, etc."
                  value={authorRole}
                  onChange={handleAuthorRoleChange}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  Consider whether you have the authority in your role to decide
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasAuthority}
                      onChange={handleHasAuthorityChange}
                    />
                  }
                  label="I believe I have the authority to decide"
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" fullWidth onClick={toggle}>
                    Decide not to proceed
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth onClick={handleDecide}>
                    Decide to proceed
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          isSuccess && (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Card>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                      <Typography variant="h6">
                        Great work, you made a decision!
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth onClick={toggle}>
                  Done
                </Button>
              </Grid>
            </Grid>
          )
        )}
      </form>
    </div>
  );
};

export default MakeDecisionContent;
