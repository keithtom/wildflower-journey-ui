import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { parseISO } from "date-fns";
import moment from "moment";
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
  DatePicker,
} from "../ui";
import { theme } from "../../styles/theme";
import { useRouter } from "next/router";
import schoolsApi from "../../api/schools";
import { mutate } from "swr";

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

const InfoListItem = ({ label, value, action }) =>
  action ? (
    <StyledListItemButton onClick={action}>
      <ListItemText
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
    </StyledListItemButton>
  ) : (
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

const TeamMemberItem = ({ member, schoolId }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mousePosition, setMousePosition] = useState({
    mouseX: 0,
    mouseY: 0,
  });
  const [openInvitedMemberModal, setOpenInvitedMemberModal] = useState(false);
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

  const handleViewInvitedMember = () => {
    setOpenInvitedMemberModal(true);
  };

  return (
    <ListItem disablePadding>
      <StyledListItemButton
        onClick={
          !member.attributes.active ? handleViewInvitedMember : handleClick
        }
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onMouseMove={handleMouseMove}
      >
        <ListItemAvatar>
          {member.attributes.active ? (
            <Avatar
              sx={{ height: 40, width: 40 }}
              src={member.attributes.imageUrl}
            />
          ) : (
            <Box
              sx={{
                height: 40,
                width: 40,
                backgroundColor: theme.color.primary.lightest,
                borderRadius: theme.radius.full,
                border: `1px dashed ${theme.color.primary.main}`,
              }}
            />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="bodyRegular" bold>
                {`${member.attributes.firstName} ${member.attributes.lastName}`}
              </Typography>
              {!member.attributes.active ? (
                <Chip label="Invited" size="small" />
              ) : null}
            </Stack>
          }
          secondary={
            <Typography variant="bodyRegular" lightened>
              {!member.attributes.active
                ? member.attributes.roleList?.join(", ")
                : member.attributes.schoolRoleList?.join(", ")}
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
          {member.attributes.active ? (
            <ListItem>
              <ListItemText>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="bodySmall" highlight>
                      View in directory
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Icon type="chevronRight" variant="primary" size="small" />
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ) : null}
        </List>
      </ContactPopover>
      <InvitedMemberModal
        toggle={() => setOpenInvitedMemberModal(!openInvitedMemberModal)}
        open={openInvitedMemberModal}
        schoolId={schoolId}
        member={member}
      />
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
  expectedStartDate,
}) => {
  const [openTeamMemberModal, setOpenTeamMemberModal] = useState(false);
  const [openAddOpenDateModal, setOpenAddOpenDateModal] = useState(false);

  const handleOpenTeamMemberModal = () => {
    setOpenTeamMemberModal(true);
  };

  const { t } = useTranslation("common");

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
                backgroundColor: "white",
              }}
            >
              <img
                src={logoImage}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
                {status === "Open"
                  ? schoolName
                  : t("ssj_ui_content.school_startup_journey")}
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
          {!phase || status === "Open" ? null : (
            <InfoListItem
              label={t("ssj_ui_content.phase")}
              value={t(`ssj_phases.${phase.toLowerCase()}`)}
            />
          )}
          {!location ? null : (
            <InfoListItem
              label={t("ssj_ui_content.location")}
              value={location}
            />
          )}
          {!openDate ? null : (
            <InfoListItem
              label={t("ssj_ui_content.open_date")}
              value={new Date(openDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            />
          )}
          {!expectedStartDate ? null : (
            <InfoListItem
              action={() => setOpenAddOpenDateModal(true)}
              label={t("ssj_ui_content.open_date")}
              value={new Date(expectedStartDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            />
          )}
          {!openedOn ? null : (
            <InfoListItem
              label={t("ssj_ui_content.open_date")}
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
                {status === "Open"
                  ? "Open School Team"
                  : t("ssj_ui_content.startup_team")}
              </Typography>
              {status === "Open" ? null : (
                <IconButton onClick={handleOpenTeamMemberModal}>
                  <Icon type="plus" variant="primary" />
                </IconButton>
              )}
            </Stack>
          </StyledSubheader>
          {teamMembers?.map((member, index) => (
            <TeamMemberItem key={index} member={member} schoolId={schoolId} />
          ))}
          {status === "Open" ? null : (
            <ListItem disablePadding>
              <StyledListItemButton onClick={handleOpenTeamMemberModal}>
                <ListItemAvatar>
                  <Box
                    sx={{
                      height: 40,
                      width: 40,
                      backgroundColor: theme.color.primary.lightest,
                      borderRadius: theme.radius.full,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon type="plus" variant="primary" />
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="bodyRegular" bold highlight>
                      Add a partner
                    </Typography>
                  }
                  secondary={
                    <Typography variant="bodyRegular" lightened>
                      Add a partner to collaborate
                    </Typography>
                  }
                />
              </StyledListItemButton>
            </ListItem>
          )}
        </List>
      </Stack>

      <TeamMemberModal
        toggle={() => setOpenTeamMemberModal(!openTeamMemberModal)}
        open={openTeamMemberModal}
        schoolId={schoolId}
      />

      <AddOpenDateModal
        toggle={() => setOpenAddOpenDateModal(!openAddOpenDateModal)}
        open={openAddOpenDateModal}
      />
    </Card>
  );
};

export default SchoolInfoCard;

const InvitedMemberModal = ({ toggle, open, schoolId, member }) => {
  const [isInviteSent, setIsInviteSent] = useState(false);
  const handleSendInviteAgain = async () => {
    try {
      const response = await schoolsApi.reinvitePartner(schoolId, {
        person: { id: member.id },
      });
      if (response.status === 200) {
        setIsInviteSent(true);
        mutate(`/v1/schools/${schoolId}`);
        // console.log("success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      toggle={toggle}
      title={`${member.attributes.firstName} ${member.attributes.lastName}`}
      open={open}
      fixedActions={
        <Button
          variant="text"
          onClick={handleSendInviteAgain}
          small
          disabled={isInviteSent}
        >
          <Typography variant="bodyRegular">
            {isInviteSent ? "Invite sent" : "Send invite again"}
          </Typography>
        </Button>
      }
    >
      <List>
        <ListItem disablePadding>
          <ListItemAvatar>
            {member.attributes.active ? (
              <Avatar
                sx={{ height: 40, width: 40 }}
                src={member.attributes.imageUrl}
              />
            ) : (
              <Box
                sx={{
                  height: 40,
                  width: 40,
                  backgroundColor: theme.color.primary.lightest,
                  borderRadius: theme.radius.full,
                  border: `1px dashed ${theme.color.primary.main}`,
                }}
              />
            )}
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack direction="row" alignItems="center" spacing={3}>
                <Typography variant="bodyRegular" bold>
                  {`${member.attributes.firstName} ${member.attributes.lastName}`}
                </Typography>
                {!member.attributes.active ? (
                  <Chip label="Invited" size="small" />
                ) : null}
              </Stack>
            }
            secondary={
              <Stack direction="row" spacing={6}>
                <Typography variant="bodyRegular" lightened>
                  {!member.attributes.active
                    ? member.attributes.roleList?.join(", ")
                    : member.attributes.schoolRoleList?.join(", ")}
                </Typography>
                <Typography variant="bodyRegular">
                  {member.attributes.email}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      </List>
    </Modal>
  );
};

const TeamMemberModal = ({ toggle, open, schoolId }) => {
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
    const structuredData = {
      person: {
        email: data.partnerEmail,
        first_name: data.partnerFirstName,
        last_name: data.partnerLastName,
      },
    };
    try {
      const response = await schoolsApi.invitePartner(schoolId, structuredData);
      if (response.status === 200) {
        toggle();

        mutate(`/v1/schools/${schoolId}`);
        console.log("success");
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

const AddOpenDateModal = ({ toggle, open, openDate, setOpenDate, team }) => {
  const [dateValue, setDateValue] = useState();
  const [changedDateValue, setChangedDateValue] = useState(false);
  useEffect(() => {
    if (!changedDateValue) {
      setDateValue(openDate);
    }
  });
  const handleDateValueChange = (newValue) => {
    setDateValue(moment(newValue).format("YYYY-MM-DD"));
    setChangedDateValue(true);
  };
  const handleSetOpenDate = () => {
    try {
      teamsApi.setStartDate({
        id: team?.data?.data?.id,
        date: moment(dateValue).format("YYYY-MM-DD"),
      }); //send to api
    } catch (err) {
      if (err?.response?.status === 401) {
        clearLoggedInState({});
        router.push("/login");
      } else {
        console.error(err);
      }
    }
    setOpenDate(moment(dateValue).format("YYYY-MM-DD"));
    setChangedDateValue(false);
    toggle();
  };

  const { t } = useTranslation("common");

  return (
    <Modal
      title={t("ssj_ui_content.add_open_date")}
      toggle={toggle}
      open={open}
    >
      <Stack spacing={3}>
        <Card variant="primaryLightened">
          <Stack alignItems="center" justifyContent="center" spacing={3}>
            <Typography variant="h4" highlight bold>
              {t("ssj_ui_content.add_the_date_youd_like_to_open")}
            </Typography>
            <Typography variant="bodyRegular" highlight center>
              {t("ssj_ui_content.dont_worry_you_can_change_this_later")}
            </Typography>
          </Stack>
        </Card>
        <DatePicker
          label="Your anticipated open date"
          id="open-date"
          disablePast
          value={parseISO(dateValue)}
          onChange={handleDateValueChange}
        />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button variant="light" onClick={toggle}>
              <Typography variant="bodyRegular">
                {t("ssj_ui_content.cancel")}
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!changedDateValue}
              onClick={handleSetOpenDate}
              data-cy="add-open-date-button"
            >
              <Typography light variant="bodyRegular">
                {t("ssj_ui_content.add_open_date")}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};
