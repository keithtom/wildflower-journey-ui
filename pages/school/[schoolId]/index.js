import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUserContext } from "@lib/useUserContext";
import { PageContainer, Grid, Typography, Stack } from "@ui";
import Header from "@components/Header";
import SchoolInfoCard from "@components/school/SchoolInfoCard";
import AssignedStepsCard from "@components/school/AssignedStepsCard";
import WaysToWork from "@components/school/WaysToWork";
import SchoolProgress from "@components/school/SchoolProgress";
import useSSJProgress from "@hooks/useSSJProgress";
import useMilestones from "@hooks/useMilestones";
import useSchool from "@hooks/useSchool";
const SchoolPage = () => {
  const router = useRouter();
  const { schoolId, workflow } = router.query;
  // const workflow = "5c8f-d17c"; //static for now
  const { currentUser } = useUserContext();
  const { t } = useTranslation("common");

  const { data: school } = useSchool(schoolId);
  console.log({ school });
  const { assignedSteps, progress } = useSSJProgress(workflow);
  const { milestonesToDo } = useMilestones(workflow, {
    phase: "visioning",
    omit_include: true,
  });

  // console.log({ currentUser });

  const hero = "/assets/images/ssj/SSJ_hero.jpg";

  const teamMembers = [
    {
      name: "Maggie Paulin",
      role: "Emerging Teacher Leader",
      imageUrl: currentUser?.attributes.imageUrl,
    },
    {
      name: "Maggie Paulin",
      role: "Emerging Teacher Leader",
      imageUrl: currentUser?.attributes.imageUrl,
    },
    {
      name: "Maggie Paulin",
      role: "Emerging Teacher Leader",
      imageUrl: currentUser?.attributes.imageUrl,
    },
  ];

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
      name: t("ways_to_work_together.with_your_team"),
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
      name: t("ways_to_work_together.with_your_community"),
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
    <PageContainer title={school?.data.attributes.name}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <SchoolInfoCard
            heroImage={hero}
            phase="Visioning"
            location="Seattle, WA"
            openDate="September 1, 2026"
            teamMembers={teamMembers}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack spacing={12}>
            <Typography variant="h2">
              Welcome, {currentUser?.attributes?.firstName}!
            </Typography>

            <AssignedStepsCard
              assignedSteps={assignedSteps}
              workflow={workflow}
              milestonesToDo={milestonesToDo}
              schoolId={schoolId}
            />

            <SchoolProgress progress={progress} workflow={workflow} />

            <WaysToWork waysToWorkData={waysToWorkTogether} />
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default SchoolPage;
