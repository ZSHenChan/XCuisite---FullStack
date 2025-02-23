import styles from "./spinner.module.scss";

export function SpinnerFull() {
  return (
    <div className={styles["spinner-full-container"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width={"25dvh"}
        height={"25dvh"}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="spinner"
      >
        <path
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#ff7f33"
          stroke="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51;360 50 51"
          ></animateTransform>
        </path>
      </svg>
    </div>
  );
}

export function SpinnerOrange({ size }) {
  return (
    <div className={styles["spinner-container"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width={size ? size : "100px"}
        height={size ? size : "100px"}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="spinner"
      >
        <path
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#f46200"
          stroke="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51;360 50 51"
          ></animateTransform>
        </path>
      </svg>
    </div>
  );
}

export function SpinnerWhite({ size }) {
  return (
    <div className={styles["spinner-container"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width={size ? size : "100px"}
        height={size ? size : "100px"}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="spinner"
      >
        <path
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#fff"
          stroke="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51;360 50 51"
          ></animateTransform>
        </path>
      </svg>
    </div>
  );
}
