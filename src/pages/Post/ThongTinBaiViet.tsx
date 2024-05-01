import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ThongTinBaiViet = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      navigate("/user/authentication");
    }
  }, [navigate]);
  const [formDataPost, setFormDataPost] = useState({
    tieude: "",
    mota: "",
  });
  const handleChangePost = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = event.target;
    setFormDataPost({ ...formDataPost, [name]: value });
  };
  return (
    <div>
      <form className="rentalform">
      <h2>Thông tin bài viết</h2>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <label htmlFor="tieude">Tiêu đề</label> <br />
            <TextField
              fullWidth
              name="tieude"
              label="VD: Cho thuê shophouse"
              onChange={(event: any) => handleChangePost(event, "tieude")}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="mota">Mô tả</label> <br />
            <TextField
              fullWidth
              name="mota"
              label="VD: Khu nhà có vị trí gần Trung tâm thương mại"
              onChange={(event: any) => handleChangePost(event, "mota")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="submit" value="Submit" />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ThongTinBaiViet;
