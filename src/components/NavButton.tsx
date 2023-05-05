import { Person } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { ReactNode } from "react";

type NavButtonProps = { icon: ReactNode; href: string };

const NavButton = ({ icon, href }: NavButtonProps) => {
  return <IconButton href={href}>{icon}</IconButton>;
};

export default NavButton;
