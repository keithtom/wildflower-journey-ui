import { useState } from "react";
import {
  Avatar,
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Chip,
  Modal,
  Grid,
} from "@ui";
import Task from "../../components/Task";

const MilestonePage = ({}) => {
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href="/ssj/discovery">
              <IconButton>
                <Icon type="chevronLeft" />
              </IconButton>
            </Link>
            <Typography>Discovery</Typography>
          </Stack>
          <Typography variant="h3" bold>
            Name Your School
          </Typography>
          <Stack direction="row" spacing={4} alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="bodyMini" lightened>
                CATEGORY
              </Typography>
              <Chip label="Finance" size="small" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="bodyMini" lightened>
                EFFORT
              </Typography>
              <Chip label="Large" size="small" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="bodyMini" lightened>
                ASSIGNEE
              </Typography>
              <Avatar size="mini" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="bodyMini" lightened>
                AUTHOR
              </Typography>
              <Chip label="You" size="small" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="bodyMini" lightened>
                STATUS
              </Typography>
              <Chip label="To Do" size="small" />
            </Stack>
          </Stack>
        </Stack>

        <Card>
          <Stack spacing={3}>
            <Task title="Complete WF School Name Research Document" />
            <Task title="Complete advice process on your Name Research Document" />
            <Task title="Email your name and research document to support@wildflowerschools.org to confirm name selection" />
          </Stack>
        </Card>
      </Stack>

      {completeModalOpen ? (
        <Modal
          title="Great work!"
          open={completeModalOpen}
          toggle={() => setCompleteModalOpen(!completeModalOpen)}
        >
          <Card variant="lightened" size="large">
            <Stack spacing={4} alignItems="center">
              <Stack direction="row" spacing={3} alignItems="center">
                <Icon type="flag" variant="primary" size="large" />
                <Typography variant="bodyLarge" bold highlight>
                  Milestone completed!
                </Typography>
              </Stack>
              <Typography variant="h2" bold>
                Name Your School
              </Typography>
              <Typography variant="bodyLarge" lightened center>
                You're making great progress!
              </Typography>
            </Stack>
          </Card>
        </Modal>
      ) : null}
    </PageContainer>
  );
};

export default MilestonePage;
