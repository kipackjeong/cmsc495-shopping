import {
  Favorite,
  LiveHelp,
  Logout,
  Message,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import React from "react";
import NavButton from "./NavButton";

const NavBar = () => {
  return (
    <>
      <NavButton icon={<ShoppingCart />} href="/cart" />
      <NavButton icon={<LiveHelp />} href="/faq" />
      <NavButton icon={<Logout />} href="/auth/logout" />
    </>
  );
};

export default NavBar;
