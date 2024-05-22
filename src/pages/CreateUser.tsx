import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material"; // Import Material-UI components
import axios from "axios";
import { useTitle } from "../Components/useTitle";
const CreateUser = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  useTitle(`Đăng ký tài khoản`);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post("http://localhost/api/controller/registration/", inputs)
      .then(() => {
        // Redirect to the login page after successful registration
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error occurred while registering user:", error);
      });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="container">
      <h1 className="form-title">Đăng ký</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            label="Name"
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Email"
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Mobile"
            type="text"
            name="mobile"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Password"
            type="text"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Confirm password"
            type="text"
            name="confirmpassword"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            type="button"
            variant="text"
            color="secondary"
            onClick={() => navigate("/user/authentication")}
          >
            Bạn đã có tài khoản?
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateUser;
