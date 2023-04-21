import Head from "next/head";
import { useState } from "react";
import {
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Avatar,
  AvatarGroup,
  IconButton,
  Icon,
  Modal,
  DatePicker,
  TextField,
  Chip,
  Link,
  Radio,
  MultiSelect,
} from "@ui";
import ProfileHero from "@components/ProfileHero";
import UserProfileSummary from "@components/UserProfileSummary";
import SchoolResultItem from "@components/SchoolResultItem";
import EditUserProfile from "@components/EditUserProfile";
import { user } from "@lib/utils/fake-data";
const Person = ({}) => {
  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | Search</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta
          property="og:site_name"
          content="Wildflower Schools Directory"
          key="og_wf_site_name"
        />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta
          name="keywords"
          content="Wildflower, Schools, Directory, Montessori"
        />
        <meta
          property="og:title"
          content="Wildflower Schools Directory"
          key="og_wf_site_title"
        />
        <meta
          property="og:description"
          content="Wildflower Schools Directory"
          key="og_wf_site_description"
        />
      </Head>
      <PageContainer>
        <Stack spacing={6}>
          <ProfileHero
            profileImage={user.profileImage}
            name={`${user.firstName} ${user.lastName}`}
            action={<UserAction user={user} />}
          />

          <Grid container spacing={8}>
            <Grid item xs={12} sm={3}>
              <UserProfileSummary user={user} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Stack spacing={12}>
                <Stack spacing={3}>
                  <Typography variant="h4" bold>
                    About me
                  </Typography>
                  <Typography variant="bodyLarge">
                    Hi there! I decided to pursue being a teacher leader 3 years
                    ago when my son needed to sed ut perspiciatis unde omnis
                    iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo.{" "}
                  </Typography>
                </Stack>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4" bold>
                      Roles and responsibilities
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={3}>
                      <Typography variant="bodyLarge">
                        Finance + Bookkeeping
                      </Typography>
                      <Typography variant="bodyLarge">
                        Community + Outreach management
                      </Typography>
                      <Typography variant="bodyLarge">
                        Facility management
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4" bold>
                      Board member
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={3}>
                      <Card size="small">
                        <Stack spacing={3} direction="row" alignItems="center">
                          <Avatar size="sm" />
                          <Stack>
                            <Typography variant="bodyRegular" bold>
                              Aster Montessori
                            </Typography>
                            <Typography variant="bodySmall" lightened>
                              Cambridge, MA
                            </Typography>
                          </Stack>
                        </Stack>
                      </Card>
                      <Card size="small">
                        <Stack spacing={3} direction="row" alignItems="center">
                          <Avatar size="sm" />
                          <Stack>
                            <Typography variant="bodyRegular" bold>
                              Aster Montessori
                            </Typography>
                            <Typography variant="bodySmall" lightened>
                              Cambridge, MA
                            </Typography>
                          </Stack>
                        </Stack>
                      </Card>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </PageContainer>
    </>
  );
};

export default Person;

const UserAction = ({ user }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);
  return (
    <>
      <Button variant="outlined" onClick={() => setEditModalOpen(true)}>
        Edit profile
      </Button>
      <Modal open={editModalOpen} toggle={toggleEditModal} title="Edit Profile">
        <EditUserProfile user={user} toggle={toggleEditModal} />
      </Modal>
    </>
  );
};
