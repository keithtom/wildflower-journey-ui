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
                  : status === "upnext"
                  ? "rightArrowCircle"
                  : status === "todo" && "circle"
              }
              variant={
                status === "done"
                  ? "success"
                  : status === "upnext"
                  ? "lightened"
                  : status === "todo" && "primary"
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
