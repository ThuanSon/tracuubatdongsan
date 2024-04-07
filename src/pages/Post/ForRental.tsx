import React, { useState } from "react";
import {
  Autocomplete,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { InputOutlined } from "@mui/icons-material";

type Province = {
  label: string;
  districts: string[];
};

export const Rental = () => {
  const listType = [
    "Căn hộ chung cư",
    "Nhà riêng",
    "shophouse",
    "Biệt thự, liền kề",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const vietnameseProvinces: Province[] = [
    { label: "Hà Nội", districts: ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng"] },
    { label: "TP Hồ Chí Minh", districts: ["Quận 1", "Quận 2", "Quận 3"] },
    // Add more provinces and districts as needed
  ];
  const handleFileChange = (event: any) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      console.log("File name:", files[i].name);
    }
  };

  const cur = ["VND", "Thương lượng", "giá/m2"];
  return (
    <form className="rentalform">
      <h2>Địa chỉ</h2> <br />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <label htmlFor="type">Loại bất động sản</label> <br />
          <Autocomplete
            fullWidth
            disablePortal
            id="type-combo-box"
            options={listType}
            value={selectedType}
            onChange={(event, value) => {
              setSelectedType(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="VD: Shop house"
                variant="outlined"
                name="type"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="province">Tỉnh/Thành phố</label> <br />
          <Autocomplete
            disablePortal
            id="province-combo-box"
            options={vietnameseProvinces}
            getOptionLabel={(option) => option.label}
            sx={{ width: "100%" }}
            value={selectedProvince}
            onChange={(event, value) => {
              setSelectedProvince(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tỉnh/Thành phố"
                variant="outlined"
                name="province"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="district">Quận/Huyện</label> <br />
          <Autocomplete
            disablePortal
            id="district-combo-box"
            options={selectedProvince?.districts || []}
            getOptionLabel={(option) => option}
            sx={{ width: "100%" }}
            value={selectedDistrict}
            onChange={(event, value) => {
              setSelectedDistrict(value);
            }}
            renderInput={(params) => (
              <TextField {...params} name="district" label="Quận/Huyện" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="ward">Phường/xã</label> <br />
          <Autocomplete
            disablePortal
            id="province-combo-box"
            options={vietnameseProvinces}
            getOptionLabel={(option) => option.label}
            sx={{ width: "100%" }}
            value={selectedProvince}
            onChange={(event, value) => {
              setSelectedProvince(value);
            }}
            renderInput={(params) => (
              <TextField name="ward" {...params} label="Phường/xã" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="street">Đường phố</label> <br />
          <Autocomplete
            disablePortal
            id="district-combo-box"
            options={selectedProvince?.districts || []}
            getOptionLabel={(option) => option}
            sx={{ width: "100%" }}
            value={selectedDistrict}
            onChange={(event, value) => {
              setSelectedDistrict(value);
            }}
            renderInput={(params) => (
              <TextField {...params} name="street" label="Đường phố" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="diachi">Địa chỉ hiển thị trên bài đăng</label> <br />
          <TextField
            fullWidth
            label="Bạn có thể bổ sung hẻm, ngỏ, ngách"
            variant="outlined"
            name="diachi"
          />
        </Grid>
      </Grid>
      <h2>Thông tin bài viết</h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <label htmlFor="tieude">Tiêu đề</label> <br />
          <TextField fullWidth name="tieude" label="VD: Cho thuê shophouse" />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="mota">Mô tả</label> <br />
          <TextField
            fullWidth
            name="mota"
            label="VD: Khu nhà có vị trí gần Trung tâm thương mại"
          />
        </Grid>
      </Grid>
      <h2>Thông tin bất động sản</h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <label htmlFor="dientich">Diện tích</label> <br />
          <OutlinedInput
            fullWidth
            name="dientich"
            label="Nhập diện tích"
            endAdornment={<InputAdornment position="end">m²</InputAdornment>}
          />
        </Grid>
        <Grid item xs={8}>
          <label htmlFor="giatri">Giá trị</label> <br />
          <TextField fullWidth name="giatri" label="Giá trị bất động sản" />
        </Grid>
        <Grid item xs={4}>
          <label htmlFor="donvi">Đơn vị</label> <br />
          <Autocomplete
            fullWidth
            disablePortal
            id="cur-combo-box"
            options={cur}
            //   value={selectedType}
            //   onChange={(event, value) => {
            //     setSelectedType(value);
            //   }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="donvi"
                label="VD: 150,000,000"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
      <h2>Hình ảnh và video</h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <p>
            Hình ảnh & Video Quy định đăng hình & video <br />• Đăng tối thiểu 4
            ảnh thường với tin VIP <br /> • Đăng tối đa 24 ảnh với tất cả các
            loại tin <br />• Hãy dùng ảnh thật, không trùng, không chèn SĐT{" "}
            <br /> • Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15 MB{" "}
            <br />• Mô tả ảnh tối đa 45 kí tự.
          </p>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="file">Hình ảnh & Video</label> <br />
          <OutlinedInput
            fullWidth
            id="file-upload"
            type="file"
            //   multiline
            name="file"
            inputProps={{ accept: "image/*,.heic", multiple: true }}
            onChange={handleFileChange}
            endAdornment={
              <InputAdornment position="end">
                <InputOutlined />
              </InputAdornment>
            }
          />
          {/* <div>Bấm để chọn ảnh cần tải lên hoặc kéo thả ảnh vào đây</div> */}
        </Grid>
      </Grid>
      <h2>Thông tin liên hệ</h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <label htmlFor="tenlienhe">Tên liên hệ</label> <br />
          <TextField fullWidth label="Nguyen Van A" name="tenlienhe" />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="sodienthoai">Số điện thoại</label> <br />
          <TextField fullWidth label="+84 765 944 734" name="sodienthoai" />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="email">Email</label> <br />
          <TextField fullWidth label="nguyenvana@gmail.com" name="email" />
        </Grid>
      </Grid> <br />
      <TextField fullWidth type="submit" />
    </form>
  );
};

export default Rental;
