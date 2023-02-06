import queryString from 'query-string';
import { Button, Stack, Typography } from "@ui";
import { googleLogo } from "../public/assets/images/google-g-logo.svg"
// import { authenticate } from '@lib/authentication'; 
import { baseUrl } from '@lib/utils/baseUrl'
import { useRouter } from 'next/router';

// https://mmahalwy.com/blog/2020-6-28-twitter-auth-with-rails-api-nextjs

const GoogleAuthButton = ({
  isSubmitting,
  userId,
}) => {
//   const { push } = useRouter();

//   const handleAuth = () => {
//     const q = queryString.stringify({
//       url: window.location.origin,
//       user_id: userId,
//     });
//     console.log(q);

//     authenticate({
//       provider: 'google',
//       url: `${baseUrl}/auth/google_oauth2?${q}`,
//       cb: () => {
//         console.log('Logged in successfully');
//         push('/');
//       },
//     });
//   };

  return (
    // <Button full onClick={handleAuth} disabled={isSubmitting} variant="light">
    //     <Stack direction="row" spacing={3} alignItems="center" ></Stack>
    //     <img src={googleLogo} />
    //     variant="light"
    //     <Typography variant="bodyRegular">
    //         Log in with Google
    //     </Typography>
    // </Button>
        <Stack direction="row" spacing={3} alignItems="center" >

        <script src="https://accounts.google.com/gsi/client" async defer></script>
            <div id="g_id_onload"
                data-client_id="934011123691-hcmndtcogmrdjn31cljs4qhgfespspo5.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri="http://localhost:3001/auth/google_oauth2/callback"
                data-auto_prompt="false">
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </Stack>
  );
};

export default GoogleAuthButton;