import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./MemberBlock.module.scss";

import PrdDetailsMainNav from "../PrdDetailsBlock/PrdDetailsMainNav";

import {
  FaFileImport,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaRegAddressCard,
  FaRegEdit,
  FaRegUser,
} from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { LuFileCheck, LuFileMinus, LuKeyRound } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import ChangePwForm from "./ChangePwForm";
import UpdateContactForm from "./UpdateContactForm";

const cx = classNames.bind(styles);

export default function MemberBlock() {
  const userInfo = useSelector((state) => state.user.currentUser?.info);
  const currentUserInfo = localStorage.getItem("currentUSer")
    ? JSON.parse(localStorage.getItem("currentUSer"))
    : null;

  // console.log(userInfo);
  // address
  // :
  // "11 BC, Quận Tân Bình, Thành phố Hồ Chí Minh"
  // email
  // :
  // "a@gmail.com"
  // id
  // :
  // 3
  // name
  // :
  // "a"
  // password
  // :
  // "$2a$10$WqKbLXNlGPyFj4QhiR0Lwu8xKZQ/BaIiZq8Ur5f9ZOAk1ADZShwTi"
  // phone
  // :
  // "+8494430220"

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

  ///update-pw-form
  const [isChangePwForm, setIsChangePwForm] = useState(false);

  const fullAddress = userInfo?.address?.split(", ") ?? [];
  const address = fullAddress[0] ?? "",
    district = fullAddress[1] ?? "",
    province = fullAddress[2] ?? "";

  ///update-contact-form
  const [isUpdateContactForm, setIsUpdateContactForm] = useState(false);
  ///

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
        {/* info-lbl */}
        <div
          className={cx([
            "user-info-wrp__top",
            " flex items-center gap-2 pt-2 pb-2 pl-[0.7rem] pr-[0.7rem]",
          ])}
        >
          <FaRegUser className="text-[#FFFF00]" />
          <span className="text-white">Thông tin</span>
        </div>
        {/* id-register-date */}
        <div
          className={cx([
            "user-info-wrp__center",
            "flex gap-5 bg-[#FEDBD7] p-4 pl-2 pr-2",
          ])}
        >
          <span>ID: ....</span>
          <span>Ngày đăng ký: .</span>
        </div>
        {/* login-contact-wrp */}
        <div
          className={cx(["user-info-wrp__bottom", "flex flex-col p-4 gap-4"])}
        >
          {/* login-info-wrp */}
          <div
            className={cx([
              "login-info",
              " bg-[#EDEDED] border border-solid border-[#CBCBCB]",
            ])}
          >
            {/* Thông tin đăng nhập */}
            <div
              className={cx([
                "login-info__hd",
                "flex items-center justify-center text-[1.1rem] gap-2 p-2 bg-[#CBCBCB]",
              ])}
            >
              <FaRegAddressCard className="text-[#0D427A] text-xl" />
              <span className="text-[#6A1300]">Thông tin đăng nhập</span>
            </div>
            <div
              className={cx([
                "login-info__ct",
                " flex flex-col p-4 overflow-hidden",
              ])}
            >
              {/* email */}
              <div className={cx(["info-row", "grid items-center pt-1 pb-1"])}>
                <span>Email:</span>
                {userInfo && <span>{userInfo.email}</span>}
              </div>
              {/* pw-row + changePwBtn | ChangePwForm */}
              {isChangePwForm ? (
                <ChangePwForm setIsChangePwForm={setIsChangePwForm} />
              ) : (
                <>
                  <div
                    className={cx(["info-row", "grid items-center pt-1 pb-1"])}
                  >
                    <span>Mật khẩu:</span>
                    <span>********</span>
                  </div>
                  <div className="change-pw-row flex items-center justify-center mt-4 mb-4">
                    <button
                      className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
                      onClick={() => {
                        setIsChangePwForm(true);
                      }}
                    >
                      <FaRegEdit className="text-[#FFFF00] text-lg" />
                      <span className="text-white">Đổi mật khẩu</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* contact-info-wrp */}
          <div
            className={cx([
              "contact-info",
              " bg-[#EDEDED] border border-solid border-[#CBCBCB]",
            ])}
          >
            {/* Thông tin liên hệ */}
            <div
              className={cx([
                "contact-info__hd",
                "flex items-center justify-center text-[1.1rem] gap-2 p-2 bg-[#CBCBCB]",
              ])}
            >
              <LuKeyRound className="text-[#0D427A] text-xl" />
              <span className="text-[#6A1300]">Thông tin liên hệ</span>
            </div>
            <div
              className={cx([
                "contact-info__ct",
                " flex flex-col p-4 overflow-hidden",
              ])}
            >
              {isUpdateContactForm ? (
                <UpdateContactForm
                  setIsUpdateContactForm={setIsUpdateContactForm}
                />
              ) : (
                <>
                  {/* fullname */}
                  <div
                    className={cx(["info-row", "grid items-center pt-1 pb-1"])}
                  >
                    <span>Họ tên:</span>
                    {userInfo && <span>{userInfo.name}</span>}
                  </div>
                  {/* phone-number */}
                  <div
                    className={cx(["info-row", "grid items-center pt-1 pb-1"])}
                  >
                    <span>Điện thoại:</span>
                    {userInfo && <span>{userInfo.phone}</span>}
                  </div>
                  {/* address */}
                  <div
                    className={cx(["info-row", "grid items-center pt-1 pb-1"])}
                  >
                    <span>Địa chỉ:</span>
                    <span>{address}</span>
                  </div>
                  {/* province */}
                  <div
                    className={cx(["info-row", "grid items-center pt-1 pb-1"])}
                  >
                    <span>Tỉnh thành:</span>
                    <select
                      defaultValue={province}
                      disabled
                      className="border border-solid border-[#D6D6D6] rounded-sm"
                    >
                      <option>{province}</option>
                    </select>
                  </div>
                  {/* district */}
                  <div
                    className={cx(["info-row", "grid items-center pt-1 pb-1"])}
                  >
                    <span>Quận huyện:</span>
                    <select
                      defaultValue={district}
                      disabled
                      className="border border-solid border-[#D6D6D6] rounded-sm"
                    >
                      <option>{district}</option>
                    </select>
                  </div>
                  {/* contact-info-rows + updateBtn | UpdateContactInfoForm */}
                  <div className="change-pw-row flex items-center justify-center mt-4 mb-4">
                    <button
                      className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
                      onClick={() => {
                        setIsUpdateContactForm(true);
                      }}
                    >
                      <FaRegEdit className="text-[#FFFF00] text-lg" />
                      <span className="text-white">Sửa</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
