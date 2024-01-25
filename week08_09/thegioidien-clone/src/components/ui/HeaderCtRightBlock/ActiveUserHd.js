import styles from "../../../layouts/Header/Header.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";

import { FaRegUserCircle, FaFileInvoiceDollar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getUserLogined } from "../../../services/userApiRequest";

const cx = classNames.bind(styles);

export default function ActiveUserHd() {
  const dispatch = useDispatch();

  // const currentUser = useSelector((state) => state.auth.login?.currentUser);
  // const accessToken = currentUser?.accessToken;
  const currentUSerInfo = JSON.parse(localStorage.getItem("currentUSer"));

  useEffect(() => {
    getUserLogined(currentUSerInfo?.accessToken, dispatch);
  }, []);

  const userInfo = useSelector((state) => state.user.currentUser?.info);
  return (
    <div
      className={cx([
        "header-content__right",
        "col-span-3 w-full block p-2 rounded-sm bg-[#DBDBDB]",
      ])}
    >
      {userInfo && (
        <div className={cx(["", "mt-2 w-full text-[1.1rem] text-[#003B4F]"])}>
          Xin chào {userInfo.name}
        </div>
      )}
      <Link
        to="#"
        className={cx([
          "",
          "w-full mt-4 flex items-center pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] gap-2 bg-[#EAEAEA] rounded-[3px] hover:bg-[#F1F1F1]",
        ])}
      >
        <FaRegUserCircle className="text-lg text-[#003B4F]" />
        <span className="text-[#6A1300]">Quản lý tài khoản</span>
      </Link>
      <Link
        to="#"
        className={cx([
          "",
          "w-full mt-4 flex items-center pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] gap-2 bg-[#EAEAEA] rounded-[3px] hover:bg-[#F1F1F1]",
        ])}
      >
        <FaFileInvoiceDollar className="text-lg text-[#003B4F]" />
        <span className="text-[#6A1300]">Tạo dự toán đơn hàng mới</span>
      </Link>
    </div>
  );
}
