import { Icon, Chip, Stack, Typography } from "./ui";

const PhaseChip = ({ phase, withIcon, size, ...props }) => {
  // console.log("Phase chip props", phase, withIcon, size, props)
  return (
    <Chip
      size={size}
      icon={withIcon ? <Icon type="pieChart" size="small" /> : null}
      label={phase}
      {...props}
    />
  );
};

export default PhaseChip;
