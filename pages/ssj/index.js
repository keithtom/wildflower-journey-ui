import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import Link from "next/link";
import Router from "next/router";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import setAuthHeader from "../../lib/setAuthHeader";
import axios from "axios";
import baseUrl from "@lib/utils/baseUrl";

import { categories } from "../../lib/utils/fake-data";
import { useUserContext } from "@lib/useUserContext";
import Milestone from "../../components/Milestone";
import Task from "../../components/Task";

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
import { ListItemSecondaryAction } from "@mui/material";

const SSJ = ({
  phase,
  data,
  milestonesToDo,
  MilestoneWithSelfAssignedTasks,
}) => {
  const [viewPhaseProgress, setViewPhaseProgress] = useState(true);
  const [addPartnerModalOpen, setAddPartnerModalOpen] = useState(false);
  const [viewEtlsModalOpen, setViewEtlsModalOpen] = useState(false);
  const [addOpenDateModalOpen, setAddOpenDateModalOpen] = useState(false);
  const [viewWaysToWorkModalOpen, setViewWaysToWorkModalOpen] = useState(false);
  const { currentUser } = useUserContext();

  //TODO: Get this data from the backend
  const isFirstTimeUser = false;
  const ssjIsPaused = false;
  const hasAssignedTasks = MilestoneWithSelfAssignedTasks.length;

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
    setViewWaysToWorkModalOpen(true);
    setUserOnboardedWaysToWork(true);
  };
  const [userOnboardedprogress, setUserOnboardedProgress] = useState(
    !isFirstTimeUser
  );
  const toggleOnboardingProgress = () => {
    // setUserOnboardedProgress(true);
    Router.push("/ssj/visioning");
  };

  const [openDate, setOpenDate] = useState("");
  const handleOpenDateChange = (newValue) => {
    setOpenDate(newValue);
  };

  const hasPartner = !FakePartners.length;

  // console.log({ data });
  // console.log({ MilestoneWithSelfAssignedTasks });
  // console.log({ currentUser });

  return (
    <>
      <PageContainer>
        {ssjIsPaused ? (
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} xs={12} sm={6} md={5} lg={4}>
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
          <Stack spacing={12}>
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h3" bold>
                  School Startup Journey
                </Typography>
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
                  <Stack>
                    <Typography variant="bodyMini" bold lightened>
                      HUB
                    </Typography>
                    <Typography variant="bodySmall">Massachusetts</Typography>
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
                          Add your open date
                        </Typography>
                      </Stack>
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>

            {hasAssignedTasks ? (
              <Stack spacing={6}>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Avatar src={currentUser && currentUser.profileImage} />
                  <Stack spacing={1}>
                    <Typography variant="bodyLarge" bold>
                      Assigned to you
                    </Typography>
                    <Typography variant="bodyRegular">
                      Tasks from {MilestoneWithSelfAssignedTasks.length}{" "}
                      milestones
                    </Typography>
                  </Stack>
                </Stack>
                <Card noPadding>
                  {MilestoneWithSelfAssignedTasks.map((m, i) => (
                    <AssignedTaskByMilestone
                      tasksByMilestone={m}
                      key={i}
                      phase={phase}
                    />
                  ))}
                </Card>
              </Stack>
            ) : (
              <Card variant="lightened" size="large">
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={6}>
                      <Avatar
                        size="md"
                        src={currentUser && currentUser.profileImage}
                      />
                      <Typography variant="bodyRegular" bold>
                        Welcome, Keith!
                      </Typography>
                      <Typography variant="bodyLarge" bold>
                        Start making progress on your SSJ by working toward one
                        of these milestones!
                      </Typography>
                      <Typography variant="bodyLarge" lightened>
                        Each milestone has a number of tasks you can assign
                        yourself. Head over to one of these to try it out!
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={6}>
                      <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="bodyRegulr">
                            You're currently in
                          </Typography>
                          <Link href="/ssj/visioning">
                            <Chip label="Visioning" />
                          </Link>
                        </Stack>

                        <Typography variant="bodyLarge" bold>
                          Milestones to start working on
                        </Typography>
                      </Stack>
                      <Stack spacing={2}>
                        {milestonesToDo.map((m, i) => (
                          <Link href={`/ssj/${phase}/${m.id}`}>
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
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            )}

            <Card>
              <Stack spacing={3}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h4" bold>
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
            </Card>

            {userOnboardedprogress ? (
              <Card>
                <Stack spacing={6}>
                  <Stack direction="row" spacing={6}>
                    <Typography
                      variant="h4"
                      bold
                      hoverable
                      lightened={!viewPhaseProgress}
                      onClick={() => setViewPhaseProgress(true)}
                    >
                      Phases
                    </Typography>
                    <Typography
                      variant="h4"
                      bold
                      hoverable
                      lightened={viewPhaseProgress}
                      onClick={() => setViewPhaseProgress(false)}
                    >
                      Categories
                    </Typography>
                  </Stack>

                  {viewPhaseProgress ? (
                    <Grid container spacing={6}>
                      <Grid item xs={12} sm={4}>
                        <PhaseProgressCard
                          phase="Visioning"
                          link="/ssj/visioning"
                          isCurrentPhase
                          processes={[
                            { id: "1", status: "done" },
                            { id: "2", status: "to do" },
                            { id: "3", status: "to do" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <PhaseProgressCard
                          phase="Planning"
                          link="/ssj/planning"
                          processes={[
                            { id: "1", status: "done" },
                            { id: "2", status: "to do" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <PhaseProgressCard
                          phase="Startup"
                          link="/ssj/startup"
                          processes={[
                            { id: "1", status: "done" },
                            { id: "2", status: "to do" },
                            { id: "3", status: "to do" },
                            { id: "4", status: "to do" },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={6} alignItems="stretch">
                      {categories.map((p, i) => (
                        <Grid item xs={12} sm={4}>
                          <Link href="/ssj/view-all">
                            <Card key={i} style={{ height: "100%" }} hoverable>
                              <Stack spacing={3}>
                                <Grid container>
                                  <Grid item>
                                    <CategoryChip
                                      category={p.title}
                                      size="large"
                                    />
                                  </Grid>
                                </Grid>
                                <ProgressBar processes={p.processes} />
                              </Stack>
                            </Card>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Stack>
              </Card>
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
              <Card>
                <Stack spacing={6}>
                  <Typography variant="h4" bold>
                    Ways to work together
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <Card variant="lightened">
                        <Stack spacing={6}>
                          <Typography variant="bodyLarge" bold>
                            With your self
                          </Typography>
                          <Stack spacing={3}>
                            <Card size="small">Check on your growth plan</Card>
                            <Card size="small">Engage in equity training</Card>
                            <Card size="small" variant="lightened">
                              View more
                            </Card>
                          </Stack>
                        </Stack>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Card variant="lightened">
                        <Stack spacing={6}>
                          <Typography variant="bodyLarge" bold>
                            With your team
                          </Typography>
                          <Stack spacing={3}>
                            <Card size="small">Check on your growth plan</Card>
                            <Card size="small">Engage in equity training</Card>
                            <Card size="small" variant="lightened">
                              View more
                            </Card>
                          </Stack>
                        </Stack>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Card variant="lightened">
                        <Stack spacing={6}>
                          <Typography variant="bodyLarge" bold>
                            With your community
                          </Typography>
                          <Stack spacing={3}>
                            <Card size="small">Check on your growth plan</Card>
                            <Card size="small">Engage in equity training</Card>
                            <Card size="small" variant="lightened">
                              View more
                            </Card>
                          </Stack>
                        </Stack>
                      </Card>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
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
                        Get to know a growing number of ETLs, share learnings,
                        and educate together.
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
                description="You're not alone! There are more than 20 other Emerging Teacher Leaders (ETLs) currently working on their own journeys."
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
      <ViewResourcesModal
        toggle={() => setViewWaysToWorkModalOpen(!viewWaysToWorkModalOpen)}
        open={viewWaysToWorkModalOpen}
      />
      <AddPartnerModal
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
        handleOpenDateChange={handleOpenDateChange}
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
      props.done &&
      css`
        background: ${props.theme.color.success.medium};
      `}
  `;
  return (
    <Stack spacing={3}>
      <Typography variant="bodyMini" bold lightened>
        {processes.filter((process) => process.status === "done").length} OF{" "}
        {processes.length} MILESTONES COMPLETED
      </Typography>
      <Stack spacing={1} direction="row">
        {processes.map((t, i) => (
          <StyledProcessIndicator key={i} done={t.status === "done"} />
        ))}
      </Stack>
    </Stack>
  );
};
const PhaseProgressCard = ({ phase, processes, link, isCurrentPhase }) => {
  const DeliverableImage = ({ completed }) => {
    const StyledDeliverableImage = styled(Box)`
      position: relative;
    `;
    const StyledIcon = styled(Box)`
      width: ${({ theme }) => theme.util.buffer * 16}px;
      height: ${({ theme }) => theme.util.buffer * 16}px;
      background: ${({ theme }) => theme.color.primary.main};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: ${({ theme }) => theme.radius.full}px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    return (
      <StyledDeliverableImage>
        <img
          src="https://images.unsplash.com/photo-1630609083938-3acb39a06392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        {completed ? (
          <StyledIcon>
            <Icon type="check" variant="light" size="large" />
          </StyledIcon>
        ) : null}
      </StyledDeliverableImage>
    );
  };

  return (
    <Link href={link}>
      <Card
        variant={isCurrentPhase ? "primaryOutlined" : "lightened"}
        hoverable
      >
        <Stack spacing={6}>
          <Typography variant="bodyLarge" bold>
            {phase}
          </Typography>
          <ProgressBar processes={processes} />
          <Card size="small" variant={isCurrentPhase && "lightened"}>
            <Stack spacing={3}>
              <DeliverableImage
                completed={
                  processes.filter((process) => process.status === "done")
                    .length === processes.length
                }
              />
              <Typography variant="bodyRegular">Self Assessment</Typography>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Link>
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
const AddOpenDateModal = ({ toggle, open, openDate, handleOpenDateChange }) => {
  return (
    <Modal title="Add your open date" toggle={toggle} open={open}>
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
          label="Your open date"
          value={openDate}
          onChange={handleOpenDateChange}
        />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button variant="light" onClick={toggle}>
              <Typography>Cancel</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={!openDate} onClick={toggle}>
              <Typography>Set open date</Typography>
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
              Get to know {FakeETLs.length} other ETLs
            </Typography>
            <Typography variant="bodyRegular" highlight center>
              Everyone shown here has opted in to being open to connecting with
              other ETLs such as yourself! Reach out and build your community.
            </Typography>
          </Stack>
        </Card>
        <ETLs />
      </Stack>
    </Modal>
  );
};
const ViewResourcesModal = ({ toggle, open }) => {
  return (
    <Modal title="Ways to work with others" toggle={toggle} open={open}>
      <Stack spacing={3}>
        <Card variant="lightened">
          <Typography variant="bodyLarge">Content</Typography>
        </Card>
        <Card variant="lightened">
          <Typography variant="bodyLarge">Content</Typography>
        </Card>
        <Card variant="lightened">
          <Typography variant="bodyLarge">Content</Typography>
        </Card>
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
const AddPartnerModal = ({ toggle, open }) => {
  const [isAddingByEmail, setIsAddingByEmail] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      partnerFirstName: "",
      partnerLastName: "",
      partnerEmail: "",
      partnerMessage: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Modal title="Add a partner" toggle={toggle} open={open}>
      <Stack spacing={3}>
        {isAddingByEmail ? (
          <>
            <Card variant="primaryLightened">
              <Stack alignItems="center" justifyContent="center" spacing={3}>
                <Typography variant="h4" highlight bold>
                  Add your partner via email!
                </Typography>
                <Typography variant="bodyRegular" highlight center>
                  Invite your partner to work with you and join the Wildflower
                  Network.
                </Typography>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography variant="bodyRegular" highlight>
                    Are they already in the network?
                  </Typography>
                  <Button
                    variant="secondary"
                    small
                    onClick={() => setIsAddingByEmail(false)}
                  >
                    <Typography variant="bodyRegular" center bold>
                      Add via the directory
                    </Typography>
                  </Button>
                </Stack>
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
                  <Controller
                    name="partnerMessage"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        rows={4}
                        label="A message to your partner"
                        placeholder="Type something..."
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
        ) : (
          <>
            <Card variant="primaryLightened">
              <Stack alignItems="center" justifyContent="center" spacing={3}>
                <Typography variant="h4" highlight bold>
                  Add your partner
                </Typography>
                <Typography variant="bodyRegular" highlight center>
                  Search for your partner below and add them to your school.
                  They'll be notified and, when they accept, your accounts will
                  be tied together.
                </Typography>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography variant="bodyRegular" highlight>
                    Not here?
                  </Typography>
                  <Button
                    variant="secondary"
                    small
                    onClick={() => setIsAddingByEmail(true)}
                  >
                    <Typography variant="bodyRegular" center bold>
                      Add via email
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            </Card>
            <ETLs />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button variant="text">Cancel</Button>
              </Grid>
              <Grid item>
                <Button>
                  <Typography light>Invite partner</Typography>
                </Button>
              </Grid>
            </Grid>
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
const AddPartnerCard = ({ onClick }) => {
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
    <Card variant="primaryOutlined" size="small" hoverable onClick={onClick}>
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
    </Card>
  );
};

const AssignedTaskByMilestone = ({ tasksByMilestone, phase }) => {
  const [expandedTasks, setExpandedTasks] = useState(false);
  const m = tasksByMilestone;
  return (
    <>
      <Milestone
        variant="small"
        link={`/ssj/${phase}/${m.id}`}
        title={m.attributes.title}
        effort={m.attributes.effort}
        categories={m.attributes.categories}
        status={m.attributes.status}
        stepCount={m.attributes.stepsCount}
      />
      {m.relationships.steps.data
        .slice(0, !expandedTasks ? 1 : 100)
        .map((t, i) => (
          <Task
            variant="small"
            taskId={t.id}
            link={`/ssj/${phase}/${m.id}/${t.id}`}
            title={t.attributes.title}
            key={i}
            isDecision={t.attributes.kind === "Decision"}
            decisionOptions={t.attributes.decisionOptions}
            isComplete={t.attributes.completed}
            isNext={i === 0}
            // handleCompleteMilestone={handleCompleteMilestone}
            categories={m.attributes.categories}
            taskAssignee={t.attributes.assigneeInfo}
          />
        ))}
      {m.relationships.steps.data.length > 1 && (
        <Card
          noBorder
          size="small"
          onClick={() => setExpandedTasks(!expandedTasks)}
          hoverable
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="bodySmall" bold highlight>
                Show {m.relationships.steps.data.length - 1}{" "}
                {expandedTasks ? "less" : "more"}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
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

export async function getServerSideProps({ params, req, res }) {
  // const userId = query.userId;
  // const ssjId = query.ssjId;

  const phase = "visioning";
  // const workflowId = "5947-ab7f"
  const workflowId = "c502-4f84";
  const apiRoute = `${baseUrl}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}&self_assigned=true`;
  setAuthHeader({ req, res });
  const response = await axios.get(apiRoute);
  const data = await response.data;
  const steps = {};
  data.included.forEach((included) => {
    if (included.type == "step") {
      steps[included.id] = included;
    }
  });

  data.data.forEach((milestone) => {
    milestone.relationships.steps.data.forEach((includedStep, i) => {
      milestone.relationships.steps.data.splice(i, 1, steps[includedStep.id]);
    });
  });
  const MilestoneWithSelfAssignedTasks = data.data;

  const apiRouteMilestones = `${baseUrl}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}`;

  const responseMilestones = await axios.get(apiRouteMilestones);
  const dataMilestones = await responseMilestones.data;
  const milestonesToDo = [];
  dataMilestones.data.forEach((milestone) => {
    if (milestone.attributes.status == "to do") {
      milestonesToDo.push(milestone);
    }
  });

  return {
    props: {
      milestonesToDo,
      data,
      phase,
      MilestoneWithSelfAssignedTasks,
    },
  };
}
