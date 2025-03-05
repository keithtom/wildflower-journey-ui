import { useState } from "react";
import { getCookie } from "cookies-next";
import ssj_categories from "@lib/ssj/categories";
import processesApi from "@api/workflow/processes";
import { useRouter } from "next/router";
import { List, ListItem, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";

import useAuth from "@lib/utils/useAuth";
import { PageContainer, Typography, Card, Stack, Icon, Grid, Chip } from "@ui";
import CategoryChip from "@components/CategoryChip";
import PhaseChip from "@components/PhaseChip";
import Milestone from "@components/Milestone";
import Hero from "@components/Hero";

import getAuthHeader from "@lib/getAuthHeader";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";
import { getTranslatedAttr } from "@lib/utils/getTranslatedAttr";

import useMilestones from "@hooks/useMilestones";

const Milestones = ({}) => {
  const hero = "/assets/images/ssj/wildflowerCollection.jpg";
  const router = useRouter();
  const { workflow, phase } = router.query;

  const { t } = useTranslation("common");

  const [showMilestonesByCategory, setShowMilestonesByCategory] =
    useState(true);
  const [showMilestonesByPhase, setShowMilestonesByPhase] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("en");

  const handleShowMilestonesByCategory = () => {
    setShowMilestonesByCategory(true);
    setShowMilestonesByPhase(false);
  };
  const handleShowMilestonesByPhase = () => {
    setShowMilestonesByPhase(true);
    setShowMilestonesByCategory(false);
  };

  useAuth("/login");

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
                  {t("ssj_ui_content.milestones")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="bodyRegular" lightened>
                  {t("ssj_ui_content.group-by")}
                </Typography>
                <Chip
                  label={t("ssj_ui_content.category")}
                  variant={showMilestonesByCategory && "primary"}
                  onClick={handleShowMilestonesByCategory}
                />
                <Chip
                  label={t("ssj_ui_content.phase")}
                  variant={showMilestonesByPhase && "primary"}
                  onClick={handleShowMilestonesByPhase}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        {showMilestonesByCategory ? (
          <MilestonesByCategory workflow={workflow} />
        ) : (
          showMilestonesByPhase && <MilestonesByPhase workflow={workflow} />
        )}
      </Stack>
    </PageContainer>
  );
};

export default Milestones;

const MilestonesByCategory = ({ workflow }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const { t } = useTranslation("common");
  const { isLoadingMilestonesByCategory, milestonesByCategory } = useMilestones(
    workflow,
    { omit_include: true }
  );

  const phaseOrder = ["visioning", "planning", "startup"];
  const sortedMilestonesByCategory = milestonesByCategory?.map((category) => ({
    ...category,
    milestones: category.milestones.sort((a, b) => {
      return (
        phaseOrder.indexOf(a.attributes.phase) -
        phaseOrder.indexOf(b.attributes.phase)
      );
    }),
  }));

  return isLoadingMilestonesByCategory ? (
    <Stack spacing={6}>
      {Array.from({ length: 12 }, (_, i) => (
        <Card key={i}>
          <Stack spacing={6}>
            <Skeleton width={240} height={48} />
            <Stack spacing={3}>
              {Array.from({ length: 16 }, (_, j) => (
                <Skeleton key={j} height={64} m={0} variant="rounded" />
              ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  ) : (
    sortedMilestonesByCategory?.map((a, i) =>
      a.milestones.length ? (
        <Card key={i} noPadding>
          <List
            subheader={
              <Card variant="lightened" size="small" noRadius>
                <Stack direction="row" spacing={5} pl={1} alignItems="center">
                  <CategoryChip category={a.category} size="small" />
                  <Typography variant="bodyRegular" lightened>
                    {a.milestones.length}
                  </Typography>
                </Stack>
              </Card>
            }
          >
            {a.milestones?.map((m, i) => (
              <Milestone
                link={`/school/${schoolId}/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
                key={i}
                status={m.attributes.status}
                title={
                  m.attributes[getTranslatedAttr(router.locale, "title")] ||
                  m.attributes.title
                }
                description={
                  m.attributes[
                    getTranslatedAttr(router.locale, "description")
                  ] || m.attributes.description
                }
                phase={t(`ssj_phases.${m.attributes.phase}`)}
                categories={m.attributes.categories}
                hideCategoryChip
                stepCount={m.attributes.stepsCount}
              />
            ))}
          </List>
        </Card>
      ) : null
    )
  );
};
const MilestonesByPhase = ({ workflow }) => {
  const router = useRouter();
  const { schoolId } = router.query;
  const { t } = useTranslation("common");
  const { isLoadingMilestonesByPhase, milestonesByPhase } =
    useMilestones(workflow);
  // console.log({ milestonesByPhase });
  const phaseOrder = ["Visioning", "Planning", "Startup"];
  milestonesByPhase?.sort(
    (a, b) => phaseOrder.indexOf(a.phase) - phaseOrder.indexOf(b.phase)
  );
  return isLoadingMilestonesByPhase ? (
    <Stack spacing={6}>
      {Array.from({ length: 12 }, (_, i) => (
        <Card key={i}>
          <Stack spacing={6}>
            <Skeleton width={240} height={48} />
            <Stack spacing={3}>
              {Array.from({ length: 16 }, (_, j) => (
                <Skeleton key={j} height={64} m={0} variant="rounded" />
              ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  ) : (
    milestonesByPhase?.map((m, i) => (
      <Card key={i} noPadding>
        <List
          subheader={
            <Card variant="lightened" size="small" noRadius>
              <Stack direction="row" spacing={5} pl={1} alignItems="center">
                <PhaseChip
                  phase={t(`ssj_phases.${m.phase.toLowerCase()}`)}
                  size="small"
                />
                <Typography variant="bodyRegular" lightened>
                  {m.milestones.length}
                </Typography>
              </Stack>
            </Card>
          }
        >
          {m.milestones?.map((m, i) => (
            <Milestone
              link={`/school/${schoolId}/ssj/${workflow}/${m.attributes.phase}/${m.id}`}
              key={i}
              title={
                m.attributes[getTranslatedAttr(router.locale, "title")] ||
                m.attributes.title
              }
              description={
                m.attributes[getTranslatedAttr(router.locale, "description")] ||
                m.attributes.description
              }
              categories={m.attributes.categories}
              stepCount={m.attributes.stepsCount}
              status={m.attributes.status}
            />
          ))}
        </List>
      </Card>
    ))
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
