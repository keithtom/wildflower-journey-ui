import { useEffect } from "react";
import { Spinner, Grid } from "@ui";
import { useRouter } from "next/router";

import { useUserContext } from "@lib/useUserContext";

const Welcome = () => {
  const router = useRouter();
  const currentUser = useUserContext();

  // console.log({ currentUser });

  const isEmergingTeacherLeader = true; //TODO: Update with check in roleList
  const isTeacherLeader = true; //TODO: Update with check in roleList
  const isOperationsGuide = true; //TODO: Update with check in roleList
  const isRegionalGrowthLead = true; //TODO: Update with check in roleList
  const isFoundationPartner = true; //TODO: Update with check in roleList
  const isOnboarded = true; //TODO: Update with check in attributes

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
  }, []);

  return (
    <Grid container justifyContent="center" mt={32}>
      <Grid item>
        <Spinner />
      </Grid>
    </Grid>
  );
};

export default Welcome;
