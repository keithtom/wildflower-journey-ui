import { useState } from "react";
import { getCookie } from "cookies-next";
import ssjApi from "@api/ssj/ssj";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

import useAuth from "@lib/utils/useAuth";
import { PageContainer, Typography, Card, Stack, Icon, Grid, Chip } from "@ui";
import CategoryChip from "@components/CategoryChip";
import PhaseChip from "@components/PhaseChip";
import Resource from "@components/Resource";
import Hero from "@components/Hero";
import getAuthHeader from "@lib/getAuthHeader";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";

import useSSJResources from "@hooks/useSSJResources";

const Resources = () => {
  const router = useRouter();
  const { workflow } = router.query;

  const [showResourcesByCategory, setShowResourcesByCategory] = useState(true);
  const [showResourcesByPhase, setShowResourcesByPhase] = useState(false);

  const handleShowResourcesByCategory = () => {
    setShowResourcesByPhase(false);
    setShowResourcesByCategory(true);
  };
  const handleShowResourcesByPhase = (z) => {
    setShowResourcesByPhase(true);
    setShowResourcesByCategory(false);
  };

  const { resources, isLoading } = useSSJResources(workflow);
  // console.log({ resources });

  const hero = "/assets/images/ssj/wildflowerSystems.jpg";

  useAuth("/login");

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Hero imageUrl={hero} />
        <Stack spacing={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack spacing={6} direction="row" alignItems="center">
                <Icon type="fileBlank" variant="primary" size="large" />
                <Typography variant="h3" bold>
                  Resources
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
                  variant={showResourcesByCategory && "primary"}
                  onClick={handleShowResourcesByCategory}
                />
                <Chip
                  label="Phase"
                  variant={showResourcesByPhase && "primary"}
                  onClick={handleShowResourcesByPhase}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        {isLoading ? (
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
        ) : showResourcesByCategory ? (
          resources.by_category.map((a, i) => {
            const name = Object.keys(a)[0];
            const array = Object.values(a);
            return array[0]?.length ? (
              <Card key={i}>
                <Stack spacing={6}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <CategoryChip category={name} size="large" />
                    <Typography variant="h4" lightened>
                      {array[0].length}
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    {array[0].map((r, i) => (
                      <Resource
                        title={r.data.attributes.title}
                        link={r.data.attributes.link}
                        key={i}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ) : null;
          })
        ) : (
          resources.by_phase.map((a, i) => {
            const name = Object.keys(a)[0];
            const array = Object.values(a);
            return (
              <Card key={i}>
                <Stack spacing={6}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <PhaseChip phase={name} size="large" />
                    <Typography variant="h4" lightened>
                      {array[0].length}
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    {array[0].map((r, i) => (
                      <Resource
                        title={r.data.attributes.title}
                        link={r.data.attributes.link}
                        key={i}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            );
          })
        )}
      </Stack>
    </PageContainer>
  );
};

export default Resources;
