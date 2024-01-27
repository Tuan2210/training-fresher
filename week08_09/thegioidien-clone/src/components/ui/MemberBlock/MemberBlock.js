import classNames from "classnames/bind";
import styles from "./MemberBlock.module.scss";
import PrdDetailsMainNav from "../PrdDetailsBlock/PrdDetailsMainNav";

import { ImFileText2 } from "react-icons/im";
import {
  FaFileImport,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaRegUser,
} from "react-icons/fa";
import { LuFileCheck, LuFileMinus } from "react-icons/lu";

const cx = classNames.bind(styles);

export default function MemberBlock() {
  //handle render menu-items
  const menuItems = [
    {
      icon: <ImFileText2 className="text-[#FFFF00]" />,
      title: "Dự toán đơn hàng",
      quant: 0,
    },
    {
      icon: <FaFileImport className="text-[#FFFF00]" />,
      title: "Yêu cầu giá dự án",
      quant: 0,
    },
    {
      icon: <FaFileInvoiceDollar className="text-[#FFFF00]" />,
      title: "Bảng báo giá",
      quant: 0,
    },
    {
      icon: <FaFileSignature className="text-[#FFFF00]" />,
      title: "Đơn hàng đã đặt",
      quant: 0,
    },
    {
      icon: <LuFileCheck className="text-[#FFFF00] text-lg" />,
      title: "Đơn hàng đã nhận",
      quant: 0,
    },
    {
      icon: <LuFileMinus className="text-[#FFFF00] text-lg" />,
      title: "Đơn hàng đã hủy",
      quant: 0,
    },
  ];
  return (
    <div className="w-full flex flex-col mt-4">
      <PrdDetailsMainNav prdName={null} member={"Thành viên"} />

      {/* menu */}
      <div className={cx(["member-menu", "flex flex-col"])}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center pt-2 pb-2 pl-[0.7rem] pr-[0.7rem] gap-2 bg-[#1D8DD9] text-white border-b border-solid border-b-white"
          >
            {item.icon}
            <span>
              {item.title} ({item.quant})
            </span>
          </div>
        ))}
      </div>

      {/* user-info-wrp */}
      <div
        className={cx([
          "user-info-wrp",
          " border border-solid border-[#B21E02]",
        ])}
      >
        <div
          className={cx([
            "user-info-wrp__top",
            " flex items-center gap-2 pt-2 pb-2 pl-[0.7rem] pr-[0.7rem]",
          ])}
        >
          <FaRegUser className="text-[#FFFF00]" />
          <span className="text-white">Thông tin</span>
        </div>
        <div
          className={cx([
            "user-info-wrp__center",
            "flex gap-5 bg-[#FEDBD7] p-4 pl-2 pr-2",
          ])}
        >
          <span>ID: ....</span>
          <span>Ngày đăng ký: .</span>
        </div>
        <div
          className={cx(["user-info-wrp__bottom", "flex flex-col p-4 gap-4"])}
        ></div>
      </div>
    </div>
  );
}
