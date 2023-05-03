import { Person } from "@mui/icons-material";
import { Icon, IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { ReactNode } from "react";

const NavButton = ({ icon }: { icon: ReactNode }) => {
  return <IconButton>{icon}</IconButton>;
};

export default NavButton;
