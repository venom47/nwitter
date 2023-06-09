import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

const AuthForm = ({ auth, socialError }) => {
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState(socialError);
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
  return (
    <>
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
    </>
  );
};

export default AuthForm;
