import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import { useUserContext } from "@lib/useUserContext";
import { PageContainer } from "@components/ui";

// The purpose of this page is to:
// Insert the workflow ID into the query params
// Identify if a user is an ETL or if they are an Ops Guide
// Redirect the correct user type to the correct page

const SSJWorkflow = ({}) => {
  const router = useRouter();

  const { currentUser } = useUserContext();
  const SSJWorkflowId = currentUser?.attributes?.ssj?.workflowId;

  //TODO: Retrieve this from useUserContext() when user test is complete
  const isOperationsGuide =
    currentUser?.attributes?.email === "maya.soriano@wildflowerschools.org";

  useEffect(() => {
    if (SSJWorkflowId && !isOperationsGuide) {
      router.push(`/ssj/${SSJWorkflowId}`);
    }
    if (isOperationsGuide) {
      router.push(`/your-schools`);
    }
  }, [currentUser]);

  // console.log(currentUser);
  // console.log(SSJWorkflowId);

  return <PageContainer hideNav isLoading={true}></PageContainer>;
};

export default SSJWorkflow;
