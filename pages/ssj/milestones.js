import { useState } from "react";
import { getCookie } from "cookies-next";
import ssj_categories from "@lib/ssj/categories"

import {
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  Grid,
  Chip,
} from "@ui";
import CategoryChip from "../../components/CategoryChip";
import PhaseChip from "../../components/PhaseChip";
import Milestone from "../../components/Milestone";
import Hero from "../../components/Hero";
import getAuthHeader from "../../lib/getAuthHeader";
import axios from "axios";

const Milestones = ({ processByCategory, processByPhase }) => {
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

  // console.log({ processByCategory });
  // console.log({ processByPhase });

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
          ? processByCategory.map((a, i) =>
              a.processes.length ? (
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
                          stepCount={m.attributes.stepsCount}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              ) : null
            )
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
  const config = getAuthHeader({ req, res });
  
  const workflowId = getCookie("workflowId", { req, res });
  const apiRoute = `${process.env.API_URL}/v1/workflow/workflows/${workflowId}/processes`;
  const response = await axios.get(apiRoute, config);
  const data = await response.data;

  const groupedFinanceProcesses = data.data.filter((d) =>
    d.attributes.categories.includes(ssj_categories.FINANCE)
  );
  const groupedFacilitiesProcesses = data.data.filter((d) =>
    d.attributes.categories.includes(ssj_categories.FACILITIES)
  );
  const groupedGovernanceComplianceProcesses = data.data.filter((d) =>
    d.attributes.categories.includes(ssj_categories.GOVERNANCE_COMPLIANCE)
  );
  const groupedHumanResourcesProcesses = data.data.filter((d) =>
    d.attributes.categories.includes(ssj_categories.HUMAN_RESOURCES)
  );
  const groupedCommunityFamilyEngagementProcesses = data.data.filter((d) =>
    d.attributes.categories.includes(ssj_categories.COMMUNITY_FAMILY_ENGAGEMENT)
  );
  const groupedClassroomProgramPracticesProcesses = data.data.filter((d) =>
    d.attributes.categories.includes(ssj_categories.CLASSROOM_PROGRAM_PRACTICES)
  );
  const groupedAlbumsProcesses = data.data.filter((d) =>
    d.attributes.categories.includes(ssj_categories.ALBUMS_ADVICE)
  );
  
  const processByCategory = [
    { 
      category: ssj_categories.FINANCE,
      processes:groupedFinanceProcesses
    },
    { 
      category: ssj_categories.FACILITIES,
      processes: groupedFacilitiesProcesses
    },
    {
      category: ssj_categories.GOVERNANCE_COMPLIANCE,
      processes: groupedGovernanceComplianceProcesses,
    },
    { 
      category: ssj_categories.HUMAN_RESOURCES,
      processes: groupedHumanResourcesProcesses
    },
    {
      category: ssj_categories.COMMUNITY_FAMILY_ENGAGEMENT,
      processes: groupedCommunityFamilyEngagementProcesses,
    },
    {
      category: ssj_categories.CLASSROOM_PROGRAM_PRACTICES,
      processes: groupedClassroomProgramPracticesProcesses,
    },
    { 
      category: ssj_categories.ALBUMS_ADVICE,
      processes: groupedAlbumsProcesses
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
      processByCategory,
      processByPhase,
    },
  };
}
