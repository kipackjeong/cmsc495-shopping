import Brand from "@/components/Brand";
import NavBar from "@/components/NavBar";
import SearchForm from "@/components/SearchForm";
import Card from "@/ui/Card";
import { Box, Stack } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Card flex={1} sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Brand />
        <Box width="30px" />
        <SearchForm></SearchForm>
        <Box width="89px" />
        <NavBar />
      </Stack>
    </Card>
  );
};

export default Header;
