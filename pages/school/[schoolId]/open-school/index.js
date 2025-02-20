import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "@lib/useUserContext";
import { PageContainer } from "@components/ui";

const OpenSchoolWorkflow = () => {
  const router = useRouter();
  const { currentUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const currentSchool = currentUser?.attributes?.schools.filter(
        (s) => s.affiliated === true && s.end_date === null
      );

      const schoolWorkflowId = currentSchool && currentSchool[0]?.workflowId;

      if (schoolWorkflowId) {
        router.push(`/open-school/${schoolWorkflowId}`);
        sessionStorage.setItem("mySchoolWorkflowId", schoolWorkflowId);
      } else {
        router.push("/network");
      }

      setIsLoading(false);
    }
  }, [currentUser]);

  return <PageContainer hideNav isLoading={isLoading}></PageContainer>;
};

export default OpenSchoolWorkflow;
