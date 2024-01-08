// import styled from "styled-components";

// export default function Button({ onClick, label, className = "" }) {
//   return (
//     <button type="button" className={`${className}Btn`} onClick={onClick}>
//       {label}
//     </button>
//   );
// }
import { Link } from "react-router-dom";

import styles from "./LinkBtn.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function LinkBtn({ to = "", label, className = "" }) {
  return (
    <Link
      className={cx([
        `${className}`.includes("active") ? "active" : "btn",
        "text-white w-auto h-10 flex items-center p-5 rounded-xl",
      ])}
      to={to}
    >
      {label}
    </Link>
  );
}
