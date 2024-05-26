import React, { useEffect, useState } from "react";
import { useTitle } from "../../Components/useTitle";
import axios from "axios";
import { BASE_API_URL } from "../../BaseURL";
import { Post } from "../../@type/interface";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Grid, Modal, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface P extends Post {
  giatri: string;
  giachothue: string;
  idbds: string;
  idlienhe: string;
}

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      navigate("/user/authentication");
    }
  }, [navigate]);

  const [listPost, setListPost] = useState<P[]>([]);
  const [selectedRow, setSelectedRow] = useState<P | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState<Partial<P>>({});

  useTitle("Quản lý tin");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${BASE_API_URL}Controller/function/getTinByUserID/?userid=${sessionStorage.getItem(
          "id-user-lg"
        )}`
      );
      setListPost(res?.data);
    };
    fetchData();
    console.log(listPost);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "idbds", headerName: "ID Bất động sản", width: 90 },
    { field: "idlienhe", headerName: "ID Liên hệ", width: 90 },
    { field: "tieude", headerName: "Tiêu đề", width: 150, editable: true },
    { field: "mota", headerName: "Mô tả", width: 150, editable: true },
    { field: "ngaydang", headerName: "Ngày Đăng", width: 110, editable: true },
    { field: "giatri", headerName: "Giá trị", sortable: false, width: 160 },
    {
      field: "giachothue",
      headerName: "Giá cho thuê",
      sortable: false,
      width: 160,
    },
    { field: "donvi", headerName: "Đơn vị", sortable: false, width: 160 },
    { field: "dientich", headerName: "Diện tích", sortable: false, width: 160 },
    {
      field: "sophongngu",
      headerName: "Số phòng ngủ",
      sortable: false,
      width: 160,
    },
    { field: "sotang", headerName: "Số tầng", sortable: false, width: 160 },
    { field: "email", headerName: "Mail liên hệ", sortable: false, width: 160 },
    {
      field: "sodienthoai",
      headerName: "Số liên hệ",
      sortable: false,
      width: 160,
    },
    {
      field: "edit",
      headerName: "Chỉnh sửa",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <Button onClick={() => handleEdit(params.row)}>
          <EditIcon color="action" />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.row)}>
          <DeleteForeverIcon color="error" />
        </Button>
      ),
    },
  ];

  const handleEdit = (row: P) => {
    setSelectedRow(row);
    setFormValues({
      ...formValues,
      ...row,
    });
    setOpenModal(true);
  };

  const handleDelete = (row: P) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      axios
        .delete(
          `${BASE_API_URL}Controller/function/deletePostByID/?idpost=${row.id}`
        )
        .then((response) => {
          setListPost((prevList) =>
            prevList.filter((item) => item.id !== row.id)
          );
          alert("Xóa thành công");
        })
        .catch((error) => {
          console.error("Error deleting row:", error);
          alert("Error deleting row");
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (selectedRow) {
      const updatedRow = { ...selectedRow, ...formValues };
      console.log("data gửi đi: ", updatedRow);

      axios
        .post(`${BASE_API_URL}Controller/function/updatePost/`, updatedRow)
        .then((response) => {
          setListPost((prevList) =>
            prevList.map((item) =>
              item.id === updatedRow.id ? updatedRow : item
            )
          );
          setOpenModal(false);
        })
        .catch((error) => {
          console.error("Error updating row:", error);
        });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {Array.isArray(listPost) ? (
        <DataGrid
          rows={listPost}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <div>Không có dữ liệu</div>
      )}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Chỉnh sử bài đăng</h2>

          {selectedRow && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID"
                  hidden
                  value={selectedRow.id}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID Bất động sản"
                  hidden
                  value={selectedRow.idbds}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID liên hệ"
                  hidden
                  value={selectedRow.idlienhe}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="tieude"
                  label="Tiêu đề"
                  value={formValues.tieude || selectedRow.tieude}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="mota"
                  label="Mô tả"
                  value={formValues.mota || selectedRow.mota}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={7}
                  sx={{ mb: 2 }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  name="ngaydang"
                  label="Ngày Đăng"
                  value={formValues.ngaydang || selectedRow.ngaydang}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="giatri"
                  label="Giá trị"
                  value={formValues.giatri || selectedRow.giatri}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="giachothue"
                  label="Giá cho thuê"
                  value={formValues.giachothue || selectedRow.giachothue}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="donvi"
                  label="Đơn vị"
                  value={formValues.donvi || selectedRow.donvi}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dientich"
                  label="Diện tích"
                  value={formValues.dientich || selectedRow.dientich}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="sophongngu"
                  label="Số phòng ngủ"
                  value={formValues.sophongngu || selectedRow.sophongngu}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="sotang"
                  label="Số tầng"
                  value={formValues.sotang || selectedRow.sotang}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Mail liên hệ"
                  value={formValues.email || selectedRow.email}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="sodienthoai"
                  label="Số liên hệ"
                  value={formValues.sodienthoai || selectedRow.sodienthoai}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Index;
