import Header from "@/content/main/Header";
import { Stack } from "@mui/material";
import React from "react";

type MainLayoutProps = { children: React.ReactNode };

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Header />
      <Stack
        width="100vw"
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}
        sx={{ backgroundColor: "grey.100" }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default MainLayout;
