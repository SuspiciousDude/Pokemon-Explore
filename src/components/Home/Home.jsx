import React, { useState, useContext } from "react";
import styles from "/src/styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import HomeContext from "../../contexts/HomeContext.jsx";
import PlayGround from "../PlayGround/PlayGround.jsx";
import Invalid from "./Invalid.jsx";
import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("Guest"); // Sets the default username to Guest
  const { setUserName } = useContext(HomeContext);
  const [passwd, setPasswd] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handles the form submission and navigates to playground
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://login.demoapi.xyz/api/auth/local",
        {
          identifier: username,
          password: passwd,
        }
      );
      localStorage.setItem("jwtToken", response.data.jwt);
      setIsLogged(true);
      navigate("/playground");
    } catch (error) {
      setError(true)
      console.log(error);
    }
    setLoading(false);
  };

  // Changes the username in the context and in the state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswd(event.target.value);
  };

  return (
    <>
      {isLogged ? (
        <PlayGround />
      ) : error ? (
        <Invalid />
      ) : (
        <div className={styles.home}>
          <div className={styles.login_form}>
            <section className={styles.login_wrapper}>
              <form id="login" method="post" onSubmit={handleSubmit}>
                <p className={styles.welcome}>Welcome Trainer</p>
                <label htmlFor="username">User Name</label>
                <input
                  required
                  name="login[username]"
                  type="text"
                  autoCapitalize="off"
                  autoCorrect="off"
                  onChange={handleUsernameChange}
                />

                <label htmlFor="password">Password</label>
                <input
                  className={styles.password}
                  required
                  name="login[password]"
                  type="password"
                  onChange={handlePasswordChange}
                />
                <button type="submit">Sign In</button>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
