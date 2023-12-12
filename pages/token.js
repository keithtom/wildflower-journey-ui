import authApi from "@api/auth";
import { useEffect } from "react";
import { useUserContext } from "../lib/useUserContext";
import { useRouter } from "next/router";

const Token = ({ query }) => {
  const { setCurrentUser } = useUserContext();
  const { token, redirect } = query;
  let loggedIn = false;
  const router = useRouter();

  useEffect(() => {
    // Example link: https://platform.wildflowerschools.org/token?token=&redirect=https%3A%2F%2Fplatform.wildflowerschools.org%2Fwelcome%2Fexisting-tl
    if (!loggedIn) {
      loggedIn = true; // prevent useEffect from firing twice https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
      authApi
        .tokenAuth(token, redirect)
        .then((response) => {
          const user = response.data.data;
          setCurrentUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.imageUrl,
          });

          //construct the relevant data to redirect based on
          const personRoleList = result.data?.included?.find((a) => {
            return a.id === personId;
          })?.attributes?.roleList;
          const personIsOnboarded = result.data?.included?.find((a) => {
            return a.id === personId;
          })?.attributes?.isOnboarded;
          //extract individual roles to check with
          const isEmergingTeacherLeader = personRoleList.includes(
            "Emerging Teacher Leader"
          );
          const isTeacherLeader = personRoleList.includes("Teacher Leader");
          const isOperationsGuide =
            personRoleList.includes("Operations Guide") ||
            personRoleList.includes("Ops Guide");

          const isRegionalGrowthLead = personRoleList.includes(
            "Regional Growth Lead"
          );
          const isFoundationPartner =
            personRoleList.includes("Foundation Parnter");
          const isCharterStaff = personRoleList.includes("Charter Staff");

          //redirect to given routes based on role
          switch (true) {
            case personIsOnboarded && isEmergingTeacherLeader:
              router.push("/ssj");
              break;

            case personIsOnboarded &&
              (isTeacherLeader ||
                isOperationsGuide ||
                isRegionalGrowthLead ||
                isFoundationPartner ||
                isCharterStaff):
              router.push("/network");
              break;

            case !personIsOnboarded && isEmergingTeacherLeader:
              router.push("/welcome/new-etl");
              break;

            case !personIsOnboarded &&
              (isTeacherLeader ||
                isOperationsGuide ||
                isRegionalGrowthLead ||
                isFoundationPartner ||
                isCharterStaff):
              router.push("/welcome/existing-member");
              break;

            default:
              router.push("/network");
              break;
          }
        })
        .catch((error) => {
          // if tokenAuth fails then
          router.push("/login");
          alert(error.message);
        });
    }
  }, []);

  return <></>;
};

export default Token;

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}
