import React, { Fragment, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Autocomplete,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { InputOutlined } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ThongTinBatDongSan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      navigate("/user/authentication");
    }
    getProvince();
  }, []);

  const [tinh, setTinh] = useState<any>();
  const [quan, setQuan] = useState<any>();
  const [phuong, setPhuong] = useState<any>();
  const listType = [
    "Căn hộ chung cư",
    "Nhà riêng",
    "shophouse",
    "Biệt thự, liền kề",
  ];

  const [formData, setFormData] = useState({
    usermail: sessionStorage.getItem("username"),
    type: "",
    province: { PROVINCE_ID: "", PROVINCE_CODE: "", PROVINCE_NAME: "" },
    district: {
      DISTRICT_ID: "",
      DISTRICT_VALUE: "",
      DISTRICT_NAME: "",
      PROVINCE_ID: "",
    },
    ward: {
      WARDS_ID: "",
      WARDS_NAME: "",
      DISTRICT_ID: "",
    },
    street: "",
    diachi: "",
    tieude: "",
    file: [],
    mota: "",
    dientich: "",
    giatri: "",
    donvi: "",
    tenlienhe: "",
    sodienthoai: "",
    email: "",
    sophongngu: "",
    sophongtam: "",
    sotang: "",
    giaytophaply: "",
    noithat: "",
    anh1: "",
    anh2: "",
    anh3: "",
    anh4: "",
  });

  const handleChangeThongTin = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send formData to your backend or perform any other action
    console.log("Form Data:", formData);
    // const res = await axios.post("http://localhost/api/controller/function/postsell.php", formData);
  };
  const getProvince = async () => {
    const res = await axios.get(
      "http://localhost/api/controller/function/getProvince/"
    );
    // console.log(res);
    setTinh(res.data);
  };
  const getDistricByProvinceID = async (id: any) => {
    const res = await axios.get(
      "http://localhost/api/controller/function/getDistrictByProvinceID/?provinceId=" +
        id
    );
    // console.log(res);
    setQuan(res.data);
  };
  const getWardByDistricID = async (id: any) => {
    const res = await axios.get(
      "http://localhost/api/controller/function/getWardByDistrictID/?districtId=" + id
    );
    // console.log(res);
    setPhuong(res.data);
  };
  const cur = ["VND", "Thương lượng", "giá/m2"];

  return (
    <form className="rentalform" onSubmit={handleSubmit}>
      <h2>Địa chỉ</h2> <br />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <label htmlFor="type">Loại bất động sản</label> <br />
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon />}
            fullWidth
            disablePortal
            id="type-combo-box"
            options={listType}
            value={formData.type}
            onChange={(event, value) =>
              setFormData({ ...formData, type: value || "" })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="VD: Shop house"
                variant="outlined"
                name="type"
                onChange={(event: any) => handleChangeThongTin(event, "type")}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="province">Tỉnh/Thành phố</label> <br />
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon />}
            disablePortal
            id="province-combo-box"
            options={tinh?.data}
            getOptionLabel={(resText: any) => resText.PROVINCE_NAME}
            sx={{ width: "100%" }}
            // value={formDataBatDongSan.province}
            onChange={(event, value) => {
              setFormData({
                ...formData,
                province: value || "",
              });
            }}
            onBlur={() => {
              getDistricByProvinceID(formData.province.PROVINCE_ID || 0);
              console.log(formData);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tỉnh/Thành phố"
                variant="outlined"
                name="province"
                onChange={(event: any) => {
                  handleChangeThongTin(event, "province");
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="district">Quận/Huyện</label> <br />
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon />}
            disablePortal
            id="district-combo-box"
            options={quan?.data || []}
            getOptionLabel={(resText: any) => resText.DISTRICT_NAME}
            sx={{ width: "100%" }}
            onChange={(event, value) =>
              setFormData({
                ...formData,
                district: value || "",
              })
            }
            onBlur={() => {
              getWardByDistricID(formData.district.DISTRICT_ID || 0);
              console.log(formData);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Quận/Huyện/Thị xã"
                variant="outlined"
                name="district"
                onChange={(event: any) => {
                  handleChangeThongTin(event, "district");
                  // console.log(formData);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="ward">Phường/xã</label> <br />
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon />}
            disablePortal
            id="province-combo-box"
            options={phuong?.data}
            getOptionLabel={(resText: any) => resText.WARDS_NAME}
            sx={{ width: "100%" }}
            // value={formData.ward}
            onChange={(event, value) =>
              setFormData({ ...formData, ward: value || "" })
            }
            renderInput={(params) => (
              <TextField
                name="ward"
                {...params}
                label="Phường/xã"
                variant="outlined"
                onChange={(event: any) => handleChangeThongTin(event, "ward")}
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};
