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
import useAssignedSteps from "@hooks/useAssignedSteps";
import useMilestones from "@hooks/useMilestones";
import useSchool from "@hooks/useSchool";
import { useMemo, useEffect } from "react";

const SchoolPage = () => {
  const router = useRouter();
  const { schoolId, workflow } = router.query;
  // const workflow = "5c8f-d17c"; //static for now
  const { currentUser } = useUserContext();
  const { t } = useTranslation("common");

  const { data: school } = useSchool(schoolId);
  console.log({ school });

  const { milestones, isLoading } = useMilestones(
    school?.data?.attributes?.workflowIds[0]
  );
  console.log({ milestones });

  // Filter milestones based on school status and conditions
  const milestonesToDo = useMemo(() => {
    if (isLoading) return [];
    if (!milestones?.data?.data || !school?.data?.attributes) return [];

    const isOpen = school?.data?.attributes?.status === "Open";
    const currentPhase = school?.data?.attributes?.currentPhase;
    const currentDate = new Date();

    // Get start and end of current month
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // For open schools: get milestones with due dates in current month
    const openSchoolMilestones = isOpen
      ? milestones.data.data.filter((milestone) => {
          const dueDate = milestone?.attributes?.dueDate
            ? new Date(milestone?.attributes?.dueDate)
            : null;
          return dueDate && dueDate >= startOfMonth && dueDate <= endOfMonth;
        })
      : [];

    // For schools in progress: get milestones matching current phase
    const phaseBasedMilestones = !isOpen
      ? milestones.data.data.filter(
          (milestone) => milestone?.attributes?.phase === currentPhase
        )
      : [];

    // Prefer open school milestones if they exist
    return openSchoolMilestones.length > 0
      ? openSchoolMilestones
      : phaseBasedMilestones;
  }, [milestones, school, isLoading]);

  // console.log({ currentUser });
  console.log({ school });
  console.log({ milestones });
  console.log({ milestonesToDo });

  const hero = "/assets/images/ssj/SSJ_hero.jpg";

  // Build teamMembers array from school.included
  const teamMembers = useMemo(() => {
    if (!school?.included) return [];

    return school.included.filter((item) => item.type === "person");
  }, [school]);

  useEffect(() => {
    console.log("Team Members:", teamMembers);
  }, [teamMembers]);

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
            heroImage={
              school?.data?.attributes?.heroImageUrl
                ? school?.data?.attributes?.heroImageUrl
                : hero
            }
            logoImage={
              school?.data?.attributes?.logoImageUrl
                ? school?.data?.attributes?.logoImageUrl
                : null
            }
            phase={school?.data?.attributes?.phase}
            location={school?.data?.attributes?.location}
            openDate={school?.data?.attributes?.openDate}
            teamMembers={teamMembers}
            status={school?.data?.attributes?.status}
            schoolName={school?.data?.attributes?.name}
            openedOn={school?.data?.attributes?.openedOn}
            schoolId={schoolId}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack spacing={12}>
            <Typography variant="h2">
              Welcome, {currentUser?.attributes?.firstName}!
            </Typography>

            <AssignedStepsCard
              workflows={school?.data?.attributes?.workflowIds}
              milestonesToDo={milestonesToDo}
              schoolId={schoolId}
              schoolStatus={school?.data?.attributes?.status}
              currentPhase={school?.data?.attributes?.currentPhase}
            />

            {/* <SchoolProgress progress={progress} workflow={workflow} /> */}

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
