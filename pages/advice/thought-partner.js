import Head from 'next/head'
import AdviceProcessNavigation from '@components/page-content/advice/AdviceProcessNavigation'
import AdviceThoughtPartnerContent from '@components/page-content/advice/AdviceThoughtPartnerContent'
import {
  PageContainer,
  Grid
} from '@ui'

const AdviceThoughtPartnerPage = () => {
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
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}><AdviceProcessNavigation /></Grid>
          <Grid item xs={12} sm={8}><AdviceThoughtPartnerContent /></Grid>
        </Grid>
      </Grid>
      </PageContainer>
    </>
  )
}

export default AdviceThoughtPartnerPage
