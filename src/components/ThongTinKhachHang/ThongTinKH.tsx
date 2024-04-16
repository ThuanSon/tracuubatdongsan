import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';

import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
export const ThongTinKH = () => {
    return (
        <div className="thong-tin-khach-hang" >
            {/* <Typography>

                <h1><HomeIcon /> Thông tin khách hàng nè</h1>
            </Typography>
            <form>

            </form> */}
            <Typography><AccountCircleIcon sx={{ fontSize: 80 }} /></Typography>

            <header>
                <Typography variant="h6" gutterBottom style={{ marginRight: 0 }}>
                    DO TRUONG AN
                </Typography>
            </header>
            <div className="thong-tin">
                <List className="thong-tin-khach-hang list" style={{ border: '1px solid black' }}>
                    <ListItem className="thong-tin-tai-khoan">
                        <ListItemText primary="Thông tin tài khoản" secondary="" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Tên đăng nhập" secondary="" />
                        <ListItemText primary="" secondary="dotruongan" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email" secondary="" />
                        <ListItemText primary="" secondary="truongando654@gmail.com" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Số điện thoại" secondary="" />
                        <ListItemText primary="" secondary="0369784882" />
                    </ListItem>
                    <ListItem className="thong-tin-ca-nhan">
                        <ListItemText primary="Thông tin cá nhân" secondary="" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Họ và tên" secondary="" />
                        <ListItemText primary="" secondary="DO TRUONG AN" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Giới tính" secondary="" />
                        <ListItemText primary="" secondary="Nam" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Ngày sinh" secondary="" />
                        <ListItemText primary="" secondary="18/9/2002" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Địa chỉ" secondary="" />
                        <ListItemText primary="" secondary="" />
                    </ListItem>
                </List>
            </div>
        </div>
    );
};
