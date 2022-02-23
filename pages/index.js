import Head from 'next/head'

import PageContainer from '../components/ui/PageContainer'

export default function Home() {

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | School Profile</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta property="og:site_name" content="Wildflower Schools Directory" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta name="keywords" content="Wildflower, Schools, Directory, Montessori" />
        <meta property="og:title" content="Wildflower Schools Directory" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Schools Directory" key="og_wf_site_description" />
      </Head>

      <PageContainer>
        <h1>Welcome to Wildflower Schools</h1>
      </PageContainer>
    </>
  )
}
