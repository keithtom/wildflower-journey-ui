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
import { useDashboardProgress } from "@hooks/useDashboard";
import useSelectedWorkflow from "@hooks/useSelectedWorkflow";
import { useMemo, useEffect } from "react";

const SchoolPage = () => {
  const router = useRouter();
  const { schoolId } = router.query;
  const { currentUser } = useUserContext();
  const { t } = useTranslation("common");

  const { data: school } = useSchool(schoolId);
  const isOpen = school?.data?.attributes?.status === "Open";

  const { selectedWorkflow, isLoading: isLoadingWorkflow } =
    useSelectedWorkflow(school?.data?.attributes?.workflowIds, isOpen);

  const { data: progress, isLoading: isLoadingProgress } = useDashboardProgress(
    selectedWorkflow?.id
  );

  // console.log({ selectedWorkflow });
  // console.log({ currentUser });
  // console.log({ school });
  // console.log({ progress });
  // console.log({ milestones });
  // console.log({ milestonesToDo });

  const hero = "/assets/images/ssj/SSJ_hero.jpg";

  // Build teamMembers array from relationships and included data
  const teamMembers = useMemo(() => {
    if (!school?.data?.relationships?.people?.data || !school?.included)
      return [];

    // First get all active school relationships
    const schoolRelationships = school.included.filter(
      (item) => item.type === "schoolRelationship" && !item.attributes.endDate
    );

    // Get the person IDs from the relationships
    const teamMemberIds = schoolRelationships.map(
      (item) => item.relationships.person.data.id
    );

    // Get the people and merge with their school relationship data
    const teamMembers = school.included
      .filter(
        (item) => teamMemberIds.includes(item.id) && item.type === "person"
      )
      .map((person) => {
        // Find the matching school relationship for this person
        const relationship = schoolRelationships.find(
          (rel) => rel.relationships.person.data.id === person.id
        );

        // Check if person exists in activePartners or invitedPartners
        const isActivePartner = school?.data?.attributes?.activePartners?.some(
          (partner) => partner.data.id === person.id
        );
        const isInvitedPartner =
          school?.data?.attributes?.invitedPartners?.some(
            (partner) => partner.data.id === person.id
          );

        // Return person with roleList from their school relationship and the relationship ID
        return {
          ...person,
          attributes: {
            ...person.attributes,
            schoolRoleList: relationship.attributes.roleList.map((role) =>
              role === "Wildflower Support" && relationship.attributes.title
                ? relationship.attributes.title
                : role
            ),
            schoolInvited: isInvitedPartner
              ? true
              : isActivePartner
              ? false
              : null,
          },
          relationships: {
            ...person.relationships,
            schoolRelationship: {
              data: {
                id: relationship.id,
                type: "schoolRelationship",
              },
            },
          },
        };
      })
      .sort((a, b) => {
        // Sort by isOnboarded status - onboarded members first
        if (a.attributes.isOnboarded === b.attributes.isOnboarded) return 0;
        return a.attributes.isOnboarded ? -1 : 1;
      });

    return teamMembers;
  }, [school]);

  // useEffect(() => {
  //   console.log("Team Members:", teamMembers);
  // }, [teamMembers]);

  const currentUserViewOnly = teamMembers.find(
    (member) =>
      member.id === currentUser?.id &&
      (member.attributes.schoolRoleList.includes("Ops Guide") ||
        member.attributes.schoolRoleList.includes("Foundation Partner") ||
        member.attributes.schoolRoleList.includes("School Support")) &&
      !member.attributes.schoolRoleList.includes("Teacher Leader") &&
      !member.attributes.schoolRoleList.includes("Emerging Teacher Leader")
  );

  // Filter resources based on school status
  const waysToWorkTogether = useMemo(
    () => [
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
            hideWhenOpen: true,
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
        ].filter((resource) => {
          const isOpen = school?.data?.attributes?.status === "Open";
          return !resource.hideWhenOpen || !isOpen;
        }),
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
            hideWhenOpen: true,
          },
          {
            title: t(
              "ways_to_work_together.engage_a_growth_and_connectedness_coach"
            ),
            url: "https://connected.wildflowerschools.org/series/4406175-series-growth-connectedness-coaches",
            type: "Connected Series",
            description: t(
              "ways_to_work_together.engage_a_growth_and_connectedness_coach_description"
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
        ].filter((resource) => {
          const isOpen = school?.data?.attributes?.status === "Open";
          return !resource.hideWhenOpen || !isOpen;
        }),
      },
      {
        name: t("ways_to_work_together.with_your_community"),
        resources: [
          {
            title: t(
              "ways_to_work_together.attend_wildflower_community_events"
            ),
            url: "https://connected.wildflowerschools.org/posts/4634392-wildflower-events-calendar",
            type: "Connected Post",
            description: t(
              "ways_to_work_together.attend_wildflower_community_events_description"
            ),
          },
          {
            title: t(
              "ways_to_work_together.learn_about_wildflower_school_pods"
            ),
            url: "https://connected.wildflowerschools.org/posts/4529540-essay-a-decentralized-network-by-erin-mckay",
            type: "Connected Post",
            description: t(
              "ways_to_work_together.learn_about_wildflower_school_pods_description"
            ),
          },
        ].filter((resource) => {
          const isOpen = school?.data?.attributes?.status === "Open";
          return !resource.hideWhenOpen || !isOpen;
        }),
      },
    ],
    [t, school?.data?.attributes?.status]
  );

  // console.log({ school });

  return (
    <PageContainer title={school?.data.attributes.name}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <SchoolInfoCard
            heroImage={
              school?.data?.attributes?.status === "Open"
                ? school?.data?.attributes?.heroImageUrl
                : hero
            }
            logoImage={
              school?.data?.attributes?.logoUrl
                ? school?.data?.attributes?.logoUrl
                : null
            }
            phase={school?.data?.attributes?.currentPhase}
            location={school?.data?.attributes?.location}
            expectedStartDate={school?.data?.attributes?.expectedStartDate}
            teamMembers={teamMembers}
            status={school?.data?.attributes?.status}
            schoolName={school?.data?.attributes?.name}
            openedOn={school?.data?.attributes?.openedOn}
            schoolId={schoolId}
            currentUserViewOnly={currentUserViewOnly}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack spacing={12}>
            <Typography variant="h2">
              <span style={{ opacity: 0.5 }}>
                {t("ssj_ui_content.welcome")},
              </span>{" "}
              {currentUser?.attributes?.firstName}!
            </Typography>

            {currentUserViewOnly ? null : (
              <AssignedStepsCard
                workflows={school?.data?.attributes?.workflowIds}
                selectedWorkflow={selectedWorkflow}
                schoolId={schoolId}
                schoolStatus={school?.data?.attributes?.status}
                currentPhase={school?.data?.attributes?.currentPhase}
                currentUser={currentUser}
              />
            )}

            {!isLoadingProgress && progress && (
              <SchoolProgress
                progress={progress}
                workflow={selectedWorkflow?.id}
                isOpen={isOpen}
                schoolId={schoolId}
              />
            )}

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
