import { Grid, Typography, Stack, Card, Avatar } from "@ui";
import UserContactModal from "./UserContactModal";

const UserCard = ({
  firstName,
  lastName,
  email,
  phone,
  role,
  profileImage,
}) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  return (
    <>
      <Card
        variant="lightened"
        size="small"
        hoverable
        onClick={() => setContactModalOpen(true)}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar src={profileImage} />
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="bodyRegular" bold>
                {firstName} {lastName}
              </Typography>
              <Typography variant="bodySmall" lightened>
                {role}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <UserContactModal
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        open={contactModalOpen}
        toggle={() => setContactModalOpen(!contactModalOpen)}
      />
    </>
  );
};

export default UserCard;
