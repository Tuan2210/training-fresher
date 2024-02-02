import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./CheckoutBlock.module.scss";

import { IoHomeOutline } from "react-icons/io5";
import { LuFileCheck } from "react-icons/lu";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";

import moment from "moment";

const cx = classNames.bind(styles);

export default function CheckoutMember() {
  const userInfo = useSelector((state) => state.user.currentUser?.info);

  const navigate = useNavigate();
  function handleNavigateCart() {
    navigate("/");
    setTimeout(() => {
      navigate("/muahang");
    }, 0.01);
  }

  return (
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
        <button
          className="flex items-center text-[1.2rem] pt-2 pb-2 gap-1 mr-1"
          onClick={handleNavigateCart}
        >
          <SlArrowRight className="text-[#E24B01]" />
          <span>Dự toán đơn hàng</span>
        </button>
        <div className="flex items-center text-[1.2rem] pt-2 pb-2 gap-1">
          <SlArrowRight className="text-[#E24B01]" />
          <span className="">Xác nhận đơn hàng</span>
        </div>
      </div>
      {/* checkout-member-wrp */}
      <div
        className={cx(["chko-mem-wrp", "border border-solid border-[#B21E02]"])}
      >
        {/* checkout-member-wrp__hd */}
        <div
          className={cx([
            "chko-mem-wrp__hd",
            " text-[1.2rem] flex items-center justify-between",
          ])}
        >
          <div className={cx(["nav-left", " flex items-center ml-2"])}>
            <LuFileCheck className="mr-2 text-[#FFFF00] text-xl" />
            <span className="text-white">Xác nhận đơn hàng</span>
          </div>
          <button
            className="flex guide-btn bg-[#DBDBDB] items-center p-2 hover:bg-[#EAEAEA]"
            onClick={handleNavigateCart}
          >
            <MdKeyboardArrowLeft className="text-[#b21e02] text-3xl" />
            <MdKeyboardArrowLeft className="ml-[-1.5rem] text-[#C5968D] text-3xl" />
            <span className="text-[#002F3F] text-base pr-2">Trở về</span>
          </button>
        </div>

        {/* checkout-member-wrp__ct */}
        <div className={cx(["chko-mem-wrp__ct", "p-2"])}>
          {/* top */}
          <div className="top p-2 bg-[#CBCBCB] rounded-tl-[5px]">
            {/* top__hd */}
            <div className="top__hd flex justify-between items-center">
              <img
                src="https://thegioidien.com/images/LogoEworld.PNG"
                alt="thegioidien-clone-img"
                width={200}
                height={150}
              />
              <span className="text-[#FC1518]">Mua nhanh giá tốt</span>
            </div>
            {/* top__title */}
            <div className="top__title p-2 text-[#430B01] text-[2rem] flex items-center justify-center">
              ĐƠN HÀNG
            </div>
            {/* top__info */}
            <div
              className={cx([
                "top__info",
                "flex flex-col pr-2 pb-4 pl-2 gap-4",
              ])}
            >
              {/* <div className="top__info flex flex-nowrap justify-between mb-2"> */}
              {/* left */}
              <div className={cx(["left", "flex flex-col gap-1"])}>
                <div
                  className={cx(["left__item", "grid grid-cols-[100px,1fr]"])}
                >
                  <span>Mã số:</span>
                  <span>
                    <b>EW49669</b>
                  </span>
                </div>
                <div
                  className={cx(["left__item", "grid grid-cols-[100px,1fr]"])}
                >
                  <span>Ngày:</span>
                  <span>{moment().format("DD/MM/YYYY")}</span>
                </div>
                <div
                  className={cx(["left__item", "grid grid-cols-[100px,1fr]"])}
                >
                  <span>Dự án:</span>
                  <span>DH-349580</span>
                </div>
              </div>

              {/* right */}
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-[100px,1fr]">
                  <span>Khách hàng:</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="grid grid-cols-[100px,1fr]">
                  <span>Điện thoại:</span>
                  <span>{userInfo.phone}</span>
                </div>
                <div className="grid grid-cols-[100px,1fr]">
                  <span>Email:</span>
                  <span>{userInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
          {/* bd */}
          <div className={cx("bd")}>
            {/* title */}
            <div
              className={cx([
                "title",
                "grid bg-[#EEEEEE] text-[#3E0B00] border-b border-solid border-[#CBCBCB]",
              ])}
            >
              {/* num-order */}
              <div
                className={cx([
                  "num-order",
                  "flex items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-l border-r border-solid border-l-[#CBCBCB] border-r-[#CBCBCB]",
                ])}
              >
                STT
              </div>
              {/* prd-img */}
              <div
                className={cx([
                  "prd-img",
                  "flex items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Hình
              </div>
              {/* prd-id */}
              <div
                className={cx([
                  "prd-id",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Mã sản phẩm
              </div>
              {/* prd-name */}
              <div
                className={cx([
                  "prd-name",
                  "flex items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Tên sản phẩm
              </div>
              {/* prd-brand */}
              <div
                className={cx([
                  "prd-brand",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Nhãn hiệu
              </div>
              {/* quantity */}
              <div
                className={cx([
                  "quantity",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Số lượng
              </div>
              {/* dvt */}
              <div
                className={cx([
                  "dvt",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                ĐVT
              </div>
              {/* prd-price */}
              <div
                className={cx([
                  "prd-price",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Đơn giá
              </div>
              {/* paid */}
              <div
                className={cx([
                  "paid",
                  "flex items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Thành tiền
              </div>
            </div>
            {/* item */}
            <div
              className={cx([
                "item",
                "grid text-[#3E0B00] border-b border-solid border-b-[#CBCBCB] bg-white",
              ])}
            >
              {/* num-order */}
              <div
                className={cx([
                  "num-order",
                  "flex items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-l border-r border-solid border-l-[#CBCBCB] border-r-[#CBCBCB]",
                ])}
              >
                1
              </div>
              {/* img */}
              <div
                className={cx([
                  "prd-img",
                  "flex items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                <img
                  src="https://thegioidien.com/hmhB/A24216571232080.jpg"
                  alt=""
                />
              </div>
              {/* prd-id */}
              <div
                className={cx([
                  "prd-id",
                  "hidden items-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                AM5S
              </div>
              {/* prd-name */}
              <div
                className={cx([
                  "prd-name",
                  "flex items-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Khớp nối trơn Ø16 mm
              </div>
              {/* prd-brand */}
              <div
                className={cx([
                  "prd-brand",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                MPE
              </div>
              {/* quantity */}
              <div
                className={cx([
                  "quantity",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                1
              </div>
              {/* dvt */}
              <div
                className={cx([
                  "dvt",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Cái
              </div>
              {/* prd-price */}
              <div
                className={cx([
                  "prd-price",
                  "hidden items-center justify-end p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                185.100
              </div>
              {/* paid */}
              <div
                className={cx([
                  "paid",
                  "hidden items-center justify-end p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                185.100
              </div>
              {/* paid-min */}
              <div
                className={cx([
                  "paid-min",
                  "flex flex-col gap-2 p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
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
                  <span>Đơn giá:</span>
                  <span>900</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[#FF0000]">=</span>
                  <span>1800</span>
                </div>
              </div>
            </div>
            {/* sum */}
            <div
              className={cx([
                "sum",
                "flex justify-end gap-12 pt-2 pb-2 pr-2 text-[#3E0B00] border border-t-0 border-solid border-[#CBCBCB] bg-white",
              ])}
            >
              <span>Tổng cộng:</span>
              <span>1.800</span>
            </div>
            {/* ship */}
            <div
              className={cx([
                "ship",
                "flex justify-end gap-10 pt-2 pb-2 pr-2 text-[#3E0B00] border border-t-0 border-solid border-[#CBCBCB] bg-white",
              ])}
            >
              <span>Phí vận chuyển:</span>
              <span>20.000</span>
            </div>
            {/* bill */}
            <div
              className={cx([
                "bill",
                "flex justify-end gap-10 pt-2 pb-2 pr-2 text-[#3E0B00] border border-t-0 border-solid border-[#CBCBCB] bg-white",
              ])}
            >
              <span>Tổng thanh toán:</span>
              <span>21.800</span>
            </div>
            {/* vnd */}
            <div
              className={cx([
                "vnd",
                "flex justify-end gap-14 pt-2 pb-2 pr-2 text-[#3E0B00] border border-t-0 border-solid border-[#CBCBCB] bg-white",
              ])}
            >
              <span>Đồng tiền:</span>
              <span>VNĐ</span>
            </div>
          </div>
          <div className="dkgn"></div>
          <div className="dkgn"></div>
          <div className="dkgn"></div>
          <div className="op"></div>
          <div className="ft"></div>
        </div>
      </div>
    </div>
  );
}
