import AuthForm from "components/AuthForm";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [error, setError] = useState("");
  const auth = getAuth();
  const onSocialClick = async ({ target: { name } }) => {
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div>
      <AuthForm auth={auth} socialError={error} />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
