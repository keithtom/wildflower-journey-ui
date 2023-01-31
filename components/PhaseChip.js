import { Icon, Chip, Stack, Typography } from "./ui";

const PhaseChip = ({ phase, withIcon, ...props }) => {
  return (
    <Chip
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon type="pieChart" size="small" />

            <Typography capitalize variant="bodyMini" bold>
              {phase}
            </Typography>
          </Stack>
        ) : (
          <Typography capitalize variant="bodyMini" bold>
            {phase}
          </Typography>
        )
      }
      {...props}
    />
  );
};

export default PhaseChip;
