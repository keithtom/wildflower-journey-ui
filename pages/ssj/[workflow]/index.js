import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useRouter } from "next/router";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { getCookie } from "cookies-next";
import { parseISO } from "date-fns";
import Badge from "@mui/material/Badge";
import { useTranslation } from "next-i18next";

import teamsApi from "@api/ssj/teams";
import { useUserContext } from "@lib/useUserContext";
import useAuth from "@lib/utils/useAuth";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";
import Hero from "../../../components/Hero";
import UserCard from "../../../components/UserCard";
import { getTranslatedAttr } from "@lib/utils/getTranslatedAttr";

import {
  Chip,
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
  Link,
} from "@ui";
import CategoryChip from "@components/CategoryChip";
import Resource from "@components/Resource";

import useTeam from "@hooks/useTeam";
import usePersons from "@hooks/usePersons";
import useSSJProgress from "@hooks/useSSJProgress";
import useMilestones from "@hooks/useMilestones";

const SSJ = () => {
  const { currentUser } = useUserContext();
  const router = useRouter();
  const { workflow } = router.query;
  const phase = getCookie("phase");
  //TODO: Get this data from the backend
  const isFirstTimeUser = false;
  const ssjIsPaused = false;

  const { t } = useTranslation("common");

  const [viewPhaseProgress, setViewPhaseProgress] = useState(true);
  const [addPartnerModalOpen, setAddPartnerModalOpen] = useState(false);
  const [viewEtlsModalOpen, setViewEtlsModalOpen] = useState(false);
  const [addOpenDateModalOpen, setAddOpenDateModalOpen] = useState(false);
  const [submittedPartnerRequest, setSubmittedPartnerRequest] = useState();
  const [firstTimeUserModalOpen, setFirstTimeUserModalOpen] =
    useState(isFirstTimeUser);
  const [userOnboardedPeers, setUserOnboardedPeers] = useState(
    !isFirstTimeUser
  );
  const [userOnboardedWaysToWork, setUserOnboardedWaysToWork] = useState(
    !isFirstTimeUser
  );
  const [userOnboardedprogress, setUserOnboardedProgress] = useState(
    !isFirstTimeUser
  );
  const [openDate, setOpenDate] = useState(null);
  // const [team, setTeam] = useState();

  const toggleOnboardingPeers = () => {
    setViewEtlsModalOpen(true);
    setUserOnboardedPeers(true);
  };
  const toggleOnboardingWaysToWork = () => {
    setUserOnboardedWaysToWork(true);
  };
  const toggleOnboardingProgress = () => {
    router.push(`/ssj/${workflow}/visioning`);
  };

  const teamId = currentUser?.attributes.ssj.teamId;
  const { team, isLoading: teamIsLoading } = useTeam(teamId);
  // TODO: use some sort of pagination so we're not pulling in all the ETL's
  // const { people, isLoading: currentETLsIsLoading } = usePersons({
  //   etl: true,
  // });
  // const currentETLs = people?.data.filter(
  //   (p) => p.attributes.isOnboarded === true
  // );

  const {
    progress,
    assignedSteps,
    isLoading: ssjProgressIsLoading,
  } = useSSJProgress(workflow);
  const {
    milestones,
    milestonesToDo,
    isLoading: milestonesForPhaseIsLoading,
  } = useMilestones(workflow, {
    phase,
    omit_include: true,
  });

  const partners =
    team?.data?.data?.relationships?.partners?.data?.length >= 1
      ? team?.data?.data?.relationships?.partners?.data?.filter((t) => {
          return t.id !== currentUser?.id;
        })
      : null;

  const hero = "/assets/images/ssj/SSJ_hero.jpg";

  const opsGuide = team?.data?.data?.relationships?.opsGuide?.data;
  const regionalGrowthLead =
    team?.data?.data?.relationships?.regionalGrowthLead?.data;

  useEffect(() => {
    if (team?.data?.data?.attributes?.expectedStartDate) {
      setOpenDate(team?.data?.data?.attributes?.expectedStartDate);
    } else {
      setOpenDate(null);
    }
  }, [team]);

  useAuth("/login");

  const isLoading =
    teamIsLoading || ssjProgressIsLoading || milestonesForPhaseIsLoading;

  // console.log({ user });
  // console.log({ team });
  // console.log({ progress });
  // console.log({ milestones });
  // console.log({ milestonesToDo });
  // console.log({ currentUser });
  // console.log({ team });
  // console.log({ partners });

  const waysToWorkTogether = [
    {
      name: t("ways_to_work_together.with_yourself"),
      resources: [
        {
          title: t(
            "ways_to_work_together.revisit_your_learning_and_growth_plan"
          ),
          url: "https://connected.wildflowerschools.org/posts/4432337-from-teacher-to-transformational-teacher-leader-recorded-etl-gathering?video_markers=learn%2Cgrowth%2Clearning+and+growth%2Clearning.%2Cgrowth%2C",
          type: "Connected Post",
          description: t(
            "ways_to_work_together.revisit_your_learning_and_growth_plan_description"
          ),
        },
        {
          title: t(
            "ways_to_work_together.learn_about_wildflower_ways_of_working"
          ),
          url: "https://connected.wildflowerschools.org/posts/4840229-self-management-learning-series-virtual-classroom-welcome",
          type: "Connected Post",
          description: t(
            "ways_to_work_together.learn_about_wildflower_ways_of_working_description"
          ),
        },
        {
          title: t("ways_to_work_together.learn_about_liberatory_leadership"),
          url: "https://connected.wildflowerschools.org/series/4588030-series-liberatory-leadership-series",
          type: "Connected Series",
          description: t(
            "ways_to_work_together.learn_about_liberatory_leadership_description"
          ),
        },
        {
          title: t("ways_to_work_together.enroll_in_equity_training"),
          url: "https://connected.wildflowerschools.org/series/4527958-series-equity-trainings",
          type: "Connected Series",
          description: t(
            "ways_to_work_together.enroll_in_equity_training_description"
          ),
        },
      ],
    },
    {
      name: "With Your Team",
      resources: [
        {
          title: t("ways_to_work_together.identify_a_teacher_leader_partner"),
          url: "https://docs.google.com/presentation/d/1ymc_PZDNMtAoNdIV0QHPWw5NdekQRQrdjhkT19eyivg/view",
          type: "Google Slides",
          description: t(
            "ways_to_work_together.identify_a_teacher_leader_partner_description"
          ),
        },
        {
          title: t(
            "ways_to_work_together.engage_a_growth_and_conciousness_coach"
          ),
          url: "https://connected.wildflowerschools.org/series/4406175-series-growth-connectedness-coaches",
          type: "Connected Series",
          description: t(
            "ways_to_work_together.engage_a_growth_and_conciousness_coach_description"
          ),
        },
        {
          title: t("ways_to_work_together.engage_an_equity_or_abar_coach"),
          url: "https://connected.wildflowerschools.org/series/4527903-series-equity-consultants",
          type: "Connected Series",
          description: t(
            "ways_to_work_together.engage_an_equity_or_abar_coach_description"
          ),
        },
      ],
    },
    {
      name: "With Your Community",
      resources: [
        {
          title: t("ways_to_work_together.attend_wildflower_community_events"),
          url: "https://connected.wildflowerschools.org/posts/4634392-wildflower-events-calendar",
          type: "Connected Post",
          description: t(
            "ways_to_work_together.attend_wildflower_community_events_description"
          ),
        },
        {
          title: t("ways_to_work_together.learn_about_wildflower_school_pods"),
          url: "https://connected.wildflowerschools.org/posts/4529540-essay-a-decentralized-network-by-erin-mckay",
          type: "Connected Post",
          description: t(
            "ways_to_work_together.learn_about_wildflower_school_pods_description"
          ),
        },
      ],
    },
  ];

  return (
    <>
      {isLoading ? (
        <PageContainer isLoading />
      ) : (
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
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <EditBadge url="/welcome/add-profile-info" />
                      }
                    >
                      <Avatar src={currentUser?.attributes.imageUrl} />
                    </Badge>
                    <Stack>
                      <Typography variant="h4" bold>
                        {t("ssj_ui_content.welcome")},{" "}
                        {currentUser?.attributes?.firstName}!
                      </Typography>
                      <Typography variant="bodyLarge" lightened>
                        {t("ssj_ui_content.school_startup_journey")}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <Card size="small">
                        <Typography variant="bodyMini" bold lightened uppercase>
                          {t("ssj_ui_content.phase")}
                        </Typography>
                        <Typography variant="bodySmall">Visioning</Typography>
                      </Card>
                    </Grid>
                    {currentUser?.personAddress?.city &&
                    currentUser?.personAddress?.state ? (
                      <Grid item>
                        <Card size="small">
                          <Typography
                            variant="bodyMini"
                            bold
                            lightened
                            uppercase
                          >
                            {t("ssj_ui_content.location")}
                          </Typography>
                          <Typography variant="bodySmall">
                            {currentUser?.personAddress?.city},{" "}
                            {currentUser?.personAddress?.state}
                          </Typography>
                        </Card>
                      </Grid>
                    ) : null}
                    <Grid item>
                      {openDate ? (
                        <Card
                          size="small"
                          hoverable
                          onClick={() => setAddOpenDateModalOpen(true)}
                        >
                          <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                          >
                            <Stack>
                              <Typography
                                variant="bodyMini"
                                bold
                                lightened
                                uppercase
                              >
                                {t("ssj_ui_content.open_date")}
                              </Typography>
                              <Typography
                                variant="bodySmall"
                                data-cy="open-date-value"
                              >
                                {moment(openDate).format("MMMM D, YYYY")}
                              </Typography>
                            </Stack>
                            <IconButton>
                              <Icon
                                type="pencil"
                                size="small"
                                variant="lightened"
                              />
                            </IconButton>
                          </Stack>
                        </Card>
                      ) : (
                        <Button
                          variant="lightened"
                          onClick={() => setAddOpenDateModalOpen(true)}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Icon type="plus" />
                            <Typography variant="bodyRegular">
                              {t("ssj_ui_content.add_open_date")}
                            </Typography>
                          </Stack>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {assignedSteps > 0 ? (
                <Card variant="primaryLightened">
                  <Grid container alignItems="center">
                    <Grid item flex={1} data-cy="you-have-tasks-statement">
                      <Stack direction="row" spacing={2}>
                        <Typography variant="h3" bold>
                          {t("ssj_ui_content.you_have")}{" "}
                        </Typography>
                        <Typography variant="h3" highlight bold>
                          {assignedSteps} {t("ssj_ui_content.task")}
                          {assignedSteps > 1 ? `s` : null}
                        </Typography>{" "}
                        <Typography variant="h3" bold>
                          {t("ssj_ui_content.on_your_to_do_list")}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Link href={`/ssj/${workflow}/to-do-list`}>
                        <Button>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Typography variant="bodyLarge" bold light>
                              {t("ssj_ui_content.start_working")}
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
                            {t("ssj_ui_content.looks_like_you_have_no_tasks")}
                          </Typography>
                          <Typography variant="bodyLarge" lightened>
                            {t("ssj_ui_content.to_start_try_a_milestone")}
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
                          {milestonesToDo?.map((m, i) => (
                            <Link
                              href={`/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                              key={i}
                            >
                              <Card variant="light" size="small" hoverable>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="bodyRegular" bold>
                                    {m.attributes[
                                      getTranslatedAttr(router.locale, "title")
                                    ] || m.attributes.title}
                                  </Typography>
                                  <Button small variant="text">
                                    {t("ssj_ui_content.start_here")}
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

              <Stack spacing={3} sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h3" bold>
                      {t("ssj_ui_content.your_startup_family")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => setAddPartnerModalOpen(true)}
                      disabled={team?.data.data.attributes.invitedPartner}
                    >
                      <Icon type="plus" variant="lightened" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="stretch">
                  {partners && partners.length ? (
                    partners?.map((p, i) => (
                      <Grid item xs={12} sm={4} key={i}>
                        <UserCard
                          key={p.id}
                          firstName={p.attributes.firstName}
                          lastName={p.attributes.lastName}
                          email={p.attributes.email}
                          phone={p.attributes.phone}
                          role={t("ssj_ui_content.partner")}
                          profileImage={p.attributes.imageUrl}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12} sm={4}>
                      <AddPartnerCard
                        team={team}
                        submittedPartnerRequest={
                          submittedPartnerRequest ||
                          team?.data?.data?.attributes?.invitedPartner
                        }
                        onClick={() => setAddPartnerModalOpen(true)}
                      />
                    </Grid>
                  )}
                  {opsGuide ? (
                    <Grid item xs={12} sm={4}>
                      <UserCard
                        firstName={opsGuide?.firstName}
                        lastName={opsGuide?.lastName}
                        email={opsGuide?.email}
                        phone={opsGuide?.phone}
                        profileImage={opsGuide?.imageUrl}
                        role={t("ssj_ui_content.operations_guide")}
                      />
                    </Grid>
                  ) : null}
                  {regionalGrowthLead ? (
                    <Grid item xs={12} sm={4}>
                      <UserCard
                        firstName={regionalGrowthLead?.firstName}
                        lastName={regionalGrowthLead?.lastName}
                        email={regionalGrowthLead?.email}
                        phone={regionalGrowthLead?.phone}
                        profileImage={regionalGrowthLead?.imageUrl}
                        role={t("ssj_ui_content.regional_growth_lead")}
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </Stack>

              {userOnboardedprogress ? (
                <Stack spacing={6}>
                  <Typography variant="h3" bold>
                    {t("ssj_ui_content.your_progress")}
                  </Typography>
                  <Stack direction="row" spacing={6}>
                    <Typography
                      variant="bodyLarge"
                      bold
                      hoverable
                      lightened={!viewPhaseProgress}
                      onClick={() => setViewPhaseProgress(true)}
                    >
                      {t("ssj_ui_content.phases")}
                    </Typography>
                    <Typography
                      variant="bodyLarge"
                      bold
                      hoverable
                      lightened={viewPhaseProgress}
                      onClick={() => setViewPhaseProgress(false)}
                    >
                      {t("ssj_ui_content.categories")}
                    </Typography>
                  </Stack>

                  {viewPhaseProgress ? (
                    <Grid container spacing={3}>
                      {progress?.by_phase?.map((p, i) => (
                        <Grid item xs={12} sm={4} key={i}>
                          <PhaseProgressCard
                            phase={p.name}
                            link={`/ssj/${workflow}/${p.name}`}
                            processes={p.statuses}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Grid container spacing={3} alignItems="stretch">
                      {progress?.by_category?.map((c, i) => (
                        <Grid item xs={12} sm={4}>
                          <Link href={`/ssj/${workflow}/milestones`}>
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
                                      size="small"
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
                  <Typography variant="h3" bold capitalize>
                    {t("ssj_ui_content.ways_to_work_together")}
                  </Typography>
                  <Grid container spacing={3}>
                    {waysToWorkTogether?.map((w, i) => (
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
              {/* {userOnboardedPeers ? (
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
                          There are {currentETLs.length} other Emerging Teacher
                          Leaders
                        </Typography>
                        <Typography variant="bodyRegular" lightened>
                          Get to know a growing number of Emerging Teacher
                          Leaders in the journey
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={6}>
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
              )} */}
            </Stack>
          )}
        </PageContainer>
      )}

      <FirstTimeUserModal
        toggle={() => setFirstTimeUserModalOpen(!firstTimeUserModalOpen)}
        open={firstTimeUserModalOpen}
        firstName="Jane"
      />
      <AddPartnerModal
        setSubmittedPartnerRequest={setSubmittedPartnerRequest}
        toggle={() => setAddPartnerModalOpen(!addPartnerModalOpen)}
        open={addPartnerModalOpen}
        team={team}
      />
      {/* <ViewEtlsModal
        toggle={() => setViewEtlsModalOpen(!viewEtlsModalOpen)}
        open={viewEtlsModalOpen}
        etls={currentETLs}
      /> */}
      <AddOpenDateModal
        toggle={() => setAddOpenDateModalOpen(!addOpenDateModalOpen)}
        open={addOpenDateModalOpen}
        openDate={openDate}
        setOpenDate={setOpenDate}
        team={team}
      />
    </>
  );
};

export default SSJ;

const EditBadge = ({ url }) => {
  return (
    <Link href={url}>
      <Box
        sx={{
          background: "white",
          border: "1px solid #eaeaea",
          borderRadius: "24px",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon type="pencil" size="small" variant="lightened" />
      </Box>
    </Link>
  );
};

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
  const numberOfProcesses = processes?.length;
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

  let p = processes;
  let reverseProcesses = [...p].reverse();

  const { t } = useTranslation("common");

  return (
    <Stack spacing={3}>
      <Typography variant="bodyMini" bold lightened uppercase>
        {processes.filter((p) => p === "done").length} {t("ssj_ui_content.of")}{" "}
        {processes.length} {t("ssj_ui_content.milestones_completed")}
      </Typography>
      <Stack spacing={1} direction="row">
        {reverseProcesses?.map((p, i) => (
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

  const { t } = useTranslation("common");
  return (
    <Link href={link}>
      <Card
        variant={isCurrentPhase ? "primaryOutlined" : "lightened"}
        hoverable
      >
        <Stack spacing={6}>
          <Typography variant="bodyLarge" bold capitalize>
            {t(`ssj_phases.${phase.toLowerCase()}`)}
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
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
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
  const { t } = useTranslation("common");
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
                  ? `${t("ssj_ui_content.and")} ${
                      waysToWork.resources.slice(3).length
                    } ${t("ssj_ui_content.more")}`
                  : t("ssj_ui_content.view_more")}
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

const ETLs = ({ etls }) => {
  return (
    <Grid container spacing={3}>
      {etls.map((f, i) => (
        <Grid item xs={12} sm={6} key={i}>
          <UserCard
            firstName={f.attributes.firstName}
            lastName={f.attributes.lastName}
            role={f.attributes.roleList[0]}
            profileImage={f.attributes.imageUrl}
            email={f.attributes.email}
          />
        </Grid>
      ))}
    </Grid>
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
    <Modal title="Add your anticipated open date" toggle={toggle} open={open}>
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
// const ViewEtlsModal = ({ toggle, open, etls }) => {
//   return (
//     <Modal title="Meet your peers" toggle={toggle} open={open}>
//       <Stack spacing={3}>
//         <ETLs etls={etls} />
//       </Stack>
//     </Modal>
//   );
// };
const WaysToWorkModal = ({ toggle, open, title, resources }) => {
  return (
    <Modal title={title} toggle={toggle} open={open}>
      <Stack spacing={2}>
        {resources?.map((r, i) => (
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
                here. This is My Wildflower, a tool we created to centralize all
                of the support and resources we have to offer, and to make it
                easier for you to make progress toward your goals.
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
const AddPartnerModal = ({
  toggle,
  open,
  setSubmittedPartnerRequest,
  team,
}) => {
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

  const { t } = useTranslation("common");

  return (
    <Modal title="Add a partner" toggle={toggle} open={open}>
      <Stack spacing={3}>
        {isSubmitSuccessful ? (
          <Card variant="lightened" size="large">
            <Stack spacing={6}>
              <Typography variant="h4" bold>
                {t("ssj_ui_content.thanks_for_making_a_request_to_add_partner")}
              </Typography>
              <Typography variant="bodyLarge">
                {t("ssj_ui_content.someone_will_be_in_touch_shortly")}
              </Typography>
              <Typography variant="bodyRegular" lightened>
                {t("ssj_ui_content.in_the_mean_time_reach_out_to_support")}
              </Typography>
            </Stack>
          </Card>
        ) : (
          <>
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
                      {t("ssj_ui_content.cancel")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button type="submit" disabled={isSubmitting}>
                      <Typography light>
                        {t("ssj_ui_content.invite_partner")}
                      </Typography>
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

  const { t } = useTranslation("common");

  return (
    <Card
      variant={submittedPartnerRequest ? "lightened" : "primaryOutlined"}
      size="small"
      hoverable={!submittedPartnerRequest}
      onClick={submittedPartnerRequest ? null : onClick}
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
                {t("ssj_ui_content.were_adding_your_partner")}
              </Typography>
              <Typography variant="bodySmall" lightened>
                {t("ssj_ui_content.check_back_soon")}
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
                {t("ssj_ui_content.add_a_partner")}
              </Typography>
              <Typography variant="bodySmall" lightened>
                {t("ssj_ui_content.add_a_partner_to_collaborate")}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
