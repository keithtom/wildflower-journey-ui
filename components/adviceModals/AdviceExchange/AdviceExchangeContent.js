import { useState, useEffect } from "react";

import {
  Avatar,
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
} from "@ui";
import UserContactInfo from "@components/UserContactInfo";
import StakeholderStatusIndicator from "@components/StakeholderStatusIndicator";

const AdviceExchangeContent = ({ toggle, stakeholder, decision }) => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Stack>
            <UserContactInfo user={stakeholder} />
            <StakeholderStatusIndicator stakeholder={stakeholder} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              height: "240px",
              backgroundColor: "#fafafa",
              padding: "20px",
              overflowY: "scroll",
            }}
          >
            <AdviceMessage
              content={decision.attributes.lastActivity.data.attributes.content}
              poster={decision.attributes.lastActivity.data.attributes.person}
              postedTime={
                decision.attributes.lastActivity.data.attributes.updatedAt
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <MessageComposer />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdviceExchangeContent;

const AdviceMessage = ({ content, poster, postedTime }) => {
  return (
    <Stack>
      <Stack direction="row" spacing={4}>
        <Avatar src={poster.profileImage} />
        <Typography variant="body1">{poster.name}</Typography>
        <Typography variant="body1">Posted at {postedTime}</Typography>
      </Stack>
      <Card>
        <Typography variant="body1">{content}</Typography>
      </Card>
    </Stack>
  );
};

const MessageComposer = ({}) => {
  const [message, setMessage] = useState("");
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAddNote = () => {
    // send the note data to the backend
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          label="A note to make about this advice"
          placeholder="Type a note..."
          value={message}
          onChange={handleMessageChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* WIL-131 */}
        <Button fullWidth onClick={handleAddNote}>
          Add note
        </Button>
      </Grid>
    </Grid>
  );
};
