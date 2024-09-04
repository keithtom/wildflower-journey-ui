import { useState } from "react";
import { Grid, Typography, Stack, Card, Avatar, Link } from "@ui";
import UserContactModal from "./UserContactModal";

const UserCard = ({
  firstName,
  lastName,
  email,
  phone,
  role,
  profileImage,
  link,
  subtitle,
}) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const handleOpenContactModal = () => {
    !link && setContactModalOpen(true);
  };
  return (
    <ConditionalLink link={link}>
      <Card
        variant="lightened"
        size="small"
        hoverable
        onClick={handleOpenContactModal}
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
              {subtitle && (
                <Typography variant="bodySmall" lightened>
                  {subtitle}
                </Typography>
              )}
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
    </ConditionalLink>
  );
};

export default UserCard;

const ConditionalLink = ({ children, link }) => {
  return link ? <Link href={link}>{children}</Link> : children;
};
