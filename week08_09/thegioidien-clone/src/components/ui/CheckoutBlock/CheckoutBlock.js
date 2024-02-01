import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./CheckoutBlock.module.scss";

import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { FaFileInvoiceDollar, FaRegAddressCard } from "react-icons/fa";

import { Link } from "react-router-dom";

import Cart from "./Cart";
import InputForms from "./InputForms";

const cx = classNames.bind(styles);

export default function CheckoutBlock() {
  const [isCheckout, setIsCheckout] = useState(false);

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
      placeHolder: "Họ tên",
    },
    {
      placeHolder: "Họ tên",
    },
  ];
  ///

  return (
    <div className="w-full">
      {isCheckout ? (
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
              " border border-solid border-[#B21E02]",
            ])}
          >
            {/* checkout-wrp__hd */}
            <div
              className={cx([
                "checkout-wrp__hd",
                " text-[1.2rem] flex items-center justify-between pt-2 pb-2",
              ])}
            >
              <div className={cx(["nav-left", " flex items-center ml-2"])}>
                <FaRegAddressCard className="mr-2 text-[#FFFF00]" />
                <span className="text-white">
                  Vui lòng điền thông tin để tiếp tục mua hàng
                </span>
              </div>
            </div>
            <div className="checkout-wrp__ct grid grid-cols-2">
              <div className={cx(["form-wrp", "flex flex-col p-4 gap-4"])}>
                <InputForms headers={headers} inputs={inputs} />
              </div>
              <div className={cx(["order-wrp", ""])}>hi</div>
            </div>
          </div>
        </div>
      ) : (
        <Cart setIsCheckout={setIsCheckout} />
      )}
    </div>
  );
}
