import { useEffect } from "react";
import { Spinner, Grid } from "@ui";
import { useRouter } from "next/router";

import { useUserContext } from "@lib/useUserContext";

const Welcome = () => {
  const router = useRouter();
  const { currentUser } = useUserContext();

  const isEmergingTeacherLeader = currentUser?.personRoleList.includes(
    "Emerging Teacher Leader"
  );
  const isTeacherLeader =
    currentUser?.personRoleList.includes("Teacher Leader");
  const isOperationsGuide =
    currentUser?.personRoleList.includes("Operations Guide");
  const isRegionalGrowthLead = currentUser?.personRoleList.includes(
    "Regional Growth Lead"
  );
  const isFoundationPartner =
    currentUser?.personRoleList.includes("Foundation Parnter");
  const isOnboarded = currentUser?.personIsOnboarded;

  useEffect(() => {
    if (isOnboarded) {
      if (isEmergingTeacherLeader) {
        router.push("/ssj");
      }
      if (
        isTeacherLeader ||
        isOperationsGuide ||
        isRegionalGrowthLead ||
        isFoundationPartner
      ) {
        router.push("/network");
      }
    }
    if (!isOnboarded) {
      if (isEmergingTeacherLeader) {
        router.push("/welcome/new-etl");
      }
      if (
        isTeacherLeader ||
        isOperationsGuide ||
        isRegionalGrowthLead ||
        isFoundationPartner
      ) {
        router.push("/welcome/existing-member");
      }
    }
  }, [currentUser]);

  return (
    <Grid container justifyContent="center" mt={32}>
      <Grid item>
        <Spinner />
      </Grid>
    </Grid>
  );
};

export default Welcome;
