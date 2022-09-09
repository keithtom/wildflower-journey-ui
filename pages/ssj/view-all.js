import { useState } from "react";

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
} from "@ui";
import CategoryChip from "../../components/CategoryChip";
import Milestone from "../../components/Milestone";
import Resource from "../../components/Resource";

const DiscoveryPage = ({}) => {
  const [showMilestonesByCategory, setShowMilestonesByCategory] =
    useState(true);
  const [showMilestonesByAssignee, setShowMilestonesByAssignee] =
    useState(false);
  const [showResourcesByCategory, setShowResourcesByCategory] = useState(false);

  const handleShowMilestonesByCategory = () => {
    setShowMilestonesByCategory(true);
    setShowMilestonesByAssignee(false);
    setShowResourcesByCategory(false);
  };
  const handleShowMilestonesByAssignee = () => {
    setShowMilestonesByCategory(false);
    setShowMilestonesByAssignee(true);
    setShowResourcesByCategory(false);
  };
  const handleShowResourcesByCategory = () => {
    setShowMilestonesByCategory(false);
    setShowMilestonesByAssignee(false);
    setShowResourcesByCategory(true);
  };

  return (
    <PageContainer>
      <Stack spacing={12}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href="/ssj">
              <IconButton>
                <Icon type="chevronLeft" />
              </IconButton>
            </Link>
            <Typography>Dashboard</Typography>
          </Stack>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack spacing={2}>
                <Typography variant="h3" bold>
                  View all
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="bodyRegular" lightened>
                  View
                </Typography>
                <Chip
                  label="Milestones by Category"
                  variant={showMilestonesByCategory && "primary"}
                  onClick={handleShowMilestonesByCategory}
                />
                <Chip
                  label="Milestones by Assignee"
                  variant={showMilestonesByAssignee && "primary"}
                  onClick={handleShowMilestonesByAssignee}
                />
                <Chip
                  label="Resources by Category"
                  variant={showResourcesByCategory && "primary"}
                  onClick={handleShowResourcesByCategory}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        {showMilestonesByCategory &&
          FakeMilestonesByCategory.map((a, i) => (
            <Card key={i}>
              <Stack spacing={6}>
                <Stack direction="row" spacing={6} alignItems="center">
                  <CategoryChip category={a.category} size="large" withIcon />
                  <Typography variant="h4" lightened>
                    {a.milestones.length}
                  </Typography>
                </Stack>
                <Stack spacing={3}>
                  {a.milestones.map((m, i) => (
                    <Milestone
                      key={i}
                      title={m.title}
                      effort={m.effort}
                      phase={m.phase}
                      assignee={m.assignee}
                    />
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}

        {showMilestonesByAssignee &&
          FakeMilestonesByAssignee.map((a, i) => (
            <Card key={i}>
              <Stack spacing={6}>
                <Stack direction="row" spacing={6} alignItems="center">
                  <Avatar src={a.assignee.profileImage} size="sm" />
                  <Typography variant="bodyLarge" bold>
                    {a.assignee.firstName} {a.assignee.lastName}
                  </Typography>
                  <Typography variant="h4" lightened>
                    {a.milestones.length}
                  </Typography>
                </Stack>
                <Stack spacing={3}>
                  {a.milestones.map((m, i) => (
                    <Milestone
                      key={i}
                      title={m.title}
                      effort={m.effort}
                      phase={m.phase}
                      assignee={m.assignee}
                    />
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}

        {showResourcesByCategory &&
          FakeResourcesByCategory.map((a, i) => (
            <Card key={i}>
              <Stack spacing={6}>
                <Stack direction="row" spacing={6} alignItems="center">
                  <CategoryChip category={a.category} size="large" withIcon />
                  <Typography variant="h4" lightened>
                    {a.resources.length}
                  </Typography>
                </Stack>
                <Stack spacing={3}>
                  {a.resources.map((r, i) => (
                    <Resource title={r.title} link="/" key={i} />
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}
      </Stack>
    </PageContainer>
  );
};

export default DiscoveryPage;

const FakeMilestonesByCategory = [
  {
    category: "Album Advice & Affiliation",
    milestones: [
      {
        status: "done",
        title: "Complete your discovery self assessment",
        effort: "small",
        phase: "Discovery",
        assignee: null,
      },
      {
        status: "to do",
        title: "Name your school",
        effort: "small",
        phase: "Visioning",
        assignee: null,
      },
      {
        status: "to do",
        title: "Complete your planning album",
        effort: "small",
        phase: "Planning",
        assignee: null,
      },
    ],
  },
  {
    category: "Community & Family Engagement",
    milestones: [
      {
        status: "done",
        title: "Complete your discovery self assessment",
        effort: "small",
        phase: "Discovery",
        assignee: null,
      },
      {
        status: "to do",
        title: "Name your school",
        effort: "small",
        phase: "Visioning",
        assignee: null,
      },
      {
        status: "to do",
        title: "Complete your planning album",
        effort: "small",
        phase: "Planning",
        assignee: null,
      },
      {
        status: "to do",
        title: "Complete your startup album",
        effort: "small",
        phase: "Startup",
        assignee: null,
      },
    ],
  },
];

const FakeMilestonesByAssignee = [
  {
    assignee: {
      firstName: "Maya",
      lastName: "Walley",
      profileImage:
        "https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    },
    milestones: [
      {
        status: "done",
        title: "Complete your discovery self assessment",
        effort: "small",
        phase: "Discovery",
        category: "Finance",
      },
      {
        status: "to do",
        title: "Name your school",
        effort: "small",
        phase: "Visioning",
        category: "Finance",
      },
      {
        status: "to do",
        title: "Complete your planning album",
        effort: "small",
        phase: "Planning",
        category: "Finance",
      },
      {
        status: "to do",
        title: "Complete your startup album",
        effort: "small",
        phase: "Startup",
        category: "Finance",
      },
    ],
  },
  {
    assignee: {
      firstName: "Kim",
      lastName: "Bolton",
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    },
    milestones: [
      {
        status: "done",
        title: "Complete your discovery self assessment",
        effort: "small",
        phase: "Discovery",
        category: "Human Resources",
      },
      {
        status: "to do",
        title: "Name your school",
        effort: "small",
        phase: "Visioning",
        category: "Human Resources",
      },
      {
        status: "to do",
        title: "Complete your planning album",
        effort: "small",
        phase: "Planning",
        category: "Human Resources",
      },
    ],
  },
];

const FakeResourcesByCategory = [
  {
    category: "Album Advice & Affiliation",
    resources: [
      {
        title: "Wildflower Affiliation Agreement",
        milestone: "Affiliate with Wildflowers",
        phase: "Planning",
      },
      {
        title: "Wildflower Affiliation Agreement",
        milestone: "Affiliate with Wildflowers",
        phase: "Planning",
      },
      {
        title: "Wildflower Affiliation Agreement",
        milestone: "Affiliate with Wildflowers",
        phase: "Planning",
      },
    ],
  },
  {
    category: "Community & Family Engagement",
    resources: [
      {
        title: "Wildflower Affiliation Agreement",
        milestone: "Affiliate with Wildflowers",
        phase: "Planning",
      },
      {
        title: "Wildflower Affiliation Agreement",
        milestone: "Affiliate with Wildflowers",
        phase: "Planning",
      },
      {
        title: "Wildflower Affiliation Agreement",
        milestone: "Affiliate with Wildflowers",
        phase: "Planning",
      },
    ],
  },
];
