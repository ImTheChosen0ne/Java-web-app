import React, { useState } from "react";
import {login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import './LoginForm.css';
import splashPhoto from "../../pages/SplashPage/main-photo.jpg";
import Footer from "../Footer";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/profile" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  return (
      <div className="login-form-page">
        <div className="img-wrapper">
          <img src={splashPhoto} alt="login Photo"/>
        </div>
        <header className="login-header">
          <NavLink exact to="/">CineVerse</NavLink>
        </header>
          <div className="login-body-container">
              <div className="login-body">
                  <div className="login-body-form">
                      <h1>Sign In</h1>
                      <form onSubmit={handleSubmit}>
                          <ul>
                              {errors.map((error, idx) => (
                                  <li key={idx}>{error}</li>
                              ))}
                          </ul>
                          <input
                              placeholder="Email"
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                          <input
                              placeholder="Password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          <button type="submit">Log In</button>
                      </form>
                      <div className="login-body-new">
                          New to CineVerse?
                          <NavLink exact to="/signup">Sign up now</NavLink>
                      </div>
                  </div>
              </div>
          </div>
          <Footer />
      </div>
  );
}

export default LoginFormPage;
