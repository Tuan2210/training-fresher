import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./CheckoutBlock.module.scss";

import { FaRegAddressCard } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";

import { Link } from "react-router-dom";

import Cart from "./Cart";
import CheckoutMember from "./CheckoutMember";
import InputForms from "./InputForms";

const cx = classNames.bind(styles);

export default function CheckoutBlock() {
  const currentUserInfo = localStorage.getItem("currentUSer")
    ? JSON.parse(localStorage.getItem("currentUSer"))
    : null;

  const [isCart, setIsCart] = useState(true);

  ///login-inputs-array
  const headers = [
    {
      title: "Đã là thành viên - Đăng nhập",
      option: "opt1",
    },
    {
      title: "Mua hàng ngay - Không cần đăng ký",
      option: "opt2",
    },
    {
      title: "Chưa là thành viên - Đăng ký",
      option: "opt3",
    },
  ];
  const inputs = [
    {
      labelAcc: "Tài khoản",
      placeHolderAcc: "Nhập email hoặc điện thoại",
      typeAcc: "text",
      labelPw: "Mật khẩu",
      typePw: "password",
    },
    {
      phName: "Họ tên",
      phPhone: "Điện thoại",
      phEmail: "Email",
      phAddress: "Địa chỉ giao hàng (số nhà, tên đường, phường/xã)",
    },
    {
      phName: "Họ tên",
      phPhone: "Điện thoại",
      phEmail: "Email",
      phPw: "Mật khẩu",
      phConfirmPw: "Xác nhận mật khẩu",
      phAddress: "Địa chỉ (số nhà, tên đường, phường/xã)",
    },
  ];
  ///

  return (
    <div className="w-full">
      {isCart ? (
        <Cart setIsCart={setIsCart} />
      ) : (
        <>
          {currentUserInfo ? (
            <CheckoutMember setIsCart={setIsCart} />
          ) : (
            <div className="flex flex-col mt-4 gap-4">
              {/* main-nav */}
              <div className="main-nav flex flex-wrap items-center font-medium">
                <Link
                  to="/"
                  className="flex items-center text-[1.2rem] gap-1 pt-2 pb-2 pl-2 mr-2"
                >
                  <IoHomeOutline className="text-[#E24B01] text-[1.6rem]" />
                  <span className=" text-[#3E0B00]">Trang chủ</span>
                </Link>
                <div className="flex items-center text-[1.2rem] pt-2 pb-2 gap-1">
                  <SlArrowRight className="text-[#E24B01]" />
                  <span className="">Điền Thông Tin</span>
                </div>
              </div>
              {/* checkout-wrp */}
              <div
                className={cx([
                  "checkout-wrp",
                  "border border-solid border-[#B21E02]",
                ])}
              >
                {/* checkout-wrp__hd */}
                <div
                  className={cx([
                    "checkout-wrp__hd",
                    "text-[1.2rem] flex items-center justify-between pt-2 pb-2",
                  ])}
                >
                  <div className={cx(["nav-left", " flex items-center ml-2"])}>
                    <FaRegAddressCard className="mr-2 text-[#FFFF00]" />
                    <span className="text-white">
                      Vui lòng điền thông tin để tiếp tục mua hàng
                    </span>
                  </div>
                </div>
                <div className={cx(["checkout-wrp__ct", "p-4 gap-4"])}>
                  <div className={cx(["form-wrp", "flex flex-col"])}>
                    <InputForms headers={headers} inputs={inputs} />
                  </div>
                  <div className={cx(["order-wrp", "flex flex-col"])}>
                    <div className="order-wrp__hd p-[0.7rem] text-[1.1rem] leading-[1.3] bg-[#FEDBD7] text-[#002F3F] flex items-center justify-center rounded-tl-[5px] rounded-tr-[5px]">
                      ĐƠN HÀNG
                    </div>
                    {/* order-wrp__title */}
                    <div
                      className={cx([
                        "order-wrp__title",
                        "grid bg-[#FFF1F0] text-[#002F3F]",
                      ])}
                    >
                      <span className="flex items-center justify-center p-[5px] overflow-hidden border-r border-l border-solid border-[#FEDBD7]">
                        STT
                      </span>
                      <span className="flex items-center justify-center p-[5px] overflow-hidden border-r border-solid border-[#FEDBD7]">
                        Hình
                      </span>
                      <span className="flex items-center justify-center p-[5px] overflow-hidden border-r border-solid border-[#FEDBD7]">
                        Tên sản phẩm
                      </span>
                      <span className="flex items-center justify-center p-[5px] overflow-hidden border-r border-solid border-[#FEDBD7]">
                        Thành tiền
                      </span>
                    </div>
                    {/* order-wrp__item */}
                    <div className={cx(["order-wrp__item", "grid"])}>
                      <span className="flex items-center justify-center p-[5px] overflow-hidden border-r border-l border-t border-solid border-[#FEDBD7]">
                        1
                      </span>
                      <span className="flex items-center justify-center p-[5px] overflow-hidden border-r border-t border-solid border-[#FEDBD7]">
                        <img
                          src="https://thegioidien.com/hmhB/A24216571232080.jpg"
                          alt="prd-img"
                        />
                      </span>
                      <span className="flex items-center p-[5px] overflow-hidden border-r border-t border-solid border-[#FEDBD7]">
                        Khớp nối trơn Ø16 mm
                      </span>
                      <div
                        className={cx([
                          "",
                          "flex flex-col gap-2 p-2 text-[#3E0B00] overflow-hidden border-t border-r border-solid border-[#FEDBD7]",
                        ])}
                      >
                        <div className="flex justify-between items-center gap-4 overflow-hidden">
                          <div className="flex gap-2 items-center">
                            <span>ĐVT:</span>
                            <span>Cái</span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="text-[#FF0000]">x</span>
                            <span>2</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Đơn giá</span>
                          <span>900</span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[#FF0000]">=</span>
                          <span>1800</span>
                        </div>
                      </div>
                    </div>
                    {/* order-wrp__sum */}
                    <div
                      className={cx([
                        "order-wrp__sum",
                        "flex justify-end gap-28 pt-2 pb-2 pr-2 text-[#3E0B00] border border-solid border-[#FEDBD7]",
                      ])}
                    >
                      <span>Tạm tính:</span>
                      <span>1.800</span>
                    </div>
                    {/* 2 btns */}
                    <div className="btns-wrp w-full p-4 flex justify-between">
                      <Link
                        to="/"
                        className="flex items-center p-2 bg-[#1C8DD9] rounded-[3px] gap-2"
                      >
                        <HiChevronDoubleLeft className="text-[#FFFF00]" />
                        <span className="text-white">Chọn thêm sản phẩm</span>
                      </Link>
                      <button
                        className="flex items-center p-2 bg-[#1C8DD9] rounded-[3px] gap-2"
                        // onClick={() => setIsCart(true)}
                      >
                        <FaRegTrashCan className="text-[#FFFF00]" />
                        <span className="text-white">Xóa đơn hàng</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
