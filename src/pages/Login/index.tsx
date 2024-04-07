import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material"; // Import TextField, Button, Typography, Grid, and Paper from Material-UI

type User = {
  name: string;
  email: string;
  mobile: string;
  id: string;
  create_at: string;
  updated_at: string;
};

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    // getUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/api/controller/authentication/",
        formData
      );
      if (response.data.status === 1) {
        const validUser = response.data; // Assuming the response contains user data
        sessionStorage.setItem("username", validUser.username);
        navigate("/dashboard");
      } else {
        alert("Sai thông tin đăng nhập");
      }
    } catch (error: any) {
      console.error("An error occurred:", error);
      setError(error.response?.data.message || "An error occurred");
    }
  };

  const handleClickSignUp = () => {
    navigate("/user/create");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Đăng nhập
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Đăng nhập
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleClickSignUp}
                >
                  Đăng ký
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
