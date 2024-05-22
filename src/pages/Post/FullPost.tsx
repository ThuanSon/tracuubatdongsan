import { InputOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Base64 from "../../@type/Base64";
import { BatDongSanType } from "../../@type/type";
import { useTitle } from "../../Components/useTitle";
interface Props {
  loaiTin: string;
}
const FullPost: React.FC<Props> = ({ loaiTin }) => {
  useTitle(`Đăng tin ${loaiTin?.toLocaleLowerCase()}`);
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      navigate("/user/authentication");
    }
    getProvince();
    getLoaiBDS();
  }, []);
  const [lienHe, setLienHe] = useState({
    tenlienhe: "",
    sodienthoai: "",
    email: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = event.target;
    setLienHe({ ...lienHe, [name]: value });
    console.log(lienHe);
  };
  //   const nav = useNavigate();

  const [selectedFiles, setSelectedFile] = useState<FileList | null>(null);

  const fileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files);
      const files = event.target.files;
      const filenames = Array.from(files).map((file) => file.name);
      setFormDataBatDongSan({
        ...formDataBatDongSan,
        anh1: filenames[0] || "",
        anh2: filenames[1] || "",
        anh3: filenames[2] || "",
        anh4: filenames[3] || "",
      });

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
          style={{ borderRadius: "7px" }}
          src={URL.createObjectURL(file)}
          alt={`Image ${index}`}
          width="400"
        />
      </div>
    ));
  };
  const [tinh, setTinh] = useState<any>();
  const [quan, setQuan] = useState<any>();
  const [phuong, setPhuong] = useState<any>();
  const giayTo = ["Sổ đỏ/Sổ hồng", "Hợp đồng mua bán", "Đang chờ giấy"];
  const noithat = ["Đầy đủ", "Cơ bản", "Chưa có"];
  const nav = useNavigate();

  const [numberOfBedrooms, setNumberOfBedrooms] = useState(0);

  const incrementBedrooms = () => {
    setNumberOfBedrooms((prevCount) => prevCount + 1);
  };
  const decrementBedrooms = () => {
    if (numberOfBedrooms > 0) {
      setNumberOfBedrooms((prevCount) => prevCount - 1);
    }
  };
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(0);

  const incrementBathrooms = () => {
    setNumberOfBathrooms((prevCount) => prevCount + 1);
  };

  const decrementBathrooms = () => {
    if (numberOfBathrooms > 0) {
      setNumberOfBathrooms((prevCount) => prevCount - 1);
    }
  };
  const [numberOfFloor, setNumberOfFloor] = useState(0);

  const incrementFloor = () => {
    setNumberOfFloor((prevCount) => prevCount + 1);
  };

  const decrementFloor = () => {
    if (numberOfFloor > 0) {
      setNumberOfFloor((prevCount) => prevCount - 1);
    }
  };
  const [formDataBatDongSan, setFormDataBatDongSan] = useState({
    usermail: sessionStorage.getItem("username"),
    loaiTin: loaiTin,
    type: { id: "", tenloai: "" },
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
    latitude: "",
    longitude: "",
    dientich: "",
    giatri: "",
    giachothue: "",
    donvi: "",
    tenlienhe: "",
    sodienthoai: "",
    email: "",
    sophongngu: numberOfBedrooms,
    sophongtam: numberOfBathrooms,
    sotang: numberOfFloor,
    giaytophaply: "",
    noithat: "",
    anh1: "",
    anh2: "",
    anh3: "",
    anh4: "",
  });
  // console.log(formDataBatDongSan);
  const [listType, setListType] = useState<any>();
  const getLoaiBDS = async () => {
    try {
      const res = await axios.get(
        "http://localhost/api/Controller/function/getLoaiBDS/"
      );
      setListType(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeThongTin = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = event.target;
    setFormDataBatDongSan({ ...formDataBatDongSan, [name]: value });
  };
  const handleChangePost = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = event.target;
    if (name === "sophongngu" || name === "sophongtam" || name === "sotang") {
      setNumberOfBedrooms(parseInt(value));
    }
    setFormDataPost({ ...formDataPost, [name]: value });
  };
  const handleSubmitAnh = async () => {
    if (!selectedFiles) {
      return -1;
    }
    const formDataBatDongSanImage = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formDataBatDongSanImage.append(
        "image[]",
        selectedFiles[i],
        selectedFiles[i].name
      );
    }

    const res = await axios.post(
      "http://localhost/api/controller/test/uploadimage.php",
      formDataBatDongSanImage
    );
    console.log("Image status: ", res.data);
    return res.data;
  };
  const handleSubmitLienHe = async () => {
    try {
      const response = await axios.post(
        "http://localhost/api/Controller/Lienhe/",
        lienHe
      );
      console.log("Lien he status: ", response.data.status);
      return response.data.status;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmitThongTinBatDongSan = async () => {
    const res = await axios.post(
      "http://localhost/api/controller/BatDongSan/",
      formDataBatDongSan
    );
    console.log("BDS status: ", res.data.status);
    return res.data.status;
  };
  useEffect(() => {
    sessionStorage.setItem("nguoiduoclienhe", lienHe.tenlienhe);
    sessionStorage.setItem("sodienthoai", lienHe.sodienthoai);
    sessionStorage.setItem("email", lienHe.email);
    sessionStorage.setItem("dientich", formDataBatDongSan.dientich);
    sessionStorage.setItem("giatri", formDataBatDongSan.giatri);
    sessionStorage.setItem("donvi", formDataBatDongSan.donvi);
    sessionStorage.setItem("giaytophaply", formDataBatDongSan.giaytophaply);
    sessionStorage.setItem("noithat", formDataBatDongSan.noithat);

    // Set formDataPost after setting session storage
    setFormDataPost({
      tieude: "",
      mota: "",
      idnguoidang: sessionStorage.getItem("username"),
      dientich: sessionStorage.getItem("dientich"),
      giatri: sessionStorage.getItem("giatri"),
      donvi: sessionStorage.getItem("donvi"),
      sophongngu: numberOfBedrooms,
      sophongtam: numberOfBathrooms,
      sotang: numberOfFloor,
      loaiTin: loaiTin,
      giaytophaply: sessionStorage.getItem("giaytophaply"),
      noithat: sessionStorage.getItem("noithat"),
      nguoiduoclienhe: sessionStorage.getItem("nguoiduoclienhe"),
      sodienthoai: sessionStorage.getItem("sodienthoai"),
      email: sessionStorage.getItem("email"),
      id: sessionStorage.getItem("id-user-lg"),
    });
  }, [
    lienHe,
    formDataBatDongSan,
    numberOfBedrooms,
    numberOfBathrooms,
    numberOfFloor,
  ]);

  const [formDataPost, setFormDataPost] = useState({
    tieude: "",
    mota: "",
    idnguoidang: sessionStorage.getItem("username"),
    dientich: sessionStorage.getItem("dientich"),
    giatri: sessionStorage.getItem("giatri"),
    donvi: sessionStorage.getItem("donvi"),
    sophongngu: numberOfBedrooms,
    sophongtam: numberOfBathrooms,
    sotang: numberOfFloor,
    loaiTin: loaiTin,
    giaytophaply: sessionStorage.getItem("giaytophaply"),
    noithat: sessionStorage.getItem("noithat"),
    nguoiduoclienhe: sessionStorage.getItem("nguoiduoclienhe"),
    sodienthoai: sessionStorage.getItem("sodienthoai"),
    email: sessionStorage.getItem("email"),
    id: sessionStorage.getItem("id-user-lg"),
  });
  const handleSubmitPost = async () => {
    const res = await axios.post(
      "http://localhost/api/controller/Post/",
      formDataPost
    );
    return res.data;
  };
  const handleSubmit = async () => {
    const anh = await handleSubmitAnh();
    if (anh) {
      const reslh = await handleSubmitLienHe();
      if (reslh === 1) {
        const resbds = await handleSubmitThongTinBatDongSan();
        if (resbds === 1) {
          const resPost = await handleSubmitPost();
          alert("Đăng tin thành công!");
          const id = sessionStorage.getItem("id-user-lg") ?? "";
          nav(`/user/profile/${Base64.encode(Base64.encode(id))}`);
          console.log(resPost);
        }
      }
    }
  };
  const getProvince = async () => {
    const res = await axios.get(
      "http://localhost/api/controller/function/getProvince/"
    );
    setTinh(res.data);
  };
  const getDistricByProvinceID = async (id: any) => {
    const res = await axios.get(
      "http://localhost/api/controller/function/getDistrictByProvinceID/?provinceId=" +
        id
    );
    setQuan(res.data);
  };
  const getWardByDistricID = async (id: any) => {
    const res = await axios.get(
      "http://localhost/api/controller/function/getWardByDistrictID/?districtId=" +
        id
    );
    setPhuong(res.data);
  };
  const cur = ["VND", "Thương lượng", "giá/m2"];
  // const [isFormValid, setIsFormValid] = useState(false);
  // const checkFormValidity = () => {
  //   const {
  //     tieude,
  //     mota,
  //     dientich,
  //     giatri,
  //     province,
  //     district,
  //     ward,
  //     giaytophaply,
  //     noithat,
  //   } = formDataBatDongSan;
  //   const { tenlienhe, sodienthoai, email } = lienHe;
  //   const isValid =
  //     !!tieude &&
  //     !!mota &&
  //     !!dientich &&
  //     !!giatri &&
  //     !!province.PROVINCE_ID &&
  //     !!district.DISTRICT_ID &&
  //     !!ward.WARDS_ID &&
  //     !!giaytophaply &&
  //     !!noithat &&
  //     !!tenlienhe &&
  //     !!sodienthoai &&
  //     !!email;
  //   setIsFormValid(isValid);
  // };
  // useEffect(() => {
  //   // Check if all required fields have values

  //   checkFormValidity();
  // }, [formDataBatDongSan, lienHe, formDataPost]);

  const [isDisabled, setIsDisabled] = useState(true);
  const check = () => {
    if (
      formDataBatDongSan.province.PROVINCE_NAME.length > 0 &&
      formDataBatDongSan.district.DISTRICT_NAME.length > 0 &&
      formDataBatDongSan.type.tenloai.length > 0 &&
      formDataBatDongSan.ward.WARDS_NAME.length > 0 &&
      formDataBatDongSan.street.length > 0 &&
      formDataBatDongSan.diachi.length > 0 &&
      formDataBatDongSan.dientich.length > 0 &&
      formDataBatDongSan.giatri.length > 0
      // formDataBatDongSan.donvi.length > 0 &&
      // lienHe.tenlienhe.length > 0 &&
      // lienHe.email.length > 0 &&
      // lienHe.sodienthoai.length > 0 &&
      // formDataPost.mota.length > 0 &&
      // formDataPost.tieude.length > 0
    ) {
      setIsDisabled(false);
    }
  };
  useEffect(() => {
    check();
  }, [formDataBatDongSan, lienHe, formDataPost]);
  return (
    <>
      <div className="rentalform">
        <h2>Địa chỉ</h2> <br />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <label htmlFor="type">Loại bất động sản</label> <br />
            <Autocomplete
              popupIcon={<KeyboardArrowDownIcon />}
              fullWidth
              disablePortal
              id="type-combo-box"
              options={listType || []}
              // value={formDataBatDongSan.type}
              getOptionLabel={(resText: any) => resText.tenloai}
              onChange={(event, value) =>
                setFormDataBatDongSan({
                  ...formDataBatDongSan,
                  type: value || "",
                })
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
                console.log(formDataBatDongSan);
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
              onBlur={() => {
                getWardByDistricID(
                  formDataBatDongSan.district.DISTRICT_ID || 0
                );
                console.log(formDataBatDongSan);
              }}
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
          <Grid item xs={12} sm={6}>
            <label htmlFor="ward">Phường/xã</label> <br />
            <Autocomplete
              popupIcon={<KeyboardArrowDownIcon />}
              disablePortal
              id="province-combo-box"
              options={phuong?.data || ["Phải chọn quận/huyện trước"]}
              // getOptionLabel={(resText: any) => resText.WARDS_NAME}
              getOptionLabel={(option: any) => {
                if (typeof option === "string") {
                  return option; // Return the string directly for non-object options
                } else {
                  return option.WARDS_NAME; // Return the DISTRICT_NAME property for object options
                }
              }}
              sx={{ width: "100%" }}
              // value={formData.ward}
              onChange={(event, value) =>
                setFormDataBatDongSan({
                  ...formDataBatDongSan,
                  ward: value || "",
                })
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
          <Grid item xs={12} sm={6}>
            <label htmlFor="street">Đường phố</label> <br />
            <Autocomplete
              popupIcon={<KeyboardArrowDownIcon />}
              disablePortal
              id="district-combo-box"
              options={[]}
              getOptionLabel={(option) => option}
              sx={{ width: "100%" }}
              value={formDataBatDongSan.street}
              onChange={(event, value) =>
                setFormDataBatDongSan({
                  ...formDataBatDongSan,
                  street: value || "",
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="street"
                  label="Đường phố"
                  variant="outlined"
                  onChange={(event: any) =>
                    handleChangeThongTin(event, "street")
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="diachi">Địa chỉ hiển thị trên bài đăng</label>{" "}
            <br />
            <TextField
              fullWidth
              label="Bạn có thể bổ sung hẻm, ngỏ, ngách"
              variant="outlined"
              name="diachi"
              onChange={(event: any) => handleChangeThongTin(event, "diachi")}
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
              onChange={async (event: any) => {
                handleChangeThongTin(event, "dientich");
                const address =
                  formDataBatDongSan.diachi +
                  " " +
                  formDataBatDongSan.street +
                  ", " +
                  formDataBatDongSan.ward.WARDS_NAME +
                  ", " +
                  formDataBatDongSan.district.DISTRICT_NAME +
                  ", " +
                  formDataBatDongSan.province.PROVINCE_NAME;
                try {
                  const res = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGh1YW5zb24iLCJhIjoiY2x2OWdtbWhlMDhzczJqcnE3YW9xYWQ0eCJ9.ouFu7M49A0ak3Tg6zyzTfg`
                  );
                  const { features } = res.data;
                  if (features && features.length > 0) {
                    const { center } = features[0];
                    setFormDataBatDongSan({
                      ...formDataBatDongSan,
                      latitude: center[1],
                      longitude: center[0],
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <label htmlFor="giatri">Giá trị</label> <br />
            <TextField
              fullWidth
              name="giatri"
              label="Giá trị bất động sản"
              onChange={(event: any) => handleChangeThongTin(event, "giatri")}
            />
          </Grid>
          <Grid item xs={4}>
            <label htmlFor="donvi">Đơn vị</label> <br />
            <Autocomplete
              popupIcon={<KeyboardArrowDownIcon />}
              fullWidth
              disablePortal
              id="cur-combo-box"
              options={cur}
              value={formDataBatDongSan.donvi}
              onChange={(event, value) =>
                setFormDataBatDongSan({
                  ...formDataBatDongSan,
                  donvi: value || "",
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="donvi"
                  label="VD: 150,000,000"
                  variant="outlined"
                  onChange={(event: any) =>
                    handleChangeThongTin(event, "donvi")
                  }
                />
              )}
            />
          </Grid>
          {formDataBatDongSan.dientich === null ||
          formDataBatDongSan.dientich < "1" ? (
            <></>
          ) : (
            <Fragment>
              <Grid item xs={6}>
                <label htmlFor="giaytophaply">Giấy tờ pháp lý</label> <br />
                <Autocomplete
                  popupIcon={<KeyboardArrowDownIcon />}
                  fullWidth
                  disablePortal
                  id="cur-combo-box"
                  options={giayTo}
                  value={formDataBatDongSan.giaytophaply}
                  onChange={(event, value) =>
                    setFormDataBatDongSan({
                      ...formDataBatDongSan,
                      giaytophaply: value || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="giaytophaply"
                      label="Sổ đỏ/Sổ hồng"
                      variant="outlined"
                      onChange={(event: any) =>
                        handleChangeThongTin(event, "giaytophaply")
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="noithat">Nội thất</label> <br />
                <Autocomplete
                  popupIcon={<KeyboardArrowDownIcon />}
                  fullWidth
                  disablePortal
                  id="cur-combo-box"
                  options={noithat}
                  value={formDataBatDongSan.noithat}
                  onChange={(event, value) =>
                    setFormDataBatDongSan({
                      ...formDataBatDongSan,
                      noithat: value || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="noithat"
                      label="Đầy đủ"
                      variant="outlined"
                      onChange={(event: any) =>
                        handleChangeThongTin(event, "noithat")
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <label htmlFor="sophongngu">Số phòng ngủ</label>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button fullWidth onClick={decrementBedrooms}>
                      -
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      type="text"
                      name="sophongngu"
                      className="sophongngu"
                      value={formDataBatDongSan.sophongngu}
                      onChange={(e: any) =>
                        handleChangeThongTin(e, "sophongngu")
                      }
                      //   disabled
                    />
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button fullWidth onClick={incrementBedrooms}>
                      +
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <label htmlFor="sophongtam">Số phòng tắm</label>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button fullWidth onClick={decrementBathrooms}>
                      -
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      type="text"
                      name="sophongtam"
                      className="sophongtam"
                      value={formDataBatDongSan.sophongtam}
                      onChange={(e: any) =>
                        handleChangeThongTin(e, "sophongtam")
                      }
                      //   disabled
                      // aria-readonly
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button fullWidth onClick={incrementBathrooms}>
                      +
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <label htmlFor="sotang">Số tầng</label>
                  </Grid>
                  <Grid item xs={1}>
                    <Button fullWidth onClick={decrementFloor}>
                      -
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      type="text"
                      name="sotang"
                      className="sotang"
                      value={formDataBatDongSan.sotang}
                      onChange={(e: any) => handleChangeThongTin(e, "sotang")}
                      //   disabled
                    />
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button fullWidth onClick={incrementFloor}>
                      +
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Grid>
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
        </Grid>{" "}
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
              name="file[]"
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
        </Grid>
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
            {}
            <Button
              // className={!isDisabled ? "disable-status" : "button-submit"}
              className={isDisabled ? "disable-status" : "button-submit"}
              fullWidth
              type="submit"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              Đăng bài
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default FullPost;
