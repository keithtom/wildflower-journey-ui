import adviceApi from "../../../api/advice"
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

const RequestAdviceContent = ({
  decisionId,
  toggle,
  hasContext,
  hasProposal,
  hasStakeholders,
  requestAgain,
}) => {
  const [decisionDifference, setDecisionDifference] = useState("");
  const handleDecicionDifferenceChange = (event) => {
    setDecisionDifference(event.target.value);
  };
  const [decideByDate, setDecideByDate] = useState(null);
  const handleDecideByDateChange = (event) => {
    setDecideByDate(event.target.value);
  };
  const [adviceByDate, setAdviceByDate] = useState(null);
  const handleAdviceByDateChange = (event) => {
    setAdviceByDate(event.target.value);
  };
  const [authorRole, setAuthorRole] = useState("");
  const handleAuthorRoleChange = (event) => {
    setAuthorRole(event.target.value);
  };
  const [hasAuthority, setHasAuthority] = useState(false);
  const handleHasAuthorityChange = (event) => {
    setHasAuthority(currentAuthority => !currentAuthority);
  };

  const isValid = hasContext && hasProposal && hasStakeholders;

  function handleRequestAdvice(){
    if (requestAgain) {
      adviceApi({id: decisionId}).amend({changesSummary: decisionDifference, decideByDate: decideByDate, adviceByDate: adviceByDate, role: authorRole}).then(
        (response) => {
          console.log(response);
          alert("amend success")
          const id = response.data.data.id;
          // redirect on success to opened advice.
      }, (error) => {
        console.log(error);
      });
    }
    else {
      adviceApi({id: decisionId}).open({decideByDate: decideByDate, adviceByDate: adviceByDate, role: authorRole}).then(
        (response) => {
          console.log(response);
          alert("open success")
          const id = response.data.data.id;
          // redirect on success to opened advice.
      }, (error) => {
        console.log(error);
      });
    }
  }

  return (
    <div>
      <form>
        {isValid ? (
          <Grid container spacing={4}>
            {requestAgain ? (
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="body1">
                    How is your decision different from before?
                  </Typography>
                  <TextField
                    fullWidth
                    label="My decision is different from before because..."
                    placeholder="I have incorporated feedback into my proposal..."
                    value={decisionDifference}
                    onChange={handleDecicionDifferenceChange}
                  />
                </Stack>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  When do you need to decide by?
                </Typography>
                <DatePicker
                  value={decideByDate}
                  onChange={handleDecideByDateChange}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  When do you need advice by?
                </Typography>
                <DatePicker
                  value={adviceByDate}
                  onChange={handleAdviceByDateChange}
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
                  placeholder="e.g. Finance, Governance & Compliance, Facilites, etc."
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
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* WIL-130 */}
                  <Button fullWidth disabled={!hasAuthority} onClick={handleRequestAdvice} href="/advice/people/2a09-fba2/decisions/open">
                    Request advice
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body1">
                It looks like you haven't included some of the important
                information that is needed to draft a decision. You need:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Stack direction="row" alignItems="center" spacing={4}>
                  {hasContext ? <Check /> : <Close />}
                  <Typography>Context</Typography>
                </Stack>
              </Card>
              <Card>
                <Stack direction="row" alignItems="center" spacing={4}>
                  {hasProposal ? <Check /> : <Close />}
                  <Typography>Proposal</Typography>
                </Stack>
              </Card>
              <Card>
                <Stack direction="row" alignItems="center" spacing={4}>
                  {hasStakeholders ? <Check /> : <Close />}
                  <Typography>Stakeholders</Typography>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Button fullWidth onClick={toggle}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </form>
    </div>
  );
};

export default RequestAdviceContent;
