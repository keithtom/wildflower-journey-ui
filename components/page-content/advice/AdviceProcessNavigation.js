import { useRouter } from "next/router";

import { Card, Stack, Grid, Typography, Link, Box } from "../../ui";
import { MenuItem, ListItem, ListItemText } from "@mui/material";
import {
  Edit,
  QuestionAnswer,
  EmojiObjects,
  MenuBook,
} from "@mui/icons-material";

const AdviceProcessNavigation = () => {
  //Navigation needs to be aware of the user's id?
  const userId = "2a09-fba2";

  const router = useRouter();

  return (
    <Box sx={{ bgcolor: "neutral.light" }}>
      <Stack spacing={2}>
        <Stack>
          <Box sx={{ padding: 4 }}>
            <Typography variant="subtitle1">Seeking advice</Typography>
          </Box>
          <div>
            <NavLink
              to={`/advice/people/${userId}/decisions/draft`}
              secondary
              label="Your drafts"
              icon={<Edit fontSize="small" />}
              active={router.pathname.includes("/draft")}
            />
            <NavLink
              to={`/advice/people/${userId}/decisions/open`}
              secondary
              label="Your open advice"
              icon={<QuestionAnswer fontSize="small" />}
              active={router.pathname.includes("/open")}
            />
            <NavLink
              to={`/advice/people/${userId}/decisions/closed`}
              secondary
              label="Your closed advice"
              icon={<QuestionAnswer fontSize="small" />}
              active={router.pathname.includes("/closed")}
            />
          </div>
        </Stack>

        <Stack>
          <Box sx={{ padding: 4 }}>
            <Typography variant="subtitle1">Giving advice</Typography>
          </Box>
          <div>
            <NavLink
              to={`/advice/people/${userId}/decisions/stakeholder`}
              secondary
              label="As a stakeholder"
              icon={<MenuBook fontSize="small" />}
              active={router.pathname.includes("/stakeholder")}
            />
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AdviceProcessNavigation;

const NavLink = ({ to, icon, adornment, active, secondary, label }) => {
  const router = useRouter();
  return (
    <Link href={to} color="text.main" underline="none">
      <ListItem
        button
        selected={to === router.pathname}
        sx={
          active && secondary
            ? { bgcolor: "neutral.main" }
            : active && { bgcolor: "primary.main", color: "text.light" }
        }
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              {icon && (
                <Grid item xs="auto">
                  {icon}
                </Grid>
              )}
              <Grid item>
                <ListItemText primary={label} />
              </Grid>
            </Grid>
          </Grid>
          {adornment && <Grid item>{adornment}</Grid>}
        </Grid>
      </ListItem>
    </Link>
  );
};
