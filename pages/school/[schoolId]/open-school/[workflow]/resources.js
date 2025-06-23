import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

import useAuth from "@lib/utils/useAuth";
import useResources from "@hooks/useResources";
import useSchool from "@hooks/useSchool";
import { PageContainer, Grid, Typography, Card, Stack, Icon } from "@ui";
import CategoryChip from "@components/CategoryChip";
import Resource from "@components/Resource";
import Hero from "@components/Hero";

const Resources = () => {
  const router = useRouter();
  const { workflow: workflowId, schoolId } = router.query;

  const { data: school } = useSchool(schoolId, {
    serialization_fields: ["name"],
  });

  useAuth("/login");

  const {
    resources,
    isLoading: resourcesLoading,
    isError,
  } = useResources(workflowId);

  // Transform resources data if needed
  const transformedResources = useMemo(() => {
    if (!resources) return null;

    // If resources already has the correct structure, return as is
    if (resources.by_category) {
      return resources.by_category;
    }

    // If resources is an array, transform it into the expected structure
    if (Array.isArray(resources)) {
      const byCategory = {};

      resources.forEach((resource) => {
        // Handle categories as an array of strings
        const categories = resource.attributes?.categories || [];

        // If no categories, add to Uncategorized
        if (categories.length === 0) {
          if (!byCategory["Uncategorized"]) {
            byCategory["Uncategorized"] = [];
          }
          byCategory["Uncategorized"].push({ data: resource });
        } else {
          // Add resource to each of its categories
          categories.forEach((category) => {
            if (!byCategory[category]) {
              byCategory[category] = [];
            }
            byCategory[category].push({ data: resource });
          });
        }
      });

      // Convert to the expected format
      return Object.entries(byCategory).map(([key, value]) => ({
        [key]: value,
      }));
    }

    return null;
  }, [resources]);

  const hero = "/assets/images/ssj/wildflowerSystems.jpg";

  // Add a simple initial render to verify data
  if (resourcesLoading) {
    return (
      <PageContainer>
        <Typography>Loading resources...</Typography>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <Typography>Error loading resources</Typography>
      </PageContainer>
    );
  }

  if (!transformedResources) {
    return (
      <PageContainer>
        <Typography>No resources available</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={school?.data.attributes.name}>
      <Stack spacing={12}>
        <Hero imageUrl={hero} />
        <Stack spacing={2}>
          <Grid container alignItems="center">
            <Grid item>
              <Stack spacing={6} direction="row" alignItems="center">
                <Icon type="fileBlank" variant="primary" size="large" />
                <Typography variant="h3" bold capitalize>
                  Resources
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        {resourcesLoading ? (
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
          transformedResources?.map((a, i) => {
            const name = Object.keys(a)[0];
            const array = Object.values(a);
            return array[0]?.length ? (
              <Card key={i}>
                <Stack spacing={6}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <CategoryChip category={name} size="large" />
                    <Typography variant="h4" lightened>
                      {array[0].length}
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    {array[0]?.map((r, i) => (
                      <Resource
                        title={r.data.attributes.title}
                        link={r.data.attributes.link}
                        key={i}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ) : null;
          })
        )}
      </Stack>
    </PageContainer>
  );
};

export default Resources;

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
