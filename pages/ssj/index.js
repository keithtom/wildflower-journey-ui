import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import Link from "next/link";
import Router from "next/router";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import setAuthHeader from "../../lib/setAuthHeader";
import axios from "axios";
import baseUrl from "@lib/utils/baseUrl";

import ssjApi from "../../api/ssj/ssj";
import { useUserContext } from "@lib/useUserContext";
import Hero from "../../components/Hero";

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
} from "@ui";
import CategoryChip from "../../components/CategoryChip";
import Resource from "../../components/Resource";

const SSJ = ({
  dataProgress,
  milestonesToDo,
  totalSteps,
}) => {
  const [viewPhaseProgress, setViewPhaseProgress] = useState(true);
  const [addPartnerModalOpen, setAddPartnerModalOpen] = useState(false);
  const [viewEtlsModalOpen, setViewEtlsModalOpen] = useState(false);
  const [addOpenDateModalOpen, setAddOpenDateModalOpen] = useState(false);
  const [submittedPartnerRequest, setSubmittedPartnerRequest] = useState(false);
  const { currentUser } = useUserContext();

  //TODO: Get this data from the backend
  const isFirstTimeUser = false;
  const ssjIsPaused = false;
  const hasAssignedTasks = totalSteps > 1;

  const [firstTimeUserModalOpen, setFirstTimeUserModalOpen] =
    useState(isFirstTimeUser);
  const [userOnboardedPeers, setUserOnboardedPeers] = useState(
    !isFirstTimeUser
  );
  const toggleOnboardingPeers = () => {
    setViewEtlsModalOpen(true);
    setUserOnboardedPeers(true);
  };
  const [userOnboardedWaysToWork, setUserOnboardedWaysToWork] = useState(
    !isFirstTimeUser
  );
  const toggleOnboardingWaysToWork = () => {
    setUserOnboardedWaysToWork(true);
  };
  const [userOnboardedprogress, setUserOnboardedProgress] = useState(
    !isFirstTimeUser
  );
  const toggleOnboardingProgress = () => {
    // setUserOnboardedProgress(true);
    Router.push("/ssj/visioning");
  };

  const [openDate, setOpenDate] = useState();
  const [team, setTeam] = useState();

  useEffect(() => {
    const teamData = ssjApi.getTeam();
    teamData.then(function (result) {
      setTeam(result);
      setOpenDate(result.expectedStartDate);
    });
  }, []);

  const hasPartner = team?.hasPartner;

  const hero = "/assets/images/ssj/SSJ_hero.jpg";

  return (
    <>
      <PageContainer>
        {ssjIsPaused ? (
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={6} md={5} lg={4}>
              <Card>
                <Stack spacing={6}>
                  <Icon type="pause" variant="primary" size="large" />
                  <Typography variant="h4" bold>
                    Your School Startup Journey is paused
                  </Typography>
                  <Typography variant="bodyLarge" lightened>
                    You won't receive any notifications, but you'll retain
                    membership in the Wildflower directory. If we don't hear
                    from you, we'll email you to check in.
                  </Typography>
                  <Card variant="lightened" size="small">
                    <Typography>
                      We'll reach out like you asked in 2 weeks
                    </Typography>
                  </Card>
                  <Link href="/settings">
                    <Button full variant="primary">
                      <Typography>Resume your SSJ in Settings</Typography>
                    </Button>
                  </Link>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Stack spacing={16}>
            <Hero imageUrl={hero} />
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar src={currentUser && currentUser.profileImage} />
                  <Stack>
                    <Typography variant="h4" bold>
                      Welcome, {currentUser && currentUser.firstName}!
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      School Startup Journey
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={6} alignItems="center">
                  <Stack>
                    <Typography variant="bodyMini" bold lightened>
                      PHASE
                    </Typography>
                    <Typography variant="bodySmall">Visioning</Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="bodyMini" bold lightened>
                      LOCATION
                    </Typography>
                    <Typography variant="bodySmall">Boston, MA</Typography>
                  </Stack>
                  {openDate ? (
                    <Card
                      size="small"
                      hoverable
                      onClick={() => setAddOpenDateModalOpen(true)}
                    >
                      <Stack direction="row" spacing={6}>
                        <Stack>
                          <Typography variant="bodyMini" bold lightened>
                            OPEN DATE
                          </Typography>
                          <Typography variant="bodySmall">
                            {moment(openDate).format("MMMM D, YYYY")}
                          </Typography>
                        </Stack>
                        <Icon type="pencil" size="small" variant="lightened" />
                      </Stack>
                    </Card>
                  ) : (
                    <Button
                      variant="light"
                      small
                      onClick={() => setAddOpenDateModalOpen(true)}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Icon type="plus" />
                        <Typography variant="bodyRegular">
                          Add your anticipated open date
                        </Typography>
                      </Stack>
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>

            {hasAssignedTasks ? (
              <Card variant="primaryLightened">
                <Grid container alignItems="center">
                  <Grid item flex={1}>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="h3" bold>
                        You have{" "}
                      </Typography>
                      <Typography variant="h3" highlight bold>
                        {totalSteps} tasks
                      </Typography>{" "}
                      <Typography variant="h3" bold>
                        on your to do list
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Link href="/ssj/to-do-list">
                      <Button>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="bodyLarge" bold light>
                            Start working
                          </Typography>
                          <Icon type="rightArrow" variant="light" />
                        </Stack>
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Card>
            ) : (
              <Card noPadding>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <Card
                      size="large"
                      noBorder
                      noRadius
                      sx={{ height: "100%" }}
                    >
                      <Stack spacing={6}>
                        <Icon type="calendarCheck" variant="primary" />
                        <Typography variant="h3" bold>
                          Looks like you don't have any tasks on your to do
                          list!
                        </Typography>
                        <Typography variant="bodyLarge" lightened>
                          To start, add a task from one of these milestones. You
                          can take them on at your own pace, according to your
                          interests, needs, and timeline.
                        </Typography>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card
                      noBorder
                      variant="lightened"
                      noRadius
                      sx={{ height: "100%" }}
                    >
                      <Stack spacing={2}>
                        {milestonesToDo.map((m, i) => (
                          <Link href={`/ssj/${m.attributes.phase}/${m.id}`}>
                            <Card
                              variant="light"
                              size="small"
                              key={i}
                              hoverable
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Typography variant="bodyRegular" bold>
                                  {m.attributes.title}
                                </Typography>
                                <Button small variant="text">
                                  Start here
                                </Button>
                              </Stack>
                            </Card>
                          </Link>
                        ))}
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            )}

            <Stack spacing={3}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h3" bold>
                    Your Startup Family
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => setAddPartnerModalOpen(true)}>
                    <Icon type="plus" variant="lightened" />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container spacing={3} alignItems="stretch">
                {hasPartner ? null : (
                  <Grid item xs={12} sm={4}>
                    <AddPartnerCard
                      submittedPartnerRequest={submittedPartnerRequest}
                      onClick={() => setAddPartnerModalOpen(true)}
                    />
                  </Grid>
                )}
                {FakeStartupFamily.map((f, i) => (
                  <Grid item xs={12} sm={4} key={i}>
                    <UserCard
                      firstName={f.attributes.firstName}
                      lastName={f.attributes.lastName}
                      role={f.roles[0]}
                      profileImage={f.attributes.imageUrl}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>

            {userOnboardedprogress ? (
              <Stack spacing={6}>
                <Typography variant="h3" bold>
                  Your Progress
                </Typography>
                <Stack direction="row" spacing={6}>
                  <Typography
                    variant="bodyLarge"
                    bold
                    hoverable
                    lightened={!viewPhaseProgress}
                    onClick={() => setViewPhaseProgress(true)}
                  >
                    Phases
                  </Typography>
                  <Typography
                    variant="bodyLarge"
                    bold
                    hoverable
                    lightened={viewPhaseProgress}
                    onClick={() => setViewPhaseProgress(false)}
                  >
                    Categories
                  </Typography>
                </Stack>

                {viewPhaseProgress ? (
                  <Grid container spacing={3}>
                    {dataProgress.by_phase.map((p, i) => (
                      <Grid item xs={12} sm={4} key={i}>
                        <PhaseProgressCard
                          phase={p.name}
                          link={`/ssj/${p.name}`}
                          processes={p.statuses}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid container spacing={3} alignItems="stretch">
                    {dataProgress.by_category.map((c, i) => (
                      <Grid item xs={12} sm={4}>
                        <Link href="/ssj/milestones">
                          <Card
                            key={i}
                            style={{ height: "100%" }}
                            hoverable
                            variant="lightened"
                          >
                            <Stack spacing={6}>
                              <Grid container>
                                <Grid item>
                                  <CategoryChip
                                    category={c.name}
                                    size="large"
                                  />
                                </Grid>
                              </Grid>
                              <ProgressBar processes={c.statuses} />
                            </Stack>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Stack>
            ) : (
              <OnboardingCard
                icon="category"
                title="Your progress"
                description="The Wildflower School Startup Journey is organized into 3 phases: Visioning, Planning, and Startup."
                action='Start viewing whats next in the "Visioning" phase'
                ctaText="View visioning"
                img="https://images.unsplash.com/photo-1630609083938-3acb39a06392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
                setUnlocked={toggleOnboardingProgress}
              />
            )}

            {userOnboardedWaysToWork ? (
              <Stack spacing={6}>
                <Typography variant="h3" bold>
                  Ways to work together
                </Typography>
                <Grid container spacing={3}>
                  {waysToWorkTogether.map((w, i) => (
                    <Grid item xs={12} sm={4} alignItems="stretch" key={i}>
                      <WaysToWorkCard waysToWork={w} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            ) : (
              <OnboardingCard
                icon="conversation"
                title="Ways to work together"
                description="Access resources and trainings to start improving yourself, working with your team, and engaging your community."
                action="Start by exploring resources"
                ctaText="Explore resources"
                img="https://images.unsplash.com/photo-1630609083938-3acb39a06392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
                setUnlocked={toggleOnboardingWaysToWork}
              />
            )}
            {userOnboardedPeers ? (
              <Card variant="lightened" size="large">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={6}
                >
                  <Grid item>
                    <Stack>
                      <Typography variant="h3" bold>
                        There are 22 other Emerging Teacher Leaders
                      </Typography>
                      <Typography variant="bodyRegular" lightened>
                        Get to know a growing number of Emering Teacher Leaders,
                        share learnings, and educate together.
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={6}>
                      <AvatarGroup>
                        {FakeETLs.slice(0, 4).map((f, i) => (
                          <Avatar src={f.attributes.profileImage} key={i} />
                        ))}
                      </AvatarGroup>
                      <Button onClick={() => setViewEtlsModalOpen(true)}>
                        <Typography variant="h4" bold light>
                          Meet your peers
                        </Typography>
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            ) : (
              <OnboardingCard
                icon="message"
                title="Meet your peers"
                description="You're not alone! There are more than 20 other Emerging Teacher Leaders currently working on their own journeys."
                action="Start by taking a peek at who else is here"
                ctaText="Meet others"
                img="https://images.unsplash.com/photo-1630609083938-3acb39a06392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
                setUnlocked={toggleOnboardingPeers}
              />
            )}
          </Stack>
        )}
      </PageContainer>

      <FirstTimeUserModal
        toggle={() => setFirstTimeUserModalOpen(!firstTimeUserModalOpen)}
        open={firstTimeUserModalOpen}
        firstName="Jane"
      />
      <AddPartnerModal
        setSubmittedPartnerRequest={setSubmittedPartnerRequest}
        toggle={() => setAddPartnerModalOpen(!addPartnerModalOpen)}
        open={addPartnerModalOpen}
      />
      <ViewEtlsModal
        toggle={() => setViewEtlsModalOpen(!viewEtlsModalOpen)}
        open={viewEtlsModalOpen}
      />
      <AddOpenDateModal
        toggle={() => setAddOpenDateModalOpen(!addOpenDateModalOpen)}
        open={addOpenDateModalOpen}
        openDate={openDate}
        setOpenDate={setOpenDate}
      />
    </>
  );
};

export default SSJ;

const OnboardingCard = ({
  icon,
  title,
  description,
  action,
  ctaText,
  img,
  setUnlocked,
}) => {
  const StyledDirections = styled(Box)`
    background: ${({ theme }) => theme.color.neutral.lightened};
    padding: ${({ theme }) => theme.util.buffer * 8}px;
  `;
  const StyledCTAImage = styled(Box)`
    background-image: ${(props) => props.src && `url(${props.src})`};
    background-size: cover;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <Card noPadding variant="primaryOutlined">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <StyledDirections>
            <Stack spacing={3}>
              <Icon type={icon} variant="primary" />
              <Typography variant="bodyLarge" bold>
                {title}
              </Typography>
              <Typography variant="bodyRegular" lightened>
                {description}
              </Typography>
              <Stack direction="row" spacing={3} alignItems="center">
                <Icon type="rightArrowCircle" variant="primary" />
                <Typography variant="bodyRegular" highlight>
                  {action}
                </Typography>
              </Stack>
            </Stack>
          </StyledDirections>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCTAImage src={img}>
            <Button onClick={setUnlocked}>
              <Typography variant="bodyRegular" bold light>
                {ctaText}
              </Typography>
            </Button>
          </StyledCTAImage>
        </Grid>
      </Grid>
    </Card>
  );
};

const ProgressBar = ({ processes }) => {
  const numberOfProcesses = processes.length;
  const StyledProcessIndicator = styled(Box)`
    width: calc(100% / ${numberOfProcesses});
    height: ${({ theme }) => theme.util.buffer}px;
    background: ${({ theme }) => theme.color.neutral.main};
    border-radius: ${({ theme }) => theme.radius.full}px;
    /* done */
    ${(props) =>
      props.variant === "done" &&
      css`
        background: ${props.theme.color.primary.main};
      `}
    /* inProgress */
    ${(props) =>
      props.variant === "in progress" &&
      css`
        background: ${props.theme.color.neutral.main};
      `}
    /* toDo */
    ${(props) =>
      props.variant === "to do" &&
      css`
        background: ${props.theme.color.neutral.main};
      `}
    /* upNext */
    ${(props) =>
      props.variant === "up next" &&
      css`
        background: ${props.theme.color.neutral.main};
      `}
  `;

  return (
    <Stack spacing={3}>
      <Typography variant="bodyMini" bold lightened>
        {processes.filter((p) => p === "done").length} OF {processes.length}{" "}
        MILESTONES COMPLETED
      </Typography>
      <Stack spacing={1} direction="row">
        {processes.map((p, i) => (
          <StyledProcessIndicator key={i} variant={p} />
        ))}
      </Stack>
    </Stack>
  );
};
const PhaseProgressCard = ({ phase, processes, link, isCurrentPhase }) => {
  const visioningImg = "/assets/images/ssj/visioning.jpg";
  const planningImg = "/assets/images/ssj/planning.jpg";
  const startupImg = "/assets/images/ssj/startup.jpg";
  return (
    <Link href={link}>
      <Card
        variant={isCurrentPhase ? "primaryOutlined" : "lightened"}
        hoverable
      >
        <Stack spacing={6}>
          <Typography variant="bodyLarge" bold capitalize>
            {phase}
          </Typography>
          <ProgressBar processes={processes} />
          <Stack spacing={2}>
            <Card
              size="small"
              variant={isCurrentPhase && "lightened"}
              noPadding
              noBorder
            >
              <Box sx={{ width: "100%", height: "200px" }}>
                <img
                  src={
                    phase === "visioning"
                      ? visioningImg
                      : phase === "planning"
                      ? planningImg
                      : phase === "startup" && startupImg
                  }
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Card>
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
};

const WaysToWorkCard = ({ waysToWork }) => {
  const [waysToWorkModalOpen, setWaysToWorkModalOpen] = useState(false);
  return (
    <>
      <Card
        variant="lightened"
        sx={{ height: "100%" }}
        hoverable
        onClick={() => setWaysToWorkModalOpen(true)}
      >
        <Stack spacing={6}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="bodyLarge" bold>
                {waysToWork.name}
              </Typography>
            </Grid>
            <Grid item>
              <Icon type="chevronRight" />
            </Grid>
          </Grid>
          <Stack spacing={3}>
            {waysToWork.resources.slice(0, 3).map((r, i) => (
              <Card size="small" noBorder key={i}>
                <Typography variant="bodyRegular">{r.title}</Typography>
              </Card>
            ))}
            <Card size="small" noBorder variant="lightened">
              <Typography variant="bodyRegular" lightened>
                {waysToWork.resources.length > 3
                  ? `And ${waysToWork.resources.slice(3).length} more`
                  : `View more`}
              </Typography>
            </Card>
          </Stack>
        </Stack>
      </Card>
      <WaysToWorkModal
        toggle={() => setWaysToWorkModalOpen(!waysToWorkModalOpen)}
        open={waysToWorkModalOpen}
        title={waysToWork.name}
        resources={waysToWork.resources}
      />
    </>
  );
};

const ETLs = ({}) => {
  return (
    <Grid container spacing={3}>
      {FakeETLs.slice(0, 4).map((f, i) => (
        <Grid item xs={12} sm={6} key={i}>
          <UserCard
            firstName={f.attributes.firstName}
            lastName={f.attributes.lastName}
            role={f.roles[0]}
            profileImage={f.attributes.profileImage}
          />
        </Grid>
      ))}
    </Grid>
  );
};
const AddOpenDateModal = ({ toggle, open, openDate, setOpenDate }) => {
  const [dateValue, setDateValue] = useState(openDate);
  const handleDateValueChange = (newValue) => {
    setDateValue(newValue);
  };
  const handleSetOpenDate = () => {
    ssjApi.setStartDate(moment(dateValue).format("YYYY-MM-DD")); //send to api
    setOpenDate(dateValue);
    toggle();
  };

  return (
    <Modal title="Add your anticipated open date" toggle={toggle} open={open}>
      <Stack spacing={3}>
        <Card variant="primaryLightened">
          <Stack alignItems="center" justifyContent="center" spacing={3}>
            <Typography variant="h4" highlight bold>
              Add the date you'd like to have your school open
            </Typography>
            <Typography variant="bodyRegular" highlight center>
              Don't worry, you can always change this later.
            </Typography>
          </Stack>
        </Card>
        <DatePicker
          label="Your anticipated open date"
          id="open-date"
          value={dateValue}
          onChange={handleDateValueChange}
        />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button variant="light" onClick={toggle}>
              <Typography variant="bodyRegular">Cancel</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={!dateValue} onClick={handleSetOpenDate}>
              <Typography light variant="bodyRegular">
                Set an anticipated open date
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};
const ViewEtlsModal = ({ toggle, open }) => {
  return (
    <Modal title="Meet your peers" toggle={toggle} open={open}>
      <Stack spacing={3}>
        <Card variant="primaryLightened">
          <Stack alignItems="center" justifyContent="center" spacing={3}>
            <Typography variant="h4" highlight bold>
              Get to know {FakeETLs.length} other Emerging Teacher Leaders
            </Typography>
            <Typography variant="bodyRegular" highlight center>
              Everyone shown here has opted in to being open to connecting with
              other Emerging Teacher Leaders such as yourself! Reach out and
              build your community.
            </Typography>
          </Stack>
        </Card>
        <ETLs />
      </Stack>
    </Modal>
  );
};
const WaysToWorkModal = ({ toggle, open, title, resources }) => {
  return (
    <Modal title={title} toggle={toggle} open={open}>
      <Stack spacing={2}>
        {resources.map((r, i) => (
          <Resource
            title={r.title}
            link={r.url}
            description={r.description}
            key={i}
          />
        ))}
      </Stack>
    </Modal>
  );
};
const FirstTimeUserModal = ({ toggle, open, firstName }) => {
  return (
    <Modal
      title="Welcome to your School Startup Journey dashboard!"
      toggle={toggle}
      open={open}
    >
      <Stack spacing={3}>
        <Card variant="primaryLightened" size="small">
          <Stack direction="row" spacing={3}>
            <div>
              <Icon type="star" variant="primary" />
            </div>

            <Stack spacing={3}>
              <Typography variant="bodyRegular">
                {firstName}, welcome to the home base for your journey into
                becoming a montessori educator! Again, we're so excited you're
                here. This is Wildflower Platform, a tool we created to
                centralize all of the support and resources we have to offer,
                and to make it easier for you to make progress toward your
                goals.
              </Typography>
              <Typography variant="bodyRegular">
                Poke around! I'd start by completing the actions on your
                dashboard.
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
          />
          <Stack>
            <Typography variant="bodySmall" bold>
              Mary Truman
            </Typography>
            <Typography variant="bodySmall" lightened>
              Operations Guide
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};
const AddPartnerModal = ({ toggle, open, setSubmittedPartnerRequest }) => {
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
  const onSubmit = (data) => {
    setSubmittedPartnerRequest(true);
    console.log(data);
  };

  return (
    <Modal title="Add a partner" toggle={toggle} open={open}>
      <Stack spacing={3}>
        {isSubmitSuccessful ? (
          <Card variant="lightened" size="large">
            <Stack spacing={6}>
              <Typography variant="h4" bold>
                Thanks for making a request to add a partner!
              </Typography>
              <Typography variant="bodyLarge">
                Someone from Wildflower Schools will be in touch with you to
                help set up your partnership shortly!
              </Typography>
              <Typography variant="bodyRegular" lightened>
                In the mean time, if you have any questions or concerns, please
                reach out to support@wildflowerschools.org
              </Typography>
            </Stack>
          </Card>
        ) : (
          <>
            <Card variant="primaryLightened">
              <Stack alignItems="center" justifyContent="center" spacing={3}>
                <Typography variant="h4" highlight bold>
                  Add your partner via email!
                </Typography>
                <Typography variant="bodyRegular" highlight center>
                  Make a request to invite your partner to work with you and
                  join the Wildflower Network.
                </Typography>
              </Stack>
            </Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <Stack spacing={3}>
                  <Controller
                    name="partnerFirstName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label="Your Partner's First Name"
                        placeholder="e.g. Cathy"
                        error={errors.partnerFirstName}
                        helperText={
                          errors &&
                          errors.partnerFirstName &&
                          errors.partnerFirstName &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="partnerLastName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label="Your Partner's Last Name"
                        placeholder="e.g. Lee"
                        error={errors.partnerLastName}
                        helperText={
                          errors &&
                          errors.partnerLastName &&
                          errors.partnerLastName &&
                          "This field is required"
                        }
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="partnerEmail"
                    control={control}
                    rules={{
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Your Partner's Email"
                        placeholder="e.g. cathylee@gmail.com"
                        error={errors.partnerEmail}
                        helperText={
                          errors &&
                          errors.partnerEmail &&
                          errors.partnerEmail.type === "required"
                            ? "This field is required"
                            : errors &&
                              errors.partnerEmail &&
                              errors.partnerEmail.type === "pattern" &&
                              "Please enter a valid email"
                        }
                        {...field}
                      />
                    )}
                  />
                </Stack>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Button variant="text">Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button type="submit" disabled={isSubmitting}>
                      <Typography light>Invite partner</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </form>
          </>
        )}
      </Stack>
    </Modal>
  );
};
const UserCard = ({ firstName, lastName, role, profileImage }) => {
  return (
    <Card variant="lightened" size="small">
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
  );
};
const AddPartnerCard = ({ onClick, submittedPartnerRequest }) => {
  const IconWrapper = styled(Box)`
    width: ${({ theme }) => theme.util.buffer * 12}px;
    height: ${({ theme }) => theme.util.buffer * 12}px;
    background: ${({ theme }) => theme.color.primary.lightest};
    border-radius: ${({ theme }) => theme.radius.full}px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <Card
      variant={submittedPartnerRequest ? "lightened" : "primaryOutlined"}
      size="small"
      hoverable
      onClick={onClick}
    >
      {submittedPartnerRequest ? (
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <IconWrapper>
              <Icon type="check" variant="primary" />
            </IconWrapper>
          </Grid>
          <Grid item flex={1}>
            <Stack>
              <Typography variant="bodyRegular" bold highlight>
                We're adding your partner
              </Typography>
              <Typography variant="bodySmall" lightened>
                Check back soon to work together!
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <IconWrapper>
              <Icon type="plus" variant="primary" />
            </IconWrapper>
          </Grid>
          <Grid item>
            <Stack>
              <Typography variant="bodyRegular" highlight bold>
                Add a partner
              </Typography>
              <Typography variant="bodySmall" lightened>
                Add a partner to collaborate
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

const FakePartners = [
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Teacher Leader"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Jaimee",
      lastName: "Gleichner",
      phone: "(917) 123-4567",
      profileImage: "https://randomuser.me/api/portraits/men/60.jpg",
    },
  },
];

const FakeStartupFamily = [
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Operations Guide"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Brett",
      lastName: "Vincent",
      phone: "(917) 123-4567",
      profileImage: "https://randomuser.me/api/portraits/men/60.jpg",
    },
  },
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Operations Guide"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Mary",
      lastName: "Truman",
      phone: "(917) 123-4567",
      profileImage: "https://randomuser.me/api/portraits/women/89.jpg",
    },
  },
];

const FakeETLs = [
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Emerging Teacher Leader"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Brett",
      lastName: "Vincent",
      phone: "(917) 123-4567",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Emerging Teacher Leader"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Mary",
      lastName: "Truman",
      phone: "(917) 123-4567",
      profileImage: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  },
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Emerging Teacher Leader"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Bobby",
      lastName: "Smith",
      phone: "(917) 123-4567",
      profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    },
  },
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Emerging Teacher Leader"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Alice",
      lastName: "Tufts",
      phone: "(917) 123-4567",
      profileImage: "https://randomuser.me/api/portraits/women/43.jpg",
    },
  },
];

const waysToWorkTogether = [
  {
    name: "With Yourself",
    resources: [
      {
        title: "Revisit your learning and growth plan",
        url: "https://connected.wildflowerschools.org/posts/4432337-from-teacher-to-transformational-teacher-leader-recorded-etl-gathering?video_markers=learn%2Cgrowth%2Clearning+and+growth%2Clearning.%2Cgrowth%2C",
        type: "Connected Post",
        description:
          'From time to time, you may want to revisit the Learning and Growth plan in your Visioning album and use it to guide you towards further learning opportunities. If you would like to make a new Learning and Growth Plan, you can use this link to access an "Emerging Teacher Leader Self-Awareness Reflective Guide" and accompanying presentation.',
      },
      {
        title: "Learn about Wildflower Ways of Working",
        url: "https://connected.wildflowerschools.org/posts/4840229-self-management-learning-series-virtual-classroom-welcome",
        type: "Connected Post",
        description:
          "This resource provides six, self-guided learning modules on Wildflower Ways of Working. The six modules include; An Introduction to Self-Management and Domination Culture; The Advice Process; Roles & Responsibilities; Conflict Resolution; Radical Transparency; and Integration.",
      },
      {
        title: "Learn about Liberatory Leadership",
        url: "https://connected.wildflowerschools.org/series/4588030-series-liberatory-leadership-series",
        type: "Connected Series",
        description:
          'These sessions explore our collective vision for what "Liberatory Montessori" means at Wildflower and how we support our ongoing development in service of our shared purpose for liberation in our schools and communities.',
      },
      {
        title: "Engage these Tools for Resilience",
        url: "https://connected.wildflowerschools.org/series/4687002-tools-for-resilience",
        type: "Connected Series",
        description:
          "This series includes nine, self-guided modules of resilience-building and stress-reducing activities.",
      },
      {
        title: "Enroll in equity training",
        url: "https://connected.wildflowerschools.org/series/4527958-series-equity-trainings",
        type: "Connected Series",
        description:
          "Wildflower Teacher Leaders commit to a lifelong journey of personal racial identity development, critical consciousness, and anti-bias anti-racist action (commonly referred to as ABAR). You can use this list of vetted equity trainings to support you along your learning journey.",
      },
    ],
  },
  {
    name: "With Your Team",
    resources: [
      {
        title: "Identify a Teacher Leader partner",
        url: "https://docs.google.com/presentation/d/1ymc_PZDNMtAoNdIV0QHPWw5NdekQRQrdjhkT19eyivg/view",
        type: "Google Slides",
        description:
          "Finding a Teacher Leader partner can be a daunting task, but there are ways to spread the word and activate your network. This resource provides reflection prompts, templates and framing to help you chart a path towards finding a supportive partnership.",
      },
      {
        title: "Engage a Growth & Connectedness coach",
        url: "https://connected.wildflowerschools.org/series/4406175-series-growth-connectedness-coaches",
        type: "Connected Series",
        description:
          "Once you have identified a partner, Wildflower highly recommends investing in the wellbeing of your partnership by engaging a Growth & Connectedness coach. Growth & Connectedness coaches typically focus on leadership, identity, and teamwork development. If you have questions about how to access coaching, please contact your Operations Guide. ",
      },
      {
        title: "Engage an Equity or ABAR coach",
        url: "https://connected.wildflowerschools.org/series/4527903-series-equity-consultants",
        type: "Connected Series",
        description:
          "In addition to engaging in equity or identity development trainings, many Teacher Leader teams engage an Equity coach to help them create an intentionally anti-racist, anti-bias school community.",
      },
    ],
  },
  {
    name: "With Your Community",
    resources: [
      {
        title: "Attend Wildflower Community events",
        url: "https://connected.wildflowerschools.org/posts/4634392-wildflower-events-calendar",
        type: "Connected Post",
        description:
          "As an Emerging Teacher Leader you can begin attending Wildflower events and offerings. You can use this calendar to identify upcoming opportunities. When in doubt, you can also reach out to your Operations Guide to identify upcoming opportunities.",
      },
      {
        title: "Join a Pod of Wildflower Schools",
        url: "https://connected.wildflowerschools.org/posts/4529540-essay-a-decentralized-network-by-erin-mckay",
        type: "Connected Post",
        description:
          "Pods are small groupings of 5 - 7 schools that provide mutual support, accountability and community for one another. Read this first-hand account from a Teacher Leader about her experience of a Pod in a decentralized network. Schools typically connect with Pods once they have affiliated, but it is never too early to begin exploring and visit a pod meeting or two. To get connected please contact your Operations Guide.",
      },
    ],
  },
];
export async function getServerSideProps({ params, req, res }) {
  // hard coded phase to visioning here... so milestones Todo won't show subsequent milestones to start.
  // processes/index (phase) I'm viewing this as a scoping?  but really its a phase show is another way of thinking about it.
  const phase = "visioning";  // this should be your teams current phase?
  
  const workflowId = "c502-4f84";
  const apiRoute = `${baseUrl}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}`;
  setAuthHeader({ req, res });
  const response = await axios.get(apiRoute);
  const data = response.data;
  
  // want to know how many assigned tasks there are.
  var totalSteps = 0; // rename to total assigned steps.; numMyAssignedTasks
  data.included.forEach((included) => {
    if (included.type == "step") {
      totalSteps++;
    }
  });

  // suggests potential milestones to start if no tasks assigned.
  const milestonesToDo = [];
  data.data.forEach((milestone) => {
    if (milestone.attributes.status == "to do") {
      milestonesToDo.push(milestone);
    }
  });

  // const data = await ssj.dashboard();
// put assigned tasks in this api call?
  const apiRouteProgress = `${baseUrl}/v1/ssj/dashboard/progress?workflow_id=${workflowId}`;
  const responseProgress = await axios.get(apiRouteProgress);
  const dataProgress = await responseProgress.data;

  // dashboard needs - # of assigned tasks, phase, location, hub, open date, startup family, phase stats (# completed, # milestones,), category stats (#completed, # milestones)

  return {
    props: {
      milestonesToDo,
      dataProgress,
      totalSteps,
    },
  };
}
