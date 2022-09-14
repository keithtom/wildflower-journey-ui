import { Icon, Chip, Stack, Typography } from "@ui";

const EffortChip = ({ effort, withIcon, ...props }) => {
  return (
    <Chip
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon type="label" size="small" />

            <Typography capitalize variant="bodyMini" bold>
              {effort}
            </Typography>
          </Stack>
        ) : (
          <Typography capitalize variant="bodyMini" bold>
            {effort}
          </Typography>
        )
      }
      {...props}
    />
  );
};

export default EffortChip;
