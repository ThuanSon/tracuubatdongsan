import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// export const ThongTinLienHe = () => {

function ThongTinLienHe() {
  // const [inputs, setInputs] = useState({});
  // const navigate = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      navigate("/user/authentication");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    tenlienhe: "",
    sodienthoai: "",
    email: "",
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const nav = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost/api/Controller/Lienhe/",
        formData
      );
      console.log(response);
      nav("/upload-images");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleChange = (event: any) => {
  //     const { name, value } = event.target;
  //     setInputs(values => ({...values, [name]: value}));
  // }
  return (
    <div>

      <form className="rentalform">
      <h2>Thông tin liên hệ</h2>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <label htmlFor="tenlienhe">Tên liên hệ</label> <br />
            <TextField
              fullWidth
              label="Nguyen Van A"
              name="tenlienhe"
              onChange={(event: any) => handleChange(event, "tenlienhe")}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="sodienthoai">Số điện thoại</label> <br />
            <TextField
              fullWidth
              label="+84 765 944 734"
              name="sodienthoai"
              onChange={(event: any) => handleChange(event, "sodienthoai")}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="email">Email</label> <br />
            <TextField
              fullWidth
              label="nguyenvana@gmail.com"
              name="email"
              onChange={(event: any) => handleChange(event, "email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="submit"
              value="Continue >"
              onClick={handleSubmit}
            />
          </Grid>
        </Grid>{" "}
      </form>
      <br />
    </div>
  );
}

export default ThongTinLienHe;
