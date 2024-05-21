import { useEffect, useState } from "react";
import { TextField, Button, Grid, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Base64 from "../../@type/Base64";

const Search = () => {
  const nav = useNavigate();
  const [tinh, setTinh] = useState<any>();
  const [quan, setQuan] = useState<any>();
  const [formDataBatDongSan, setFormDataBatDongSan] = useState({
    usermail: sessionStorage.getItem("username"),
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
  });
  const handleChangeThongTin = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = event.target;
    setFormDataBatDongSan({ ...formDataBatDongSan, [name]: value });
  };
  const getProvince = async () => {
    const res = await axios.get(
      `http://localhost/api/controller/function/getProvince/`
    );
    setTinh(res.data);
  };
  const getDistricByProvinceID = async (id: any) => {
    const res = await axios.get(
      `http://localhost/api/controller/function/getDistrictByProvinceID/?provinceId=` +
        id
    );
    // console.log(res);
    setQuan(res.data);
  };
  console.log(formDataBatDongSan);
  useEffect(() => {
    getProvince();
  }, []);
  const handleClick = async () => {
    const dis = formDataBatDongSan.district.DISTRICT_NAME ?? "";
    const pro = formDataBatDongSan.province.PROVINCE_NAME ?? "";
    const address = dis.length === 0 ? pro : dis.normalize() + ", " + pro;
    // const res = await axios.get(
    //   `http://localhost/api/Controller/function/getBDSByAddress/?q=${address}`
    // );
    // console.log(res.data);
    nav(`/dashboard/bat-dong-san/${Base64.encode(Base64.encode(address))}`);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon />}
            disablePortal
            id="province-combo-box"
            options={tinh?.data || []}
            getOptionLabel={(resText: any) => resText.PROVINCE_NAME}
            sx={{ width: "100%" }}
            // value={formDataBatDongSan.province}
            onChange={(event, value) => {
              setFormDataBatDongSan({
                ...formDataBatDongSan,
                province: value || "",
              });
            }}
            onBlur={() => {
              getDistricByProvinceID(
                formDataBatDongSan.province.PROVINCE_ID || 0
              );
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
        <Grid item xs={12} sm={4}>
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon />}
            disablePortal
            id="district-combo-box"
            options={quan?.data || ["Phải chọn tỉnh trước"]}
            // getOptionLabel={(resText: any) => resText.DISTRICT_NAME}
            getOptionLabel={(option: any) => {
              if (typeof option === "string") {
                return option; // Return the string directly for non-object options
              } else {
                return option.DISTRICT_NAME; // Return the DISTRICT_NAME property for object options
              }
            }}
            sx={{ width: "100%" }}
            onChange={(event, value) =>
              setFormDataBatDongSan({
                ...formDataBatDongSan,
                district: value || "",
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Quận/Huyện/Thị xã"
                variant="outlined"
                name="district"
                onChange={(event: any) => {
                  handleChangeThongTin(event, "district");
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="submit"
            variant="contained"
            sx={{ height: "56px" }}
            color="primary"
            fullWidth
            onClick={handleClick}
          >
            <SearchIcon />
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
