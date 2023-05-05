import { ShoppingBag } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const Brand = () => {
  return (
    <>
      <Stack sx={{ position: "relative", width: "44px", height: "44px" }}>
        <Stack
          sx={{
            width: "36.35px",
            height: "40.17px",
            backgroundColor: "primary.main",
            opacity: 0.2,
            borderRadius: "8px",
          }}
        ></Stack>
        <div>
          <Stack
            sx={{
              position: "absolute",
              top: "0px",
              left: "-10px",
              backgroundColor: "primary.main",
              borderRadius: "8px",
            }}
          >
            <IconButton>
              <ShoppingBag sx={{ color: "blue.100" }} />
            </IconButton>
          </Stack>
        </div>
      </Stack>
    </>
  );
};

export default Brand;
