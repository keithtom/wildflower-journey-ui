import { Icon, Chip, Stack, Typography } from "./ui";

const WorktimeChip = ({ worktime, withIcon, ...props }) => {
  return (
    <Chip
      icon={withIcon ? <Icon type="time" size="small" /> : null}
      label={worktime}
      {...props}
    />
  );
};

export default WorktimeChip;
