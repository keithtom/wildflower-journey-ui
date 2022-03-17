import React, { useState, useEffect } from "react";
import SchoolProfileContent from '@components/page-content/SchoolProfileContent'
import Head from 'next/head'
import { PageContainer } from '@ui'



const SchoolProfilePage = ({}) => {
  // API call gets user data, their school.
  const [school, setSchool] = useState();

  useEffect(() => {
    getSchool({setSchool: setSchool});
  }, []);
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
        <SchoolProfileContent />
      </PageContainer>

    </>
  )
}

export default SchoolProfilePage
