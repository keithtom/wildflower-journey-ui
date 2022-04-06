import Head from 'next/head'
import AdviceCreateContent from '@components/page-content/advice/AdviceCreateContent'
import {
  PageContainer,
  Grid
} from '@ui'

const AdviceDraftsPage = () => {
  return (
    <>
      <Head>
        <title>Wildflower Advice Process</title>
        <meta name="title" content="Wildflower Advice Process" />
        <meta property="og:site_name" content="Wildflower Advice Process" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Advice Process" />
        <meta name="keywords" content="Wildflower, Advice, Montessori" />
        <meta property="og:title" content="Wildflower Advice Process" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Advice Process" key="og_wf_site_description" />
      </Head>

      <PageContainer>
        <Grid container p={8}>
        <AdviceCreateContent />
      </Grid>
      </PageContainer>
    </>
  )
}

export default AdviceDraftsPage
