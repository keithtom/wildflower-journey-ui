import Head from "next/head";

import AdviceDraftsContent from "@components/page-content/advice/AdviceDraftsContent";
import { PageContainer, Grid } from "@ui";

const AdviceDraftsPage = ({ drafts }) => {
  // console.log(drafts)

  return (
    <>
      <Head>
        <title>Wildflower Advice Process</title>
        <meta name="title" content="Wildflower Advice Process" />
        <meta
          property="og:site_name"
          content="Wildflower Advice Process"
          key="og_wf_site_name"
        />
        <meta name="description" content="Wildflower Advice Process" />
        <meta name="keywords" content="Wildflower, Advice, Montessori" />
        <meta
          property="og:title"
          content="Wildflower Advice Process"
          key="og_wf_site_title"
        />
        <meta
          property="og:description"
          content="Wildflower Advice Process"
          key="og_wf_site_description"
        />
      </Head>

      <PageContainer>
        <Grid container p={8}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <AdviceDraftsContent drafts={drafts} />
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const userId = query.userId;
  const decisionState = "draft";
  const apiRoute = `https://api.wildflowerschools.org/v1/advice/people/${userId}/decisions`;

  const res = await fetch(apiRoute);
  const data = await res.json();

  const drafts = data.data.filter(
    (decision) => decision.attributes.state === decisionState
  );

  return {
    props: {
      drafts,
    },
  };
}

export default AdviceDraftsPage;
