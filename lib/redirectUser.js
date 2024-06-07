import { useState } from "react";

const createRedirectUser = () => {
  let hasRedirected = false;
  const RedirectUser = async ({ router, roleList, isOnboarded }) => {
    //extract individual roles to check with
    const isEmergingTeacherLeader = roleList.includes(
      "Emerging Teacher Leader"
    );
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
      //If a person is onboarded and has a role of Emerging Teacher Leader
      case isOnboarded && isEmergingTeacherLeader:
        route = "/ssj";
        break;

      //if a person is onboarded and has a role of Teacher Leader
      case isOnboarded && isTeacherLeader:
        route = "/open-school";
        break;

      //if a person is onboarded and has a role of Operations Guide
      case isOnboarded && isOperationsGuide:
        route = "/your-schools";
        break;

      //if a person is onboarded and has a role of Regional Growth Lead, Foundation Partner, Charter Staff, or no role in list
      case isOnboarded &&
        (isRegionalGrowthLead ||
          isFoundationPartner ||
          isCharterStaff ||
          isNoRoleInList):
        route = "/network";
        break;

      //if a person is not onboarded and has a role of Emerging Teacher Leader
      case !isOnboarded && isEmergingTeacherLeader:
        route = "/welcome/new-etl";
        break;

      //if a person is not onboarded and has a role of Operations Guide, Regional Growth Lead, Foundation Partner, Charter Staff, or no role in list
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
    if (route && !hasRedirected) {
      hasRedirected = true;
      await router.push(route);
    }
  };
  return RedirectUser;
};

const RedirectUser = createRedirectUser();

export default RedirectUser;
