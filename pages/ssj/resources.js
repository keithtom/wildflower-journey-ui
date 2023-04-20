import { useState } from "react";
import { getCookie } from "cookies-next";

import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Grid,
  Chip,
  Avatar,
  Divider,
} from "@ui";
import CategoryChip from "../../components/CategoryChip";
import PhaseChip from "../../components/PhaseChip";
import Resource from "../../components/Resource";
import Hero from "../../components/Hero";
import setAuthHeader from "../../lib/setAuthHeader";
import axios from "axios";
import baseUrl from "@lib/utils/baseUrl";

const Resources = ({ dataResources }) => {
  const [showResourcesByCategory, setShowResourcesByCategory] = useState(true);
  const [showResourcesByPhase, setShowResourcesByPhase] = useState(false);

  const handleShowResourcesByCategory = () => {
    setShowResourcesByPhase(false);
    setShowResourcesByCategory(true);
  };
  const handleShowResourcesByPhase = () => {
    setShowResourcesByPhase(true);
    setShowResourcesByCategory(false);
  };

  const hero = "/assets/images/ssj/wildflowerSystems.jpg";

  // console.log({ dataResources });

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

        {showResourcesByCategory
          ? dataResources.by_category.map((a, i) => {
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
          : dataResources.by_phase.map((a, i) => {
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
            })}
      </Stack>
    </PageContainer>
  );
};

export default Resources;

export async function getServerSideProps({ req, res }) {
  const workflowId = getCookie("workflowId", { req, res });
  setAuthHeader({ req, res });
  const apiRouteResources = `${baseUrl}/v1/ssj/dashboard/resources?workflow_id=${workflowId}`;
  const responseResources = await axios.get(apiRouteResources);
  const dataResources = await responseResources.data;

  return {
    props: {
      dataResources,
    },
  };
}
