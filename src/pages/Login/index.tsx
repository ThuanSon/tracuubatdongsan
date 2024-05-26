import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper, Box } from "@mui/material"; // Import TextField, Button, Typography, Grid, and Paper from Material-UI
import { useTitle } from "../../Components/useTitle";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
type User = {
  name: string;
  email: string;
  mobile: string;
  id: string;
  create_at: string;
  updated_at: string;
};
interface State extends SnackbarOrigin {
  open: boolean;
}
const Login = () => {
  useTitle("Đăng nhập tài khoản");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    // getUsers();
    // const navigate = useNavigate();

    const username = sessionStorage.getItem("username");
    if (username !== null) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const [message, setMessage] = useState("");
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const buttons = (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleClick({ vertical: "bottom", horizontal: "center" })}
        >
          Bottom-Center
        </Button>
      </Box>
    </Fragment>
  );
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
        sessionStorage.setItem("id-user-lg", validUser.id);
        setState({ ...state, open: true });
        setMessage("Đăng nhập thành công");
        navigate(-1);
        console.log(response);
      } else {
        // alert("Sai thông tin đăng nhập");
        setMessage("Đăng nhập không thành công");
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
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
                <Button
                  type="button"
                  variant="contained"
                  color="inherit"
                  fullWidth
                  onClick={handleClickSignUp}
                >
                  Đăng ký
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={formData.email === "" || formData.password === ""}
                >
                  Đăng nhập
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: 500 }}>
          {/* {buttons} */}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
