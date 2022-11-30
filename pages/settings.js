import Head from "next/head";
import SettingsContent from "@components/page-content/SettingsContent";
import PageContainer from "@components/ui/PageContainer";

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Wildflower Schools | Search</title>
        <meta name="title" content="Wildflower Schools" />
        <meta
          property="og:site_name"
          content="Wildflower Schools"
          key="og_wf_site_name"
        />
        <meta name="description" content="Wildflower Schools" />
        <meta name="keywords" content="Wildflower, Schools, Montessori" />
        <meta
          property="og:title"
          content="Wildflower Schools"
          key="og_wf_site_title"
        />
        <meta
          property="og:description"
          content="Wildflower Schools"
          key="og_wf_site_description"
        />
      </Head>

      <PageContainer>
        <SettingsContent />
      </PageContainer>
    </>
  );
};

export default SettingsPage;
