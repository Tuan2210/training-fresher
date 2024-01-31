import classNames from "classnames/bind";
import styles from "./CheckoutBlock.module.scss";

const cx = classNames.bind(styles);

import { FaFileInvoiceDollar, FaRegEdit } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import { Link } from "react-router-dom";

import { dataItems } from "../PrdsMenu/dataPrdsMenu";

import { FaRegTrashCan, FaTrashCan } from "react-icons/fa6";

export default function Cart({ setIsCheckout }) {
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
        <div className="flex items-center text-[1.2rem] pt-2 pb-2 gap-1">
          <SlArrowRight className="text-[#E24B01]" />
          <span className="">Dự toán đơn hàng</span>
        </div>
      </div>
      {/* cart-wrp */}
      <div
        className={cx(["cart-wrp", " border border-solid border-[#B21E02]"])}
      >
        {/* cart-wrp__hd */}
        <div
          className={cx([
            "cart-wrp__hd",
            " text-[1.2rem] flex items-center justify-between",
          ])}
        >
          <div className={cx(["nav-left", " flex items-center ml-2"])}>
            <FaFileInvoiceDollar className="mr-2 text-[#FFFF00]" />
            <span className="text-white">Chi tiết đơn hàng, dự án</span>
          </div>
          <button className="flex guide-btn bg-[#DBDBDB] items-center p-2 hover:bg-[#EAEAEA]">
            <FaTrashCan className="mr-2 text-[#8D1802]" />
            <span className="text-[#002F3F] text-base">Xóa đơn hàng</span>
          </button>
        </div>

        {/* cart-wrp__ct */}
        <div className={cx(["cart-wrp__ct", "flex flex-col gap-4"])}>
          <div className="w-full p-4 flex flex-col gap-4">
            <span className="w-full text-[1.2rem] text-[#430B01]">
              Chọn sản phẩm nhanh
            </span>
            {/* prd-titles */}
            <select className="w-full border border-solid border-[#767676] rounded-sm">
              <option value="">-- Chọn danh mục sản phẩm</option>
              {dataItems.map((item, index) => (
                <option key={index} value="">
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* estimate-cart */}
          <div
            className={cx([
              "estimate-cart",
              "grid mr-2 mb-2 ml-2 border border-solid border-[#CBCBCB] border-t-0 border-b-0 rounded-t-[5px]",
            ])}
          >
            {/* estimate-cart__hd */}
            <div
              className={cx([
                "estimate-cart__hd",
                "p-4 flex justify-center rounded-t-[5px]",
              ])}
            >
              <span className="text-[#430B01] text-[1.2rem]">
                BẢNG DỰ TOÁN ĐƠN HÀNG
              </span>
            </div>
            {/* estimate-cart__title */}
            <div
              className={cx([
                "estimate-cart__title",
                "grid bg-[#EEEEEE] text-[#3E0B00] border-b border-solid border-b-[#CBCBCB]",
              ])}
            >
              <div
                className={cx([
                  "num-order",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-l border-r border-solid border-l-[#CBCBCB] border-r-[#CBCBCB]",
                ])}
              >
                STT
              </div>
              <div
                className={cx([
                  "prd-img",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Hình
              </div>
              <div
                className={cx([
                  "prd-id",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Mã sản phẩm
              </div>
              <div
                className={cx([
                  "prd-name",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Tên sản phẩm
              </div>
              <div
                className={cx([
                  "prd-brand",
                  "hidden items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Nhãn hiệu
              </div>
              <div
                className={cx([
                  "quantity",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Số lượng
              </div>
              <div
                className={cx([
                  "dvt",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                ĐVT
              </div>
              <div
                className={cx([
                  "prd-price",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Đơn giá
              </div>
              <div
                className={cx([
                  "paid",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Thành tiền
              </div>
              <div
                className={cx([
                  "action",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Hành động
              </div>
            </div>
            {/* estimate-cart__item */}
            <div
              className={cx([
                "estimate-cart__item",
                "grid text-[#3E0B00] border-b border-solid border-b-[#CBCBCB]",
              ])}
            >
              {/* num-order */}
              <div
                className={cx([
                  "num-order",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-l border-r border-solid border-l-[#CBCBCB] border-r-[#CBCBCB]",
                ])}
              >
                1
              </div>
              {/* img */}
              <div
                className={cx([
                  "prd-img",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
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
                  "items-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                AM5S
              </div>
              {/* prd-name */}
              <div
                className={cx([
                  "prd-name",
                  "items-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Khớp nối trơn Ø16 mm
              </div>
              {/* prd-brand */}
              <div
                className={cx([
                  "prd-brand",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                MPE
              </div>
              {/* quantity */}
              <div
                className={cx([
                  "quantity",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                1
              </div>
              {/* dvt */}
              <div
                className={cx([
                  "dvt",
                  "items-center justify-center p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                Cái
              </div>
              {/* prd-price */}
              <div
                className={cx([
                  "prd-price",
                  "items-center justify-end p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                185.100
              </div>
              {/* paid */}
              <div
                className={cx([
                  "paid",
                  "items-center justify-end p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                185.100
              </div>
              {/* action */}
              <div
                className={cx([
                  "action",
                  "flex-col items-center justify-center gap-2 p-2 text-[#3E0B00] overflow-hidden border-r border-solid border-r-[#CBCBCB]",
                ])}
              >
                <div
                  className={cx([
                    "action-details",
                    "flex flex-col gap-2 p-2 text-[#3E0B00] overflow-hidden",
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
                {/* action-btns */}
                <div className="mt-1 flex items-center justify-center gap-2">
                  <button className="flex gap-2 items-center p-2 bg-[#1D5161] rounded">
                    <FaRegEdit className="text-[#FFFF00]" />
                    <span className="text-white">Sửa</span>
                  </button>
                  <button className="flex gap-2 items-center p-2 bg-[#1D5161] rounded">
                    <FaRegTrashCan className="text-[#FFFF00]" />
                    <span className="text-white">Xóa</span>
                  </button>
                </div>
              </div>
            </div>
            {/* estimate-cart__sum */}
            <div
              className={cx([
                "estimate-cart__sun",
                "flex justify-end gap-10 pt-2 pb-2 pr-2 text-[#3E0B00] border-b border-solid border-b-[#CBCBCB]",
              ])}
            >
              <span>Tạm tính:</span>
              <span>1.800</span>
            </div>
          </div>
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
            onClick={() => setIsCheckout(true)}
          >
            <span className="text-white">Tiếp tục đặt hàng</span>
            <HiChevronDoubleRight className="text-[#FFFF00]" />
          </button>
        </div>
      </div>
    </div>
  );
}
