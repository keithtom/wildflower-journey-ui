import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "next-i18next";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  ListItemAvatar,
  Divider,
  Popover,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Button,
  Card,
  Typography,
  Stack,
  Avatar,
  Grid,
  Icon,
  Box,
  Link,
  Chip,
  IconButton,
  Modal,
  TextField,
} from "../ui";
import { theme } from "../../styles/theme";
import { useState } from "react";
import { useRouter } from "next/router";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.radius.md,
  padding: theme.spacing(1.5, 2),
  "&:hover": {
    backgroundColor: theme.color.neutral.lightened,
  },
}));

const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(2, 2),
  paddingBottom: theme.spacing(2),
}));
const ContactPopover = styled(Popover)`
  .MuiPaper-root {
    margin-top: ${({ theme }) => theme.spacing(1)};
    box-shadow: ${({ theme }) => theme.shadow.small.lightened};
    border-radius: ${({ theme }) => theme.radius.lg}px;
    border: ${({ theme }) => theme.util.borderWidth} solid
      ${({ theme }) => theme.color.neutral.main};
    background: ${({ theme }) => theme.color.neutral.light};
  }
`;

const InfoListItem = ({ label, value }) => (
  <ListItem disablePadding>
    <ListItemText
      sx={{ padding: theme.spacing(1.5, 2) }}
      primary={
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="bodyRegular" lightened>
              {label}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="bodyRegular">{value}</Typography>
          </Grid>
        </Grid>
      }
    />
  </ListItem>
);

const TeamMemberItem = ({ member }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mousePosition, setMousePosition] = useState({
    mouseX: 0,
    mouseY: 0,
  });
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setMousePosition({
      mouseX: event.clientX,
      mouseY: event.clientY,
    });
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleMouseMove = (event) => {
    if (open) {
      setMousePosition({
        mouseX: event.clientX,
        mouseY: event.clientY,
      });
    }
  };

  const handleClick = () => {
    router.push(`/network/people/${member.id}`);
  };

  return (
    <ListItem disablePadding>
      <StyledListItemButton
        onClick={handleClick}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onMouseMove={handleMouseMove}
      >
        <ListItemAvatar>
          <Avatar
            sx={{ height: 40, width: 40 }}
            src={member.attributes.imageUrl}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="bodyRegular">
              {member.attributes.name}
            </Typography>
          }
          secondary={
            <Typography variant="bodyRegular" lightened>
              {member.attributes.roleList?.join(", ")}
            </Typography>
          }
        />
      </StyledListItemButton>
      <ContactPopover
        sx={{
          pointerEvents: "none",
          borderRadius: `${theme.radius.lg}px`,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: mousePosition.mouseY,
          left: mousePosition.mouseX,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        marginThreshold={16}
      >
        <List>
          {member.attributes.email && (
            <ListItem>
              <ListItemText>
                <Typography variant="bodyRegular">
                  {member.attributes.email}
                </Typography>
              </ListItemText>
            </ListItem>
          )}
          {member.attributes.phone && (
            <ListItem>
              <ListItemText>
                <Typography variant="bodyRegular">
                  {member.attributes.phone}
                </Typography>
              </ListItemText>
            </ListItem>
          )}
        </List>
      </ContactPopover>
    </ListItem>
  );
};

