import {
  Favorite,
  LiveHelp,
  Logout,
  Message,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import NavButton from "./NavButton";
import { useSelector } from "react-redux";

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
