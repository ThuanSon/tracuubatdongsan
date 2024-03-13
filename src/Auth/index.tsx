import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  let [authMode, setAuthMode] = useState("signin");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const navigate = useNavigate()
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setInputs(inputs);
    console.log(inputs);
    axios.post('http://localhost/api/user/save', inputs);
    navigate('/')
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </h3>
          <div className="text-center">
            {authMode === "signin" ? (
              <>
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </>
            )}
          </div>
          {authMode === "signup" && (
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
