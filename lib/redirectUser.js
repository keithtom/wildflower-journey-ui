const RedirectUser = async ({
  router,
  roleList = [],
  isOnboarded,
  schoolId,
  preferredLanguage,
}) => {
  // If we don't have the necessary data yet, don't redirect
  if (!roleList || !router) return;

  //extract individual roles to check with
  const isEmergingTeacherLeader = roleList.includes("Emerging Teacher Leader");
  const isTeacherLeader = roleList.includes("Teacher Leader");
  const isOperationsGuide =
    roleList.includes("Operations Guide") || roleList.includes("Ops Guide");
  const isRegionalGrowthLead = roleList.includes("Regional Growth Lead");
  const isFoundationPartner = roleList.includes("Foundation Partner");
  const isCharterStaff = roleList.includes("Charter Staff");
  const isNoRoleInList = roleList.length === 0;

  let route;

  // console.log("RedirectUser - Input:", {
  //   roleList,
  //   isOnboarded,
  //   schoolId,
  // });

  // console.log("RedirectUser - Role checks:", {
  //   isEmergingTeacherLeader,
  //   isTeacherLeader,
  //   isOperationsGuide,
  //   isRegionalGrowthLead,
  //   isFoundationPartner,
  //   isCharterStaff,
  //   isNoRoleInList,
  // });

  // First check if user is not onboarded
  if (!isOnboarded) {
    if (isEmergingTeacherLeader) {
      route = "/welcome/new-etl";
      // console.log("RedirectUser - Selected new ETL route:", route);
    } else {
      route = "/welcome/existing-member";
      console.log("RedirectUser - Selected existing member route:", route);
    }
  }
  // Then handle onboarded users
  else {
    // Priority 1: Teacher roles with schoolId
    if ((isEmergingTeacherLeader || isTeacherLeader) && schoolId) {
      route = `/school/${schoolId}`;
      // console.log("RedirectUser - Selected school route:", route);
    }
    // Priority 2: Operations Guide
    else if (isOperationsGuide) {
      route = "/your-schools";
      console.log("RedirectUser - Selected ops guide route:", route);
    }
    // Priority 3: All other roles
    else {
      route = "/network";
      console.log("RedirectUser - Selected network route:", route);
    }
  }

  try {
    if (route && router.pathname !== route) {
      console.log("RedirectUser - Attempting redirect to:", route);
      if (preferredLanguage) {
        await router.push(route, route, { locale: preferredLanguage });
      } else {
        await router.push(route);
      }
    } else {
      console.log(
        "RedirectUser - No redirect needed. Current path:",
        router.pathname
      );
    }
  } catch (error) {
    console.error("RedirectUser - Redirect failed:", error);
  }
};

export default RedirectUser;
