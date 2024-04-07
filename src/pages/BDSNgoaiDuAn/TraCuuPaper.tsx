import HomeIcon from "@mui/icons-material/Home";
import { Grid, Paper, TextField, Typography } from "@mui/material";
export const TraCuuPaper = () => {
  return (
    // <div className="tra-cuu-paper">
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography>
          <h1>
            <HomeIcon /> Tra cứu bất động sản ngoài dự án
          </h1>
        </Typography>
      </Grid>
      <Grid item
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}

      >
      <Grid item>
        
      </Grid>
      </Grid>
    </Grid>

  );
};
{/* <Paper>
          <form>
            <Grid container>
              <Grid item xs={5} md={5} lg={5}>
                <TextField  
                  label='Diện tích đất'
                  fullWidth
                />
              <Grid item xs={2}></Grid>
              <Grid item xs={5} md={5} lg={5}>
                <TextField
                  label="Năm xây dựng"
                  fullWidth
                  // sx={}
                />
              </Grid>
            </Grid>
          </form>
        </Paper> */}