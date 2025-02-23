"use client";

import styles from "./GlobalHeader.module.scss";

import { useState } from "react";
import { useIsAuthenticated } from "@/context/AuthContext";

import NavbarNavTab from "./NavbarNavTab";
import LoginButton from "@/auth/LoginButton";
import LogoutButton from "@/auth/LogoutButton";
import Logo from "@/components/Logo/Logo";
import CartIcon from "./CartIcon";

import NavbarToggleButton from "./NavbarToggleButton";
export default function NavbarNavRight({ onClickCart }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const isAuth = useIsAuthenticated();
  const toggleNavbar = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
    <>
      <NavbarNavTab isOpen={navbarOpen} />
      <div className={`navbar-nav ${styles["navbar-nav--right"]}`}>
        {isAuth ? <LogoutButton /> : <LoginButton />}
        <CartIcon onClick={onClickCart} />
        <NavbarToggleButton onClick={toggleNavbar} navbarOpen={navbarOpen} />
      </div>
    </>
  );
}
