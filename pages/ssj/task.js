import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
} from "@ui";
import Task from "../../components/Task";
import Resource from "../../components/Resource";

const TaskPage = ({}) => {
  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href="/ssj/milestone">
              <IconButton>
                <Icon type="chevronLeft" />
              </IconButton>
            </Link>
            <Typography>Name your school</Typography>
          </Stack>
          <Task
            notNavigable
            title="Complete WF School Name Research Document"
          />
        </Stack>
        <Card>
          <Stack spacing={3}>
            <Typography variant="bodyLarge" bold>
              Resources
            </Typography>
            <Stack spacing={3}>
              <Resource title="School Name Research Document" link="/" />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
};

export default TaskPage;
