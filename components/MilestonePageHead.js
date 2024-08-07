import { Skeleton } from "@mui/material";
import { Typography, Stack } from "@ui";

import CategoryChip from "@components/CategoryChip";
import StatusChip from "@components/StatusChip";

const MilestonePageHead = ({
  isLoading,
  title,
  description,
  status,
  categories,
}) => {
  return (
    <>
      {isLoading ? (
        <Stack spacing={8}>
          <Skeleton height={64} width={320} m={0} />
          <Stack spacing={2}>
            <Skeleton height={24} m={0} />
            <Skeleton height={24} m={0} />
            <Skeleton height={24} m={0} />
          </Stack>
        </Stack>
      ) : (
        <>
          <Stack spacing={8}>
            <Typography variant="h2" bold capitalize>
              {title}
            </Typography>
            {description ? (
              <Typography variant="bodyLarge" lightened>
                {description}
              </Typography>
            ) : null}
            <Stack direction="row" spacing={6} alignItems="center">
              {status ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    STATUS
                  </Typography>
                  <StatusChip status={status} size="small" withIcon />
                </Stack>
              ) : null}
              {categories.length && false ? (
                <Stack spacing={2}>
                  <Typography variant="bodyMini" lightened bold>
                    CATEGORY
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {categories.map((m, i) => (
                      <CategoryChip
                        category={m}
                        size="small"
                        withIcon
                        key={i}
                      />
                    ))}
                  </Stack>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default MilestonePageHead;
