import { Icon, Chip, Stack, Typography } from "./ui";

const StatusChip = ({ status, withIcon, ...props }) => {
  return (
    <Chip
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon
              type={
                status === "done"
                  ? "checkCircle"
                  : status === "up next"
                  ? "rightArrowCircle"
                  : status === "to do" && "circle"
              }
              variant={
                status === "done"
                  ? "success"
                  : status === "up next"
                  ? "lightened"
                  : status === "to do" && "primary"
              }
              size="small"
            />

            <Typography capitalize variant="bodyMini" bold>
              {status}
            </Typography>
          </Stack>
        ) : (
          <Typography capitalize variant="bodyMini" bold>
            {status}
          </Typography>
        )
      }
      {...props}
    />
  );
};

export default StatusChip;
