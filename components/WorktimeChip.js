import { Icon, Chip, Stack, Typography } from "./ui";

const WorktimeChip = ({ worktime, withIcon, ...props }) => {
  return (
    <Chip
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon type="time" size="small" />

            <Typography variant="bodyMini" bold>
              About {worktime} hours
            </Typography>
          </Stack>
        ) : (
          <Typography variant="bodyMini" bold>
            About {worktime} hours
          </Typography>
        )
      }
      {...props}
    />
  );
};

export default WorktimeChip;
