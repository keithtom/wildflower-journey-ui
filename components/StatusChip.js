import { Icon, Chip, Stack, Typography } from "./ui";

const StatusChip = ({ status, withIcon, ...props }) => {
  // console.log("Status chip props", status, withIcon, props)
  return (
    <Chip
      icon={
        withIcon ? (
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
                : (status === "to do" || status === "in progress") && "primary"
            }
            size="small"
          />
        ) : null
      }
      label={status}
      {...props}
    />
  );
};

export default StatusChip;
