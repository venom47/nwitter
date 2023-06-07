import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const onChange = (event) => {
  //     const { name, value } = event.target;
  //     if (name === "email") {
  //       setEmail(value);
  //     } else if (name === "password") {
  //       setPassword(value);
  //     }
  //   };
  const [form, setForm] = useState({ email: "", password: "" });
  const onChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
  const auth = getAuth();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
      } else {
        data = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
      }
      console.log(data);
    } catch (e) {
      setError(e.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
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
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength="6"
          value={form.password}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
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
