import { setCookie } from "cookies-next";
// import { useUserContext } from "@lib/useUserContext";

export default function loginSuccessful(response) {
    // const { setCurrentUser } = useUserContext();

    console.log('setting auth cookie');
    setCookie("auth", response.headers["authorization"], {
        maxAge: 60 * 60 * 24,
    });
    const user = response.data.data.attributes;
    console.log("setting user context");
    setCurrentUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.imageUrl,
    });
}