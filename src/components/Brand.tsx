import { ShoppingBag } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const Brand = () => {
  return (
    <>
      <Stack sx={{ width: "44px", height: "44px" }}>
        <Stack
          sx={{
            width: "36.35px",
            height: "40.17px",
            backgroundColor: "primary.main",
            opacity: 0.2,
            borderRadius: "8px",
          }}
        ></Stack>
        <Stack
          sx={{
            position: "absolute",
            left: "40px",
            backgroundColor: "primary.main",
            borderRadius: "8px",
          }}
        >
          <IconButton>
            <ShoppingBag sx={{ color: "blue.100" }} />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Brand;
