import { Stack, StackProps } from "@mui/material";
import React, { ReactNode } from "react";

type AuthPageLayoutProps = {} & StackProps;
const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      width="98vw"
      height="98vh"
    >
      {children}
    </Stack>
  );
};

export default AuthPageLayout;
