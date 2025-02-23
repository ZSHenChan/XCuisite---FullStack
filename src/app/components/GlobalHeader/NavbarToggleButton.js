import styles from "./GlobalHeader.module.scss";

export default function NavbarToggleButton({ children, onClick, navbarOpen }) {
  return (
    <div
      // htmlFor={"navbar-nav-checkbox"}
      className={styles["navbar-nav-btn-container"]}
      onClick={onClick}
    >
      <div
        className={`${styles["navbar-nav-btn"]} ${
          navbarOpen ? styles["navbar-nav-btn--active"] : ""
        }`}
      ></div>
    </div>
  );
}
