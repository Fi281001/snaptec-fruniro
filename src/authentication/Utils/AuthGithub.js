import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

export const AuthGithub = async (auth, navigate) => {
  const provider = new GithubAuthProvider();
  const customId1 = "custom-id-yes";

  try {
    // Thực hiện đăng nhập bằng GitHub
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Lấy thông tin người dùng và token từ kết quả đăng nhập
    const credential = GithubAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    console.log("User Info: ", user);
    console.log("GitHub Access Token: ", accessToken);

    // Lưu thông tin người dùng hoặc token vào localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Điều hướng người dùng đến trang chính
    navigate("/");
  } catch (error) {
    console.error("GitHub login error:", error);
    if (error.code === "auth/account-exists-with-different-credential") {
      toast.error("Email was used with a different method. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        toastId: customId1,
      });
    } else {
      toast.error("Unable to log in with GitHub", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        toastId: customId1,
      });
    }
  }
};      

