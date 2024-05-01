import { Paper } from "@mui/material";
import React, { ReactNode } from "react";
import Header from "./Header";

const defaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Paper>
        <Header />
        <div>{children}</div>
      </Paper>
    </div>
  );
};

export default defaultLayout;
