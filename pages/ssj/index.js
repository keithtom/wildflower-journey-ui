import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import { useUserContext } from "@lib/useUserContext";

// The purpose of this page is to:
// Insert the workflow ID into the query params
// Identify if a user is an ETL or if they are an Ops Guide
// Redirect the correct user type to the correct page

const SSJWorkflow = ({}) => {
  const router = useRouter();

  const { currentUser } = useUserContext();
  const SSJWorkflowId = currentUser?.attributes?.ssj?.workflowId;

  useEffect(() => {
    if (SSJWorkflowId) {
      router.push(`/ssj/${SSJWorkflowId}`);
    }
    // TODO: if is ops guide...
  }, [currentUser]);

  // console.log(currentUser);
  // console.log(SSJWorkflowId);

  return <div>Loading</div>;
};

export default SSJWorkflow;
