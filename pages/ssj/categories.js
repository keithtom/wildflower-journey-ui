import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Chip,
} from "@ui";
import Milestone from "../../components/Milestone";

const DiscoveryPage = ({}) => {
  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href="/ssj">
              <IconButton>
                <Icon type="chevronLeft" />
              </IconButton>
            </Link>
            <Typography>Dashboard</Typography>
          </Stack>
          <Typography variant="h3" bold>
            All categories
          </Typography>
        </Stack>

        <Card>
          <Stack spacing={6}>
            <Stack direction="row" spacing={2}>
              <Chip label="Finance" size="large" />
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
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
};

export default DiscoveryPage;
