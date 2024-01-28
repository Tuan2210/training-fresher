import { useState } from "react";
import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./MemberBlock.module.scss";

import PrdDetailsMainNav from "../PrdDetailsBlock/PrdDetailsMainNav";

import { ImFileText2 } from "react-icons/im";
import {
  FaFileImport,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaRegUser,
  FaRegAddressCard,
  FaRegEdit,
  FaSync,
  FaTimes,
} from "react-icons/fa";
import { LuFileCheck, LuFileMinus, LuKeyRound } from "react-icons/lu";

const cx = classNames.bind(styles);

export default function MemberBlock() {
  const userInfo = useSelector((state) => state.user.currentUser?.info);

  // console.log(userInfo);
  // {address: '11 BC, Quận Tân Bình, Thành phố Hồ Chí Minh', name: 'a', id: 3, email: 'a@gmail.com'}

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

  const [isUpdatePwForm, setIsUpdatePwForm] = useState(false);
  function UpdatePwForm() {
    return (
      <form className="pt-1 pb-1 flex flex-col gap-2">
        {/* old-pw-wrp */}
        <div className="flex flex-col gap-1">
          <span>Mật khẩu cũ</span>
          <div className="flex gap-2">
            <input
              type="password"
              className="old-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            />
            <span className="text-[#FF6600]">*</span>
          </div>
          <span className="text-[#CC0000]">Vui lòng nhập mật khẩu cũ!</span>
        </div>
        {/* new-pw-wrp */}
        <div className="flex flex-col gap-1">
          <span>Mật khẩu mới</span>
          <div className="flex gap-2">
            <input
              type="password"
              className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            />
            <span className="text-[#FF6600]">*</span>
          </div>
          <span className="text-[#CC0000]">Vui lòng nhập mật khẩu mới!</span>
        </div>
        {/* confirm-pw-wrp */}
        <div className="flex flex-col gap-1">
          <span>Xác nhận mật khẩu mới</span>
          <div className="flex gap-2">
            <input
              type="password"
              className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            />
            <span className="text-[#FF6600]">*</span>
          </div>
          <span className="text-[#CC0000]">
            Vui lòng xác nhận mật khẩu mới!
          </span>
        </div>
        <div className="btns-row flex items-center justify-center mt-4 mb-4 gap-4 text-sm">
          <button
            className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
            // onClick={() => {
            //   setIsUpdatePwForm(true);
            // }}
          >
            <FaSync className="text-[#FFFF00]" />
            <span className="text-white">Cập nhật</span>
          </button>
          <button
            className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
            onClick={() => {
              setIsUpdatePwForm(false);
            }}
          >
            <FaTimes className="text-[#FFFF00] text-lg" />
            <span className="text-white">Hủy</span>
          </button>
        </div>
      </form>
    );
  }

  const fullAddress = userInfo?.address?.split(", ") ?? [];
  const address = fullAddress[0] ?? "",
    district = fullAddress[1] ?? "",
    province = fullAddress[2] ?? "";

  const [isUpdateContactForm, setIsUpdateContactForm] = useState(false);
  function UpdateContactForm() {
    return (
      <form className="pt-1 pb-1 flex flex-col gap-2">
        {/* fullname-wrp */}
        <div className="flex flex-col gap-1">
          <span>Họ tên</span>
          <div className="flex gap-2">
            <input
              type="text"
              className="old-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
              defaultValue={userInfo?.name}
            />
            <span className="text-[#FF6600]">*</span>
          </div>
          <span className="text-[#CC0000]">Vui lòng nhập họ tên!</span>
        </div>
        {/* phone-wrp */}
        <div className="flex flex-col gap-1">
          <span>Điện thoại</span>
          <div className="flex gap-2">
            <input
              type="text"
              className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
              defaultValue={userInfo?.phone}
            />
            <span className="text-[#FF6600]">*</span>
          </div>
          <span className="text-[#CC0000]">Vui lòng nhập số điện thoại!</span>
        </div>
        {/* address-wrp */}
        <div className="flex flex-col gap-1">
          <span>Địa chỉ</span>
          <div className="flex gap-2">
            <input
              type="text"
              className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
              defaultValue={address}
            />
            <span className="text-[#FF6600]">*</span>
          </div>
          <span className="text-[#CC0000]">Vui lòng nhập địa chỉ!</span>
        </div>
        {/* province */}
        <div className="flex flex-col gap-1">
          <span>Tỉnh thành</span>
          <select defaultValue={province}>
            <option value={province}>{province}</option>
          </select>
          <span className="text-[#CC0000]">Vui lòng chọn tỉnh thành!</span>
        </div>
        {/* district */}
        <div className="flex flex-col gap-1">
          <span>Quận huyện</span>
          <select defaultValue={district}>
            <option value={district}>{district}</option>
          </select>
          <span className="text-[#CC0000]">Vui lòng chọn quận huyện!</span>
        </div>
        <div className="btns-row flex items-center justify-center mt-4 mb-4 gap-4 text-sm">
          <button
            className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
            // onClick={() => {}}
          >
            <FaSync className="text-[#FFFF00]" />
            <span className="text-white">Cập nhật</span>
          </button>
          <button
            className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
            onClick={() => {
              setIsUpdateContactForm(false);
            }}
          >
            <FaTimes className="text-[#FFFF00] text-lg" />
            <span className="text-white">Hủy</span>
          </button>
        </div>
      </form>
    );
  }

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
              {/* pw-row + changePwBtn | UpdatePwForm */}
              {isUpdatePwForm ? (
                <UpdatePwForm />
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
                        setIsUpdatePwForm(true);
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
                <UpdateContactForm />
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
                    <select defaultValue={province} disabled>
                      <option>{province}</option>
                    </select>
                  </div>
                  {/* district */}
                  <div
                    className={cx(["info-row", "grid items-center pt-1 pb-1"])}
                  >
                    <span>Quận huyện:</span>
                    <select defaultValue={district} disabled>
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
