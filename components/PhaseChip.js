import { Icon, Chip, Stack, Typography } from "./ui";

const PhaseChip = ({ phase, withIcon, size, ...props }) => {
  console.log("Phase chip props", phase, withIcon, size, props)
  return (
    <Chip
      size={size}
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon type="pieChart" size="small" />

            <Typography
              capitalize
              variant={size === "large" ? "bodyLarge" : "bodyMini"}
              bold
            >
              {phase}
            </Typography>
          </Stack>
        ) : (
          <Typography
            capitalize
            variant={size === "large" ? "bodyLarge" : "bodyMini"}
            bold
          >
            {phase}
          </Typography>
        )
      }
      {...props}
    />
  );
};

export default PhaseChip;
