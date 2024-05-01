/* eslint-disable jsx-a11y/img-redundant-alt */
import { InputOutlined } from "@mui/icons-material";
import { Grid, OutlinedInput, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpLoadImage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      navigate("/user/authentication");
    }
  }, [navigate]);
  const [selectedFiles, setSelectedFile] = useState<FileList | null>(null);

  const fileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files);
      console.log(event.target.files);
    }
  };
  const renderImage = () => {
    if (!selectedFiles) return null;

    return Array.from(selectedFiles).map((file, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          src={URL.createObjectURL(file)}
          alt={`Image ${index}`}
          width="400"
        />
      </div>
    ));
  };
  const nav = useNavigate();
  const fileUpload = () => {
    nav("/bat-dong-san");
    if (!selectedFiles) {
      console.error("No file selected.");
      return;
    }
  
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image[]", selectedFiles[i], selectedFiles[i].name);
    }
  
    axios
      .post("http://localhost/api/controller/test/uploadimage.php", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  // const fileUpload = () => {
  //   nav("/bat-dong-san");
  //   if (!selectedFiles) {
  //     console.error("No file selected.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image[]", selectedFiles, selectedFiles.name);
  //   axios
  //     .post("http://localhost/api/controller/test/uploadimage.php", formData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  return (
    <div>
      <form className="rentalform">
      <h2>Hình ảnh và video</h2>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <p>
              Hình ảnh & Video Quy định đăng hình & video <br />• Đăng tối thiểu
              4 ảnh thường với tin VIP <br /> • Đăng tối đa 24 ảnh với tất cả
              các loại tin <br />• Hãy dùng ảnh thật, không trùng, không chèn
              SĐT <br /> • Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15 MB{" "}
              <br />• Mô tả ảnh tối đa 45 kí tự.
            </p>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="file">Hình ảnh & Video</label> <br />
            <OutlinedInput
              fullWidth
              id="file-upload"
              type="file"
              name="file"
              inputProps={{ accept: "image/*,.heic", multiple: true }}
              onChange={fileSelect}
              endAdornment={
                <InputAdornment position="end">
                  <InputOutlined />
                </InputAdornment>
              }
            />
          </Grid>
          {renderImage()}
          <Grid item xs={12}>
            {/* <button onClick={fileUpload}>Upload</button> */}
            <TextField
              fullWidth
              type="submit"
              value="Continue >"
              onClick={fileUpload}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UpLoadImage;
