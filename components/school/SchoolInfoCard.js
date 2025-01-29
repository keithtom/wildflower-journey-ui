import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Card, Typography, Stack, Avatar, Grid } from "../ui";
import { theme } from "../../styles/theme";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.radius.md,
  padding: theme.spacing(1.5, 2),
  "&:hover": {
    backgroundColor: theme.color.neutral.lightened,
  },
}));

const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(2, 2),
  paddingBottom: theme.spacing(2),
}));

const InfoListItem = ({ label, value }) => (
  <ListItem disablePadding>
    <StyledListItemButton>
      <ListItemText
        primary={
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="bodyRegular" lightened>
                {label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="bodyRegular">{value}</Typography>
            </Grid>
          </Grid>
        }
      />
    </StyledListItemButton>
  </ListItem>
);

const TeamMemberItem = ({ name, role, imageUrl }) => (
  <ListItem disablePadding>
    <StyledListItemButton>
      <ListItemAvatar>
        <Avatar sx={{ height: 40, width: 40 }} src={imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="bodyRegular">{name}</Typography>}
        secondary={
          <Typography variant="bodyRegular" lightened>
            {role}
          </Typography>
        }
      />
    </StyledListItemButton>
  </ListItem>
);

const SchoolInfoCard = ({
  heroImage,
  phase,
  location,
  openDate,
  teamMembers,
}) => {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <img src={heroImage} style={{ width: "100%", borderRadius: 12 }} />

        <List>
          <StyledSubheader>
            <Typography variant="bodyLarge" bold>
              School Startup Journey
            </Typography>
          </StyledSubheader>
          <InfoListItem label="Phase" value={phase} />
          <InfoListItem label="Location" value={location} />
          <InfoListItem label="Open Date" value={openDate} />
        </List>

        <Divider sx={{ borderColor: theme.color.neutral.lightened }} />

        <List>
          <StyledSubheader>
            <Typography variant="bodyLarge" bold>
              Startup Team
            </Typography>
          </StyledSubheader>
          {teamMembers?.map((member, index) => (
            <TeamMemberItem
              key={index}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
            />
          ))}
        </List>
      </Stack>
    </Card>
  );
};

export default SchoolInfoCard;
