import { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";

import { useUserContext } from "@lib/useUserContext";
import PageContainer from "../components/ui/PageContainer";

export default function Home() {
  const { currentUser } = useUserContext();

  useEffect(() => {
    if (!currentUser) {
      Router.push("/login");
    }
  }, [currentUser]);

  return currentUser ? (
    <>
      <Head>
        <title>Wildflower Schools Directory | School Profile</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta
          property="og:site_name"
          content="Wildflower Schools Directory"
          key="og_wf_site_name"
        />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta
          name="keywords"
          content="Wildflower, Schools, Directory, Montessori"
        />
        <meta
          property="og:title"
          content="Wildflower Schools Directory"
          key="og_wf_site_title"
        />
        <meta
          property="og:description"
          content="Wildflower Schools Directory"
          key="og_wf_site_description"
        />
      </Head>

      <PageContainer>
        <h1>Welcome to Wildflower Schools</h1>
      </PageContainer>
    </>
  ) : null;
}
