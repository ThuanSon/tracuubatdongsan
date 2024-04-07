import { useState } from "react";
import { TextField, Button, Grid, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; 
import React from "react";

type Province = {
  label: string;
  districts: string[];
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = React.useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState<string | null>(null);

  const vietnameseProvinces: Province[] = [
    { label: "Hà Nội", districts: ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng"] },
    { label: "TP Hồ Chí Minh", districts: ["Quận 1", "Quận 2", "Quận 3"] },
    // Add more provinces and districts as needed
  ];

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform search based on selectedProvince, selectedDistrict, or searchTerm
  };

  return (
    <form onSubmit={handleSearch}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
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
                  <TextField {...params} label="Tỉnh/Thành phố" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="district-combo-box"
                options={selectedProvince?.districts || []}
                sx={{ width: "100%" }}
                value={selectedDistrict}
                onChange={(event, value) => {
                  setSelectedDistrict(value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Quận/Huyện" variant="outlined" />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            <SearchIcon />
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Search;
