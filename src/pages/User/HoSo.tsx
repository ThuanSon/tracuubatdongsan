import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../BaseURL";
import { Typography } from "@mui/material";

interface HoSo {
  id: string;
  name: string;
  email: string;
  mobile: string;
  create_at: string;
}

const HoSo: React.FC = () => {
  const [hoso, setHoSo] = useState<HoSo | any>({});

  useEffect(() => {
    const fetchHoso = async () => {
      try {
        const idUser = sessionStorage.getItem("id-user-lg");
        console.log("User ID from session storage:", idUser); // Log the user ID

        if (idUser) {
          const res = await axios.get<HoSo>(
            `${BASE_API_URL}Controller/function/getHoSo/?id=${idUser}`
          );
          console.log("API response:", res.data); // Log the API response
          
          if (res.data) {
            setHoSo({ ...res.data });
          } else {
            console.error("No data received from the API");
          }
        } else {
          console.error("No user ID found in session storage");
        }
      } catch (error) {
        console.error("Error fetching HoSo:", error);
      }
    };

    fetchHoso();
  }, []); // Ensure the useEffect dependency array is correct

  return (
    <div>
      <Typography>{hoso.name || "No name available"}</Typography>
      <Typography>{hoso.email || "No email available"}</Typography>
      <Typography>{hoso.mobile || "No mobile available"}</Typography>
      <Typography>{hoso.create_at || "No creation date available"}</Typography>
    </div>
  );
};

export default HoSo;
