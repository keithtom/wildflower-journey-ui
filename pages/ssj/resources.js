import { useState } from "react";

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
import Resource from "../../components/Resource";
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

  // console.log({ data });
  // console.log({ processByCategory });
  console.log({ dataResources });
  // console.log({ dataAssignedSteps });
  // console.log(Object.keys(dataResources[0])[0]);

  return (
    <PageContainer>
      <Stack spacing={12}>
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

        {dataResources.map((a, i) => {
          const name = Object.keys(a)[0];
          const array = Object.values(a);
          return (
            <Card key={i}>
              <Stack spacing={6}>
                <Stack direction="row" spacing={6} alignItems="center">
                  <CategoryChip category={name} size="large" withIcon />
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
  const workflowId = "c502-4f84";
  const apiRouteResources = `${baseUrl}/v1/ssj/dashboard/resources?workflow_id=${workflowId}`;
  setAuthHeader({ req, res });
  const responseResources = await axios.get(apiRouteResources);
  const dataResources = await responseResources.data;

  return {
    props: {
      dataResources,
    },
  };
}
