import { Favorite, Message, Person, ShoppingCart } from "@mui/icons-material";
import React from "react";
import NavButton from "./NavButton";

const NavBar = () => {
  return (
    <>
      <NavButton icon={<Person />} />
      <NavButton icon={<Message />} />
      <NavButton icon={<Favorite />} />
      <NavButton icon={<ShoppingCart />} />
    </>
  );
};

export default NavBar;