const SchoolInfoCard = ({
  heroImage,
  phase,
  location,
  openDate,
  teamMembers,
  status,
  schoolName,
  openedOn,
  schoolId,
  logoImage,
}) => {
  const [openTeamMemberModal, setOpenTeamMemberModal] = useState(false);

  const handleOpenTeamMemberModal = () => {
    setOpenTeamMemberModal(true);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            width: "100%",
            height: "240px",
            borderRadius: theme.radius.sm,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={heroImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {status === "Open" ? (
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                width: "100px",
                height: "100px",
                zIndex: 10,
                borderRadius: theme.radius.sm,
                overflow: "hidden",
              }}
            >
              <img
                src={logoImage}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ) : null}
        </Box>

        <List>
          <StyledSubheader>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Typography variant="bodyLarge" bold>
                {status === "Open" ? schoolName : "School Startup Journey"}
              </Typography>
              {status === "Open" ? (
                <Link href={`/network/schools/${schoolId}`}>
                  <Chip
                    label="Update profile"
                    size="small"
                    variant="lightened"
                    sx={{ cursor: "pointer" }}
                  />
                </Link>
              ) : null}
            </Stack>
          </StyledSubheader>
          {!phase ? null : <InfoListItem label="Phase" value={phase} />}
          {!location ? null : (
            <InfoListItem label="Location" value={location} />
          )}
          {!openDate ? null : (
            <InfoListItem label="Open Date" value={openDate} />
          )}
          {!openedOn ? null : (
            <InfoListItem
              label="Opened On"
              value={new Date(openedOn).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            />
          )}
        </List>

        <Divider sx={{ borderColor: theme.color.neutral.lightened }} />

        <List>
          <StyledSubheader>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="bodyLarge" bold>
                {status === "Open" ? "Open School Team" : "Startup Team"}
              </Typography>
              {status === "Open" ? null : (
                <IconButton onClick={handleOpenTeamMemberModal}>
                  <Icon type="plus" variant="primary" />
                </IconButton>
              )}
            </Stack>
          </StyledSubheader>
          {teamMembers?.map((member, index) => (
            <TeamMemberItem key={index} member={member} />
          ))}
        </List>
      </Stack>
      {openTeamMemberModal ? (
        <TeamMemberModal
          toggle={() => setOpenTeamMemberModal(!openTeamMemberModal)}
          open={openTeamMemberModal}
        />
      ) : null}
    </Card>
  );
};

export default SchoolInfoCard;

const TeamMemberModal = ({ toggle, open }) => {
  const { t } = useTranslation("common");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      partnerFirstName: "",
      partnerLastName: "",
      partnerEmail: "",
    },
  });

  const router = useRouter();
  // console.log({ errors });

  async function onSubmit(data) {
    try {
      const response = await teamsApi.invitePartner(team?.data?.data?.id, data);
      if (response.status === 200) {
        setSubmittedPartnerRequest(true);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        clearLoggedInState({});
        router.push("/login");
      } else {
        console.error(err);
      }
    }
  }
  return (
    <Modal toggle={toggle} title="Add Team Member" open={open}>
      <Stack spacing={3}>
        <Card variant="primaryLightened">
          <Stack alignItems="center" justifyContent="center" spacing={3}>
            <Typography variant="h4" highlight bold>
              {t("ssj_ui_content.add_your_partner_via_email")}
            </Typography>
            <Typography variant="bodyRegular" highlight center>
              {t("ssj_ui_content.make_a_request_to_invite_your_partner")}
            </Typography>
          </Stack>
        </Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Controller
                name="partnerFirstName"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label={t("ssj_ui_content.your_partners_first_name")}
                    placeholder="e.g. Cathy"
                    error={errors.partnerFirstName}
                    helperText={errors?.partnerFirstName?.message || ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="partnerLastName"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label={t("ssj_ui_content.your_partners_last_name")}
                    placeholder="e.g. Lee"
                    error={errors.partnerLastName}
                    helperText={errors?.partnerLastName?.message || ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="partnerEmail"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label={t("ssj_ui_content.your_partners_email")}
                    placeholder="e.g. cathylee@gmail.com"
                    error={errors.partnerEmail}
                    helperText={errors?.partnerEmail?.message || ""}
                    {...field}
                  />
                )}
              />
            </Stack>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button variant="text" onClick={toggle}>
                  <Typography variant="bodyRegular">
                    {t("ssj_ui_content.cancel")}
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" disabled={isSubmitting}>
                  <Typography light variant="bodyRegular">
                    {t("ssj_ui_content.invite_partner")}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};
