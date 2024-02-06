import { useState } from "react";
import { getCookie } from "cookies-next";
import ssj_categories from "@lib/ssj/categories";
import processesApi from "@api/workflow/processes";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

import useAuth from "@lib/utils/useAuth";
import { PageContainer, Typography, Card, Stack, Icon, Grid, Chip } from "@ui";
import CategoryChip from "@components/CategoryChip";
import PhaseChip from "@components/PhaseChip";
import Milestone from "@components/Milestone";
import Hero from "@components/Hero";
import getAuthHeader from "@lib/getAuthHeader";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";

import useMilestones from "@hooks/useMilestones";

const Milestones = ({}) => {
  const hero = "/assets/images/ssj/wildflowerCollection.jpg";
  const router = useRouter();
  const { workflow, phase } = router.query;

  const [showMilestonesByCategory, setShowMilestonesByCategory] =
    useState(true);
  const [showMilestonesByPhase, setShowMilestonesByPhase] = useState(false);

  const handleShowMilestonesByCategory = () => {
    setShowMilestonesByCategory(true);
    setShowMilestonesByPhase(false);
  };
  const handleShowMilestonesByPhase = () => {
    setShowMilestonesByPhase(true);
    setShowMilestonesByCategory(false);
  };

  useAuth("/login");

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Hero imageUrl={hero} />
        <Stack spacing={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack spacing={6} direction="row" alignItems="center">
                <Icon type="layer" variant="primary" size="large" />
                <Typography variant="h3" bold>
                  Milestones
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="bodyRegular" lightened>
                  Group by
                </Typography>
                <Chip
                  label="Category"
                  variant={showMilestonesByCategory && "primary"}
                  onClick={handleShowMilestonesByCategory}
                />
                <Chip
                  label="Phase"
                  variant={showMilestonesByPhase && "primary"}
                  onClick={handleShowMilestonesByPhase}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        {showMilestonesByCategory ? (
          <MilestonesByCategory workflow={workflow} />
        ) : (
          showMilestonesByPhase && <MilestonesByPhase workflow={workflow} />
        )}
      </Stack>
    </PageContainer>
  );
};

export default Milestones;

const MilestonesByCategory = ({ workflow }) => {
  const { isLoadingMilestonesByCategory, milestonesByCategory } = useMilestones(
    workflow,
    { omit_include: true }
  );
  return isLoadingMilestonesByCategory ? (
    <Stack spacing={6}>
      {Array.from({ length: 12 }, (_, i) => (
        <Card key={i}>
          <Stack spacing={6}>
            <Skeleton width={240} height={48} />
            <Stack spacing={3}>
              {Array.from({ length: 16 }, (_, j) => (
                <Skeleton key={j} height={64} m={0} variant="rounded" />
              ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  ) : (
    milestonesByCategory?.map((a, i) =>
      a.milestones.length ? (
        <Card key={i}>
          <Stack spacing={6}>
            <Stack direction="row" spacing={6} alignItems="center">
              <CategoryChip category={a.category} size="large" />
              <Typography variant="h4" lightened>
                {a.milestones.length}
              </Typography>
            </Stack>
            <Stack spacing={3}>
              {a.milestones?.map((m, i) => (
                <Milestone
                  link={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                  key={i}
                  status={m.attributes.status}
                  description={m.attributes.description}
                  categories={m.attributes.categories}
                  hideCategoryChip
                  phase={m.attributes.phase}
                  title={m.attributes.title}
                  stepCount={m.attributes.stepsCount}
                />
              ))}
            </Stack>
          </Stack>
        </Card>
      ) : null
    )
  );
};
const MilestonesByPhase = ({ workflow }) => {
  const { isLoadingMilestonesByPhase, milestonesByPhase } =
    useMilestones(workflow);
  return isLoadingMilestonesByPhase ? (
    <Stack spacing={6}>
      {Array.from({ length: 12 }, (_, i) => (
        <Card key={i}>
          <Stack spacing={6}>
            <Skeleton width={240} height={48} />
            <Stack spacing={3}>
              {Array.from({ length: 16 }, (_, j) => (
                <Skeleton key={j} height={64} m={0} variant="rounded" />
              ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  ) : (
    milestonesByPhase?.map((m, i) => (
      <Card key={i}>
        <Stack spacing={6}>
          <Stack direction="row" spacing={6} alignItems="center">
            <PhaseChip phase={m.phase} size="large" />
            <Typography variant="h4" lightened>
              {m.milestones.length}
            </Typography>
          </Stack>
          <Stack spacing={3}>
            {m.milestones?.map((m, i) => (
              <Milestone
                link={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                key={i}
                status={m.attributes.status}
                description={m.attributes.description}
                categories={m.attributes.categories}
                title={m.attributes.title}
                stepCount={m.attributes.stepsCount}
              />
            ))}
          </Stack>
        </Stack>
      </Card>
    ))
  );
};
