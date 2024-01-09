const RedirectUser = ({ router, roleList, isOnboarded }) => {
  //extract individual roles to check with
  const isEmergingTeacherLeader = roleList.includes("Emerging Teacher Leader");
  const isTeacherLeader = roleList.includes("Teacher Leader");
  const isOperationsGuide =
    roleList.includes("Operations Guide") || roleList.includes("Ops Guide");

  const isRegionalGrowthLead = roleList.includes("Regional Growth Lead");
  const isFoundationPartner = roleList.includes("Foundation Parnter");
  const isCharterStaff = roleList.includes("Charter Staff");
  const isNoRoleInList = roleList.length === 0;

  //redirect to given routes based on role
  switch (true) {
    //If a person is onboarded and has a role of Emerging Teacher Leader
    case isOnboarded && isEmergingTeacherLeader:
      router.push("/ssj");
      break;

    //if a person is onboarded and has a role of Teacher Leader
    case isOnboarded && isTeacherLeader:
      router.push("/open-school");
      break;

    //if a person is onboarded and has a role of Operations Guide
    case isOnboarded && isOperationsGuide:
      router.push("/your-schools");
      break;

    //if a person is onboarded and has a role of Regional Growth Lead, Foundation Partner, Charter Staff, or no role in list
    case isOnboarded &&
      (isRegionalGrowthLead ||
        isFoundationPartner ||
        isCharterStaff ||
        isNoRoleInList):
      router.push("/network");
      break;

    //if a person is not onboarded and has a role of Emerging Teacher Leader
    case !isOnboarded && isEmergingTeacherLeader:
      router.push("/welcome/new-etl");
      break;

    //if a person is not onboarded and has a role of Operations Guide, Regional Growth Lead, Foundation Partner, Charter Staff, or no role in list
    case !isOnboarded &&
      (isTeacherLeader ||
        isOperationsGuide ||
        isRegionalGrowthLead ||
        isFoundationPartner ||
        isCharterStaff ||
        isNoRoleInList):
      router.push("/welcome/existing-member");
      break;

    default:
      router.push("/network");
      break;
  }
};

export default RedirectUser;
