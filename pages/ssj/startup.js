import { PageContainer, Typography, Card, Stack, Icon } from "@ui";
import Milestone from "../../components/Milestone";

const DiscoveryPage = ({}) => {
  return (
    <PageContainer>
      <Stack spacing={12}>
        <Typography variant="h3" bold>
          Startup
        </Typography>

        <Card>
          <Stack spacing={6}>
            <Stack direction="row" spacing={2}>
              <Icon type="flag" variant="primary" />
              <Typography variant="bodyLarge" bold>
                To do
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <Milestone
                title="Name your school"
                effort="small"
                category="Governance & Compliance"
              />
              <Milestone
                title="Name your school"
                effort="small"
                category="Governance & Compliance"
              />
              <Milestone
                title="Name your school"
                effort="small"
                category="Governance & Compliance"
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="bodyLarge" bold>
                Up next
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <Milestone
                isUpNext
                title="Name your school"
                effort="small"
                category="Governance & Compliance"
              />
              <Milestone
                isUpNext
                title="Name your school"
                effort="small"
                category="Governance & Compliance"
              />
              <Milestone
                isUpNext
                title="Name your school"
                effort="small"
                category="Governance & Compliance"
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
};

export default DiscoveryPage;
