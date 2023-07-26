import { Icon, Chip, Stack, Typography } from "./ui";

const StatusChip = ({ status, withIcon, ...props }) => {
  // console.log("Status chip props", status, withIcon, props)
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
                  ? "circle"
                  : status === "to do"
                  ? "rightArrowCircle"
                  : status === "in progress" && "rightArrowCircleSolid"
              }
              variant={
                status === "done"
                  ? "success"
                  : status === "up next"
                  ? "lightened"
                  : (status === "to do" || status === "in progress") &&
                    "primary"
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
