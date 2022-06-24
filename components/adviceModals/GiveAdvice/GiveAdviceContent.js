import { useState, useEffect } from "react";

import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  InputAdornment,
  Link,
} from "@mui/material";
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
  Divider,
  Radio,
} from "@ui";
import UserContactInfo from "@components/UserContactInfo";

import { user } from "../../../lib/utils/fake-data";

const GiveAdviceContent = ({
  toggle,
  adviceSeeker,
  decision,
  isTextStep,
  isMultipleChoiceStep,
  isObjectionStep,
  isSuccess,
  handleSubmitText,
  handleSubmitMultipleChoice,
  handleSubmitObjectionStep,
  adviceGiverPosition,
  handleAdviceGiverPositionChange,
}) => {
  const [feedbackText, setFeedbackText] = useState("");
  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };
  const [impededPosition, setImpededPosition] = useState("");
  const handleImpededPositionChange = (event) => {
    setImpededPosition(event.target.value);
  };
  const [harmedPosition, setHarmedPosition] = useState("");
  const handleHarmedPositionChange = (event) => {
    setHarmedPosition(event.target.value);
  };
  const [hardToReversePosition, setHardToReversePosition] = useState("");
  const handleHardToReversePositionChange = (event) => {
    setHardToReversePosition(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={4}>
        {!isSuccess && (
          <>
            <Grid item xs={12}>
              <Stack>
                <UserContactInfo user={user} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          {isTextStep ? (
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Stack spacing={4}>
                  <Typography variant="body1">
                    If you were in the advice seeker's shoes, what would you do?
                  </Typography>
                  <TextField
                    fullWidth
                    label="Your suggestions and reactions"
                    placeholder="Share your suggestions and reactions here..."
                    value={feedbackText}
                    onChange={handleFeedbackTextChange}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={toggle} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={handleSubmitText}>
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : isMultipleChoiceStep ? (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Stack spacing={4}>
                  <Typography variant="body1">
                    What do you think of this decision?
                  </Typography>

                  <RadioGroup
                    value={adviceGiverPosition}
                    onChange={handleAdviceGiverPositionChange}
                  >
                    <FormControlLabel
                      value="no objection"
                      control={<Radio />}
                      label="I do not object to this decision"
                    />
                    <FormControlLabel
                      value="objection"
                      control={<Radio />}
                      label="I object to this decision"
                    />
                    <FormControlLabel
                      value="no opinion"
                      control={<Radio />}
                      label="I have no opinion on this decision"
                    />
                    <FormControlLabel
                      value="no time"
                      control={<Radio />}
                      label="I have no time to be a stakeholder"
                    />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={toggle} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={handleSubmitMultipleChoice}>
                      Give advice
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : isObjectionStep ? (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Stack spacing={4}>
                  <Typography variant="body1">
                    Does this decision impede your ability to carry out your
                    role?
                  </Typography>

                  <RadioGroup
                    value={impededPosition}
                    onChange={handleImpededPositionChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value="not sure"
                      control={<Radio />}
                      label="I'm not sure"
                    />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={4}>
                  <Typography variant="body1">
                    Do you believe this decision will do harm?
                  </Typography>

                  <RadioGroup
                    value={harmedPosition}
                    onChange={handleHarmedPositionChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value="not sure"
                      control={<Radio />}
                      label="I'm not sure"
                    />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={4}>
                  <Typography variant="body1">
                    Is the harm hard to reverse?
                  </Typography>

                  <RadioGroup
                    value={hardToReversePosition}
                    onChange={handleHardToReversePositionChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value="not sure"
                      control={<Radio />}
                      label="I'm not sure"
                    />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={toggle} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={handleSubmitObjectionStep}>
                      Give advice
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
        </Grid>
      </Grid>
    </div>
  );
};

export default GiveAdviceContent;
