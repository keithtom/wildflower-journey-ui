import { useState } from "react";
import { getCookie } from 'cookies-next';

import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Grid,
  Chip,
  Avatar,
  Divider,
} from "@ui";
import CategoryChip from "../../components/CategoryChip";
import PhaseChip from "../../components/PhaseChip";
import Milestone from "../../components/Milestone";
import Hero from "../../components/Hero";
import setAuthHeader from "../../lib/setAuthHeader";
import axios from "axios";
import baseUrl from "@lib/utils/baseUrl";

const Milestones = ({ data, processByCategory, processByPhase }) => {
  const [showMilestonesByCategory, setShowMilestonesByCategory] =
    useState(true);
  const [showMilestonesByPhase, setShowMilestonesByPhase] = useState(false);

  const handleShowMilestonesByCategory = () => {
    setShowMilestonesByCategory(true);
    setShowMilestonesByPhase(false);
  };
  const handleShowMilestonesByPhase = () => {
    setShowMilestonesByPhase(true);
    setShowMilestonesByCategory(false);
  };

  // console.log({ data });
  // console.log({ processByCategory });
  // console.log({ processByPhase });
  // console.log({ dataResources });
  // console.log({ dataAssignedSteps });

  // console.log(Object.keys(dataResources[0])[0]);

  const hero = "/assets/images/ssj/wildflowerCollection.jpg";

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Hero imageUrl={hero} />
        <Stack spacing={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack spacing={6} direction="row" alignItems="center">
                <Icon type="layer" variant="primary" size="large" />
                <Typography variant="h3" bold>
                  Milestones
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="bodyRegular" lightened>
                  Group by
                </Typography>
                <Chip
                  label="Category"
                  variant={showMilestonesByCategory && "primary"}
                  onClick={handleShowMilestonesByCategory}
                />
                <Chip
                  label="Phase"
                  variant={showMilestonesByPhase && "primary"}
                  onClick={handleShowMilestonesByPhase}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        {showMilestonesByCategory
          ? processByCategory.map((a, i) => (
              <Card key={i}>
                <Stack spacing={6}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <CategoryChip category={a.category} size="large" />
                    <Typography variant="h4" lightened>
                      {a.processes.length}
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    {a.processes.map((m, i) => (
                      <Milestone
                        link={`/ssj/${m.attributes.phase}/${m.id}`}
                        key={i}
                        status={m.attributes.status}
                        description={m.attributes.description}
                        categories={m.attributes.categories}
                        hideCategoryChip
                        phase={m.attributes.phase}
                        title={m.attributes.title}
                        effort={m.attributes.effort}
                        stepCount={m.attributes.stepsCount}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ))
          : showMilestonesByPhase &&
            processByPhase.map((p, i) => (
              <Card key={i}>
                <Stack spacing={6}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <PhaseChip phase={p.phase} size="large" />
                    <Typography variant="h4" lightened>
                      {p.processes.length}
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    {p.processes.map((m, i) => (
                      <Milestone
                        link={`/ssj/${m.attributes.phase}/${m.id}`}
                        key={i}
                        status={m.attributes.status}
                        description={m.attributes.description}
                        categories={m.attributes.categories}
                        title={m.attributes.title}
                        effort={m.attributes.effort}
                        stepCount={m.attributes.stepsCount}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ))}

        {/* {showMilestonesByPhase &&
          processByPhase.map((p, i) => {
            <div>hi</div>;
          })} */}
      </Stack>
    </PageContainer>
  );
};

export default Milestones;

export async function getServerSideProps({ req, res }) {
  // const userId = query.userId;
  // const ssjId = query.ssjId;

  const workflowId = getCookie('workflowId', { req, res });
  const apiRoute = `${baseUrl}/v1/workflow/workflows/${workflowId}/processes`;
  setAuthHeader({ req, res });
  const response = await axios.get(apiRoute);
  const data = await response.data;

  const groupedFinanceProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Finance")
  );
  const groupedFacilitiesProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Facilities")
  );
  const groupedGovernanceComplianceProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Governance & Compliance")
  );
  const groupedHumanResourcesProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Human Resources")
  );
  const groupedCommunityFamilyEngagementProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Community & Family Engagement")
  );
  const groupedClassroomProgramPracticesProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Classroom & Program Practices")
  );
  const groupedAlbumsProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Albums")
  );
  const groupedAdviceAffiliationProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("Advice & Affiliation")
  );
  const groupedCommunityCultureProcesses = data.data.filter((d) =>
    d.attributes.categories.includes("WF Community & Culture")
  );

  const processByCategory = [
    { category: "Finance", processes: groupedFinanceProcesses },
    { category: "Facilities", processes: groupedFacilitiesProcesses },
    {
      category: "Governance & Compliance",
      processes: groupedGovernanceComplianceProcesses,
    },
    { category: "Human Resources", processes: groupedHumanResourcesProcesses },
    {
      category: "Community & Family Engagement",
      processes: groupedCommunityFamilyEngagementProcesses,
    },
    {
      category: "Classroom & Program Practices",
      processes: groupedClassroomProgramPracticesProcesses,
    },
    { category: "Albums", processes: groupedAlbumsProcesses },
    {
      category: "Advice & Affiliation",
      processes: groupedAdviceAffiliationProcesses,
    },
    {
      category: "WF Community & Culture",
      processes: groupedCommunityCultureProcesses,
    },
  ];

  const processByPhaseHash = {
    visioning: [],
    planning: [],
    startup: [],
  };

  data.data.forEach((process) => {
    if (process.attributes.phase !== null) {
      processByPhaseHash[process.attributes.phase].push(process);
    }
  });

  const processByPhase = [
    { phase: "Visioning", processes: processByPhaseHash["visioning"] },
    { phase: "Planning", processes: processByPhaseHash["planning"] },
    { phase: "Startup", processes: processByPhaseHash["startup"] },
  ];

  return {
    props: {
      data: data.data,
      processByCategory,
      processByPhase,
    },
  };
}
