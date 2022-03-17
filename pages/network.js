import React, { useState } from "react";
import { useApi } from '../hooks/api'

import Head from 'next/head'
import NetworkContent from '@components/page-content/NetworkContent'
import PageContainer from '@components/ui/PageContainer'

const DirectoryPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const { search } = useApi()

  // a lot of state.
  // main search field text and then all the filters.
  // on change, query api and redraw.

  const handleSearchRequest = async () => {
    setIsSearching(true)
    try {
      await search({ userId: '', data: '' })
      console.log('search results found')
      setIsSearching(false)
    } catch(error) {
      console.log('searching failed')
      alert("Oops! Something went wrong. Please try again in a few minutes.")
      setIsSearching(false)
    }
  }

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | Search</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta property="og:site_name" content="Wildflower Schools Directory" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta name="keywords" content="Wildflower, Schools, Directory, Montessori" />
        <meta property="og:title" content="Wildflower Schools Directory" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Schools Directory" key="og_wf_site_description" />
      </Head>

      <PageContainer>
        <NetworkContent />
      </PageContainer>

    </>
  )
}

export default DirectoryPage
