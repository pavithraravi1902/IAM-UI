// import axios from "axios";
// import React, { useEffect } from "react";
// import { GoogleLogin } from "react-google-login";
// import { gapi } from "gapi-script";

// const GoogleSignIn = ({ onSuccess, onFailure }: any) => {
//   const clientId =
//     "1043116758259-0rjgl2irub8sempl72pl6t2fa766ftkq.apps.googleusercontent.com";

//   const handleSuccess = async (response: any) => {
//     const accessToken = response.accessToken;
//     const res = await axios
//       .post(
//         "http://localhost:3000/users/google/callback",
//         { accessToken },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res, "res val");
//         if (res.status === 200) {
//           return res.data;
//         }
//         throw new Error("Failed to authenticate with Google.");
//       })
//       .then((data) => {
//         onSuccess(data);
//       })
//       .catch((error) => {
//         console.error("Google Sign-In error:", error);
//       });
//   };

//   const handleFailure = (error: any) => {
//     console.error("Google Sign-In failed:", error);
//   };

//   useEffect(() => {
//     gapi.load("client: auth2", () => {
//       gapi.auth2.init({ clientId: clientId });
//     });
//   }, []);

//   return (
//     <GoogleLogin
//       clientId={clientId}
//       onSuccess={handleSuccess}
//       onFailure={handleFailure}
//       buttonText="Sign in with Google"
//       cookiePolicy={"single_host_origin"}
//     />
//   );
// };

// export default GoogleSignIn;

// import { useMutation } from "react-query";
// import axios from "axios";
// import GoogleLogin from "react-google-login";
// import { useEffect, useState } from "react";
// import { googleCallback } from "./auth-service";
// import { gapi } from "gapi-script";

// const GoogleSignIn = ({ onSuccess, onFailure }: any) => {
//   const clientId =
//     "1043116758259-0rjgl2irub8sempl72pl6t2fa766ftkq.apps.googleusercontent.com";
//   const [accessToken, setAccessToken] = useState();
//   const [isGapiInitialized, setIsGapiInitialized] = useState(false);

//   const handleSuccess = async (response: any) => {
//     setAccessToken(response.accessToken);
//   };

//   const { isLoading: isUpdateLoading, mutate: getGoogleCallback } = useMutation<
//   any,
//   Error
// >(
//   async () => {
//     if (accessToken) {
//       return await googleCallback(accessToken);
//     }
//   },
//   {
//     onSuccess: (res: any) => {
//       console.log(res, "response message");
//       console.log("updated successfully");
//     },
//     onError: (err: any) => {
//       console.log(err);
//     },
//   }
// );

// useEffect(() => {
//   if (accessToken) {
//     getGoogleCallback();
//   }
// }, [accessToken]);

//   const handleFailure = (error: any) => {
//     console.error("Google Sign-In failed:", error);
//   };

//   // useEffect(() => {
//   //   // Initialize gapi.auth2 only once
//   //   if (!isGapiInitialized) {
//   //     gapi.load("client:auth2", () => {
//   //       gapi.auth2.init({ clientId: clientId }).then(() => {
//   //         setIsGapiInitialized(true);
//   //       });
//   //     });
//   //   }

//   //   // Call the mutation when accessToken changes
//   //   if (accessToken) {
//   //     getGoogleCallback();
//   //   }
//   // }, [accessToken, isGapiInitialized]);

//   return (
//     <GoogleLogin
//       clientId={clientId}
//       onSuccess={handleSuccess}
//       onFailure={handleFailure}
//       buttonText="Sign in with Google"
//       cookiePolicy="single_host_origin"
//     />
//   );
// };

// export default GoogleSignIn;
export const GoogleSignIn = () => {
  return "Val";
};
