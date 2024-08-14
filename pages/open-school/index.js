import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import { useUserContext } from "@lib/useUserContext";
import { PageContainer } from "@components/ui";

// The purpose of this page is to:
// Insert the workflow ID into the query params

const OpenSchoolWorkflow = ({}) => {
  const router = useRouter();

  const { currentUser } = useUserContext();
  const schoolWorkflowId = currentUser?.attributes?.schools[0]?.workflowId;

  useEffect(() => {
    if (schoolWorkflowId) {
      router.push(`/open-school/${schoolWorkflowId}`);
    }
  }, [currentUser]);

  // console.log(currentUser);

  return <PageContainer hideNav isLoading={true}></PageContainer>;
};

export default OpenSchoolWorkflow;
