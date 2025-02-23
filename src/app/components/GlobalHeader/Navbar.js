// import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/custom-bootstrap.scss";
import styles from "./GlobalHeader.module.scss";

import NavbarNavRight from "./NavbarNavRight";
import NavbarNavLeft from "./NavbarNavLeft";
import Logo from "../Logo/Logo";

export default function Navbar({ children, onClickCart }) {
  return (
    <nav
      className={`navbar navbar-dark sticky-top ${styles["navbar"]}`}
      role="navigation"
    >
      <Logo absolute={true}></Logo>
      <NavbarNavLeft />
      <NavbarNavRight onClickCart={onClickCart} />
    </nav>
  );
}
