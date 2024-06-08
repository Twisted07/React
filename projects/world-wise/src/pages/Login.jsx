import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login} = useAuth();
  const navigate = useNavigate();


  function handleLogin(e) {
    e.preventDefault();
    console.log("trying to log in...");
    const user = {
      email,
      password,
    }
    login(user);
    navigate("/app/cities");
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </main>
  );
}
