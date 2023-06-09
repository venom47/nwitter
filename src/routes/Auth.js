import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: "30px" }}
      />
      <AuthForm auth={auth} socialError={error} />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
