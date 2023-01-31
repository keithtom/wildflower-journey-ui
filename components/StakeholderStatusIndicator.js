import {
  Grid,
  Card,
  Typography,
} from "@ui";
import { Check, Close } from "@mui/icons-material";

const StakeholderStatusIndicator = ({ stakeholder }) => {
  return (
    <Card>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="body1">{stakeholder.attributes.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {stakeholder.attributes.status}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default StakeholderStatusIndicator
