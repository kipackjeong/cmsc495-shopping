import Header from "@/content/Header";
import { Stack } from "@mui/material";
import React from "react";

type MainLayoutProps = { children: React.ReactNode };
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Header />
      {children}
    </Stack>
  );
};

export default MainLayout;
