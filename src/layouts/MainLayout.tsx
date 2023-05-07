import Header from "@/content/main/Header";
import { Stack } from "@mui/material";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

type MainLayoutProps = { children: React.ReactNode };

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ProtectedRoute>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Header />
        <Stack
          width="100vw"
          justifyContent={"center"}
          alignItems={"center"}
          flex={1}
          sx={{ marginTop: "20px" }}
        >
          {children}
        </Stack>
      </Stack>
    </ProtectedRoute>
  );
};

export default MainLayout;
