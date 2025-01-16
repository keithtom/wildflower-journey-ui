const RedirectUser = async ({ router, roleList, isOnboarded }) => {
  //extract individual roles to check with
  const isEmergingTeacherLeader = roleList.includes("Emerging Teacher Leader");
  const isTeacherLeader = roleList.includes("Teacher Leader");
  const isOperationsGuide =
    roleList.includes("Operations Guide") || roleList.includes("Ops Guide");
  const isRegionalGrowthLead = roleList.includes("Regional Growth Lead");
  const isFoundationPartner = roleList.includes("Foundation Parnter");
  const isCharterStaff = roleList.includes("Charter Staff");
  const isNoRoleInList = roleList.length === 0;

  let route;

  //redirect to given routes based on role
  switch (true) {
    case isOnboarded && isEmergingTeacherLeader && !isTeacherLeader:
      route = "/school";
      break;

    case isOnboarded && isTeacherLeader:
      route = "/open-school";
      break;

    case isOnboarded && isOperationsGuide:
      route = "/your-schools";
      break;

    case isOnboarded &&
      (isRegionalGrowthLead ||
        isFoundationPartner ||
        isCharterStaff ||
        isNoRoleInList):
      route = "/network";
      break;

    case !isOnboarded && isEmergingTeacherLeader:
      route = "/welcome/new-etl";
      break;

    case !isOnboarded &&
      (isTeacherLeader ||
        isOperationsGuide ||
        isRegionalGrowthLead ||
        isFoundationPartner ||
        isCharterStaff ||
        isNoRoleInList):
      route = "/welcome/existing-member";
      break;

    default:
      route = "/network";
      break;
  }

  if (route) {
    await router.push(route);
  }
};

export default RedirectUser;
