import Brand from "@/components/Brand";
import NavBar from "@/components/NavBar";
import SearchForm from "@/components/SearchForm";
import { Box, Stack } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Stack
      direction="row"
      height="86px"
      alignItems="center"
      justifyContent="center"
    >
      <Brand />
      <Box width="49px" />
      <SearchForm></SearchForm>
      <Box width="89px" />
      <NavBar />
    </Stack>
  );
};

export default Header;
