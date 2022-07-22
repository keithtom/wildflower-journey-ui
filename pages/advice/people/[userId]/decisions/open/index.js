import Head from 'next/head'

import AdviceOpenContent from '@components/page-content/advice/AdviceOpenContent'
import {
  PageContainer,
  Grid
} from '@ui'

import {
  decisions
} from "@lib/utils/fake-ap-data";

const OpenAdvicePage = ({ openAdvice }) => {

  console.log(openAdvice)

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
          <Grid item xs={12}><AdviceOpenContent openAdvice={openAdvice}/></Grid>
        </Grid>
      </Grid>
      </PageContainer>
    </>
  )
}

export async function getServerSideProps({ query }) {

  const userId = query.userId
  const decisionState = 'open'
  const apiRoute = `https://api.wildflowerschools.org/v1/advice/people/${userId}/decisions`

  const res = await fetch(apiRoute)
  const data = await res.json()

  // const openAdvice = data.data.filter(decision => decision.attributes.state === decisionState)
  const openAdvice = decisions.data.filter(decision => decision.attributes.state === decisionState)

  return {
    props: {
      openAdvice
    }
  }
}


export default OpenAdvicePage
