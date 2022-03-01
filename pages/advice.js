import Head from 'next/head'
import AdviceContent from '@components/page-content/AdviceContent'
import PageContainer from '@components/ui/PageContainer'

const DirectoryPage = () => {
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
        <AdviceContent />
      </PageContainer>

    </>
  )
}

export default DirectoryPage
