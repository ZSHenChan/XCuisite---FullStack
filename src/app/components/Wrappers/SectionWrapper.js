import styles from "./wrappers.module.scss";

export default function SectionWrapper({ children, className }) {
  return (
    <div className={`${styles["wrapper--default"]} ${className}`}>
      {children}
    </div>
  );
}
