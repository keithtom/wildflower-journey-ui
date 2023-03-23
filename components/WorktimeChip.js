import { Icon, Chip, Stack, Typography } from "./ui";

const WorktimeChip = ({ worktime, withIcon, ...props }) => {
  return (
    <Chip
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon type="time" size="small" />

            <Typography variant="bodyMini" bold>
              {worktime}
            </Typography>
          </Stack>
        ) : (
          <Typography variant="bodyMini" bold>
            {worktime}
          </Typography>
        )
      }
      {...props}
    />
  );
};

export default WorktimeChip;
