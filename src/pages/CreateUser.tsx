import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material"; // Import Material-UI components
import axios from "axios";
import { useTitle } from "../Components/useTitle";
const CreateUser = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });
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
    console.log(inputs);
  };
  const checkInput = () => {
    // var mailExpression = `^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*/$`
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              inputs.name === "" ||
              inputs.email === "" ||
              inputs.password === "" ||
              inputs.confirmpassword === "" ||
              inputs.password !== inputs.confirmpassword
            }
          >
            Save
          </Button>
          <Button
            type="button"
            variant="text"
            color="secondary"
            fullWidth
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
