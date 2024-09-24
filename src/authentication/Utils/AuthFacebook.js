import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

export const AuthFacebook = async (auth, navigate) => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // You can get additional Facebook-specific access tokens and profile info here
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    console.log("User Info: ", user);
    console.log("Facebook Access Token: ", accessToken);

    // You can save the token in localStorage if needed, or redirect the user
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  } catch (error) {
    console.error("Facebook login error:", error);
    toast.error(
      "Failed to login with Facebook. Account email already exists, please sign in using the previous method",
      {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
      }
    );
  }
};
