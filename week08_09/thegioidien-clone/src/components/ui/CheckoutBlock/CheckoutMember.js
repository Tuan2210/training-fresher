import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./CheckoutBlock.module.scss";

import { IoHomeOutline } from "react-icons/io5";
import { LuFileCheck } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdOutlineLocalShipping } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { FaLevelUpAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import moment from "moment";

import axios from "axios";

import {
  handleFetchDistricts,
  handleFetchProvinces,
} from "../../../services/prov_distApiRequest";
import { PROVINCES_URL } from "../../../constants/apiUrl";

const cx = classNames.bind(styles);

export default function CheckoutMember() {
  const userInfo = useSelector((state) => state.user.currentUser?.info);

  // console.log(userInfo);

  const navigate = useNavigate();
  function handleNavigateCart() {
    navigate("/");
    setTimeout(() => {
      navigate("/muahang");
    }, 0.01);
  }

  const fullAddress = userInfo?.address?.split(", ") ?? [];
  const address = fullAddress[0].trim() ?? "";
  const [disDefault, setDisDefault] = useState(fullAddress[1].trim() ?? "");
  const [provDefault, setProvDefault] = useState(fullAddress[2].trim() ?? "");

  ////call api provinces-cities & districts
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(false);
  const [updateContactMsg, setUpdateContactMsg] = useState("");

  function onChangeProvince(value) {
    setSelectedProvince(false);
    if (value !== disDefault) setProvDefault(value);

    const provObj = provinces.find((item) => item.province_name === value);
    if (provObj)
      handleFetchDistricts(
        provObj.province_id,
        provinces,
        setDistricts,
        setSelectedProvince
      );
  }

  function onChangeDistrict(value) {
    setDisDefault(value);
  }
  ////

  ////check-btn
  const [checkCashPay, setCheckCashPay] = useState(false);
  const [checkBankPay, setCheckBankPay] = useState(true);
  const [showBankOption, setShowBankOption] = useState("flex");

  const [checkAgree, setCheckAgree] = useState(false);
  const [checkPrdPrice, setCheckPrdPrice] = useState(false);
  const [titleConfirmBtn, setTitleConfirmBtn] = useState("Xác nhận đơn hàng");
  ////

  useEffect(() => {
    const provId = provinces.find(
      (p) => p.province_name === provDefault
    )?.province_id;
    if (provId) {
      const fetchDisDefault = async () => {
        const res = await axios.get(
          `${PROVINCES_URL}/api/province/district/${provId}`
        );
        res?.data?.results && setDistricts(res.data.results);
      };
      fetchDisDefault();
    }
  }, [provinces]);

  useEffect(() => {
    if (provDefault && !districts.length) handleFetchProvinces(setProvinces);
  }, []);

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
          {/* dkgn */}
          <div
            className={cx([
              "dkgn",
              "mt-4 bg-[#F9F9F9] rounded-bl-[5px] rounded-br-[5px]",
            ])}
          >
            {/* dkgn__hd */}
            <div
              className={cx([
                "dkgn__hd",
                "flex items-center pt-2 pb-2 border border-solid border-b-[#B21E02]",
              ])}
            >
              <MdOutlineLocalShipping className="text-[#6A1300] text-3xl ml-2 mr-2" />
              <span className="text-[1.2rem]">Điều khoản giao nhận</span>
            </div>
            {/* dkgn__ct */}
            <div className={cx(["dkgn__ct", "block"])}>
              <div className="flex items-center flex-nowrap justify-end mt-2 mr-2">
                <span className="text-[#FF6600] mr-2 text-xl">*</span>
                <span className="text-[#8D8D8D]">là thông tin bắt buộc</span>
              </div>
              {/* dkgnct-nnh */}
              <div
                className={cx([
                  "dkgnct-nnh",
                  "flex flex-col p-2 pb-0 pl-6 gap-1",
                ])}
              >
                {/* Người nhận hàng */}
                <div>
                  <span className="text-[#3B3B3B]">Người nhận hàng</span>
                  <div className="flex gap-2 pr-1 overflow-x-hidden">
                    <input
                      // {...input.register}
                      type="text"
                      className="h-9 w-full border border-solid border-[#767676] rounded-sm"
                      defaultValue={userInfo?.name}
                    />
                    <span className="text-[#FF6600]">*</span>
                  </div>
                </div>
                {/* Điện thoại */}
                <div>
                  <span className="text-[#3B3B3B]">Điện thoại</span>
                  <div className="flex gap-2 pr-1 overflow-x-hidden">
                    <input
                      // {...input.register}
                      type="text"
                      className="h-9 w-full border border-solid border-[#767676] rounded-sm"
                      defaultValue={userInfo?.phone}
                    />
                    <span className="text-[#FF6600]">*</span>
                  </div>
                </div>
              </div>
              {/* dkgnct-row */}
              <div
                className={cx([
                  "dkgnct-row",
                  "mt-1 flex flex-col p-2 pb-0 pl-6 gap-1",
                ])}
              >
                {/* Địa chỉ giao hàng */}
                <span className="text-[#3B3B3B]">Địa chỉ giao hàng</span>
                <div className={cx("inputs-row", "w-full flex flex-col")}>
                  {/* num-address */}
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex gap-2 pr-1 overflow-x-hidden">
                      <input
                        // {...input.register}
                        type="text"
                        className="h-10 w-full border border-solid border-[#767676] rounded-sm"
                        defaultValue={address}
                      />
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* {errors.placeProv && (
                      <span className="text-[#CC0000]">{errors.placeProv.message}</span>
                    )} */}
                  </div>
                  {/* choose prov */}
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex gap-2 pr-1 overflow-x-hidden">
                      <select
                        className="w-full mt-1 p-2 text-[16px] border border-solid border-[#767676]"
                        // {...register("placeDis", {
                        //   required: "Vui lòng chọn quận huyện!",
                        // })}
                        value={provDefault}
                        onChange={(e) => {
                          onChangeProvince(e.target.value);
                        }}
                      >
                        <option
                          className="option-default"
                          value=""
                          disabled={selectedProvince}
                        >
                          -- Chọn tỉnh thành
                        </option>
                        {provinces.map((p) => (
                          <option key={p.province_id} value={p.province_name}>
                            {p.province_name}
                          </option>
                        ))}
                      </select>
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* {errors.placeProv && (
                      <span className="text-[#CC0000]">{errors.placeProv.message}</span>
                    )} */}
                  </div>
                  {/* choose dis */}
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex gap-2 pr-1 overflow-x-hidden">
                      <select
                        className="w-full mt-1 p-2 text-[16px] border border-solid border-[#767676]"
                        // {...register("placeProv", {
                        //   required: "Vui lòng chọn tỉnh thành!",
                        // })}
                        value={disDefault}
                        onChange={(e) => {
                          onChangeDistrict(e.target.value);
                        }}
                      >
                        {districts.map((d) => (
                          <option key={d.district_id} value={d.district_name}>
                            {d.district_name}
                          </option>
                        ))}
                      </select>
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* {errors.placeDis && (
                      <span className="text-[#CC0000]">{errors.placeDis.message}</span>
                    )} */}
                  </div>
                </div>
              </div>
              {/* dkgnct-row */}
              <div
                className={cx(["dkgnct-row", "mt-1 flex p-2 pb-0 pl-6 gap-2"])}
              >
                <span className="text-[#3B3B3B]">Thời gian giao hàng:</span>
                <span>Trong vòng 12 - 24 giờ làm việc.</span>
              </div>
              {/* dkgnct-row */}
              <div
                className={cx([
                  "dkgnct-row",
                  "mt-1 flex flex-col p-2 pb-0 pl-6 gap-1",
                ])}
              >
                <span className="text-[#3B3B3B]">Ghi chú đơn hàng</span>
                <textarea
                  className="p-2 mb-2 text-[1rem] font-[Arial] border border-solid border-[#767676] rounded-sm"
                  rows={3}
                  cols={20}
                />
              </div>
              {/* dkgnctrowoth */}
              <div className={cx(["dkgnctrowoth", "p-2 pb-4 pl-6"])}></div>
            </div>
          </div>
          {/* pttt */}
          <div
            className={cx([
              "pttt",
              "mt-4 bg-[#F9F9F9] rounded-bl-[5px] rounded-br-[5px]",
            ])}
          >
            {/* pttt__hd */}
            <div
              className={cx([
                "pttt__hd",
                "flex items-center pt-2 pb-2 border border-solid border-b-[#B21E02]",
              ])}
            >
              <FaMoneyCheckAlt className="text-[#6A1300] text-3xl ml-2 mr-2" />
              <span className="text-[1.2rem]">Phương thức thanh toán</span>
            </div>
            {/* pttt__ct */}
            <div
              className={cx(["pttt__ct", "mt-2 grid gap-4 grid-cols-[1fr]"])}
            >
              {/* ptttct-op */}
              <div className={cx(["ptttct-op", "flex flex-col p-2 gap-2"])}>
                {/* ptttctop-item */}
                <div
                  className={cx([
                    "ptttctop-item",
                    "flex flex-nowrap items-center gap-2",
                  ])}
                >
                  <input
                    type="radio"
                    id="cash-pay"
                    value={"opTienMat"}
                    checked={checkCashPay}
                    onClick={() => {
                      setCheckCashPay(true);
                      setCheckBankPay(false);
                      setShowBankOption("none");
                    }}
                  />
                  <label htmlFor="cash-pay" className="cursor-pointer">
                    Thanh toán tiền mặt ngay khi nhận hàng
                  </label>
                </div>
                {/* ptttctop-item */}
                <div className={cx(["ptttctop-item", "flex flex-col"])}>
                  {/* ptttctopitem-sub */}
                  <div
                    className={cx([
                      "ptttctopitem-sub",
                      "flex flex-nowrap items-center gap-2",
                    ])}
                  >
                    <input
                      type="radio"
                      id="bank-pay"
                      value={"opChuyenKhoan"}
                      checked={checkBankPay}
                      onClick={() => {
                        setCheckCashPay(false);
                        setCheckBankPay(true);
                        setShowBankOption("flex");
                      }}
                    />
                    <label htmlFor="bank-pay" className="cursor-pointer">
                      Chuyển khoản trước qua ngân hàng
                    </label>
                  </div>
                  {/* ptttctopitem-note */}
                  <div
                    className={cx([
                      "ptttctopitem-note",
                      "flex flex-nowrap items-center pl-3 text-[#585858] gap-2",
                    ])}
                  >
                    <FaLevelUpAlt style={{ transform: "rotateY(180deg)" }} />
                    <span className=" text-[14px]">
                      Vui lòng ghi mã số đơn hàng vào nội dung thanh toán.
                    </span>
                  </div>
                </div>
                {/* ptttctop-item */}
                <div
                  className={cx(["ptttctop-item", "gap-3"])}
                  style={{ display: showBankOption }}
                >
                  <select className="input-bank-row mt-2 w-full border border-solid border-[#767676]">
                    <option value="0">-- Chọn ngân hàng --</option>
                    <option value="1">
                      Đỗ Thị Ánh Tuyết tại Ngân Hàng ACB - PGD Tam Hà - CN Thủ
                      Đức
                    </option>
                    <option value="2">
                      Công Ty TNHH Thế Giới Điện tại Ngân Hàng ACB - PGD Tam Hà
                      - CN Thủ Đức
                    </option>
                  </select>
                  <span className="text-[#FF6600]">*</span>
                </div>
              </div>
              <div className={cx(["ptttct-op", "flex flex-col p-2"])}>
                <div
                  className={cx([
                    "ptttctop-item",
                    "flex flex-nowrap items-center gap-2",
                  ])}
                >
                  <input type="checkbox" id="ckXuatHD" />
                  <label htmlFor="ckXuatHD">Xuất hóa đơn tài chính</label>
                </div>
              </div>
              <div className="mt-[-0.5rem] p-2 pb-4 pl-6"></div>
            </div>
          </div>
          {/* dk-qdc */}
          <div
            className={cx([
              "dkqdc",
              "mt-4 bg-white rounded-bl-[5px] rounded-br-[5px]",
            ])}
          >
            {/* dkqdc__hd */}
            <div
              className={cx([
                "dkqdc__hd",
                "flex items-center pt-2 pb-2 border border-solid border-b-[#B21E02] bg-[#F9F9F9]",
              ])}
            >
              <FaFileContract className="text-[#6A1300] text-2xl ml-2 mr-2" />
              <span className="text-[1.2rem]">Điều khoản, quy định chung</span>
            </div>
            {/* dkqdc__ct */}
            <div
              className={cx([
                "dkqdc__ct",
                "p-2 pt-4 pb-4 bg-[#F9F9F9] flex flex-col gap-2 rounded-bl-md rounded-br-md",
              ])}
            >
              <p>
                Mọi thắc mắc trong quá trình đặt hàng trực tuyến vui lòng liên
                hệ đường dây nóng chăm sóc khách hàng:&nbsp;
                <span style={{ color: "rgb(0, 0, 255)" }}>
                  <strong>0967 266 277</strong>
                </span>
                .
              </p>
              <p>
                Quý khách vui lòng giữ liên lạc qua điện thoại di động sau khi
                đặt hàng để nhân viên phụ trách liên hệ xử lý đơn hàng.
              </p>
              <p>
                Do tính chất sản phẩm công nghiệp và dữ liệu trực tuyến nên có
                thể có sai số về lưu kho tại thời điểm đặt hàng.
              </p>
            </div>
            {/* dkqdc__confirm */}
            <div className={cx(["dkqdc__confirm", "p-4 pt-6"])}>
              {/* confirm-fs */}
              <fieldset
                className={cx([
                  "confirm-fs",
                  "p-2 pl-4 pr-4 border border-solid border-[#1D8DD9]",
                ])}
              >
                {/* confirm-lg */}
                <legend className="confirm-lg text-[#00414F]">
                  Tùy chọn đơn hàng
                </legend>
                {/* confirm-ct */}
                <div
                  className={cx(["confirm-ct", "flex flex-col items-center"])}
                >
                  {/* ct */}
                  <div>
                    <span
                      className="required-field"
                      style={{ display: "none" }}
                    ></span>
                    {/* confirm-item */}
                    <div className={cx(["confirm-item", "flex flex-col mt-2"])}>
                      {/* confirm-option */}
                      <div
                        className={cx([
                          "confirm-option",
                          "flex flex-col flex-nowrap items-start gap-2",
                        ])}
                      >
                        {/* confirm-option-sub */}
                        <div
                          className={cx(["confirm-option-sub", "flex gap-3"])}
                        >
                          <input
                            type="radio"
                            id="confirm-agree"
                            value={"dathang"}
                            className="cursor-pointer"
                            checked={checkAgree}
                            onClick={() => {
                              setCheckAgree(true);
                              setCheckPrdPrice(false);
                              setTitleConfirmBtn("Xác nhận đặt hàng");
                            }}
                          />
                          <label
                            htmlFor="confirm-agree"
                            className="cursor-pointer"
                          >
                            Tôi đồng ý đặt mua các sản phẩm trong đơn hàng này
                            cùng các điều khoản như trên.
                          </label>
                        </div>
                        {/* confirm-option-sub */}
                        <div
                          className={cx(["confirm-option-sub", "flex gap-3"])}
                        >
                          <input
                            type="radio"
                            id="prd-price"
                            value={"baogia"}
                            className="cursor-pointer"
                            checked={checkPrdPrice}
                            onClick={() => {
                              setCheckAgree(false);
                              setCheckPrdPrice(true);
                              setTitleConfirmBtn("Gửi yêu cầu báo giá dự án");
                            }}
                          />
                          <label htmlFor="prd-price" className="cursor-pointer">
                            Tôi yêu cầu thegioidien.com báo giá dự án cho các
                            sản phẩm trong đơn hàng này.
                          </label>
                        </div>
                      </div>
                      {/* confirm-note */}
                      <div
                        className={cx([
                          "confirm-note",
                          "flex flex-nowrap items-center pl-3 text-[#585858] gap-2",
                        ])}
                      >
                        <FaLevelUpAlt
                          style={{ transform: "rotateY(180deg)" }}
                        />
                        <span className=" text-[14px]">
                          Chỉ yêu cầu báo giá dự án cho đơn hàng số lượng lớn
                          hoặc giá trị lớn
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* confirm-btn */}
                  <div
                    className={cx([
                      "confirm-btn",
                      "flex justify-center p-4 pl-8 pr-8",
                    ])}
                  >
                    <button
                      className={cx([
                        "confirm-btn",
                        "flex items-center p-2 pl-[0.7rem] pr-[0.7rem] gap-1 bg-[#1C8DD9] rounded-[3px]",
                      ])}
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      <HiChevronDoubleRight className="text-[#FFFF00] text-2xl" />
                      <span className="text-white text-[1.1rem]">
                        {titleConfirmBtn}
                      </span>
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
            {/* dkqdc__back-home */}
            <div className="dkqdc__back-home m-4 flex">
              <button
                className={cx([
                  "back-home-btn",
                  "flex items-center p-2 pl-[0.7rem] pr-[0.7rem] gap-1 bg-[#1C8DD9] rounded-[3px]",
                ])}
                onClick={() => {
                  navigate("/");
                }}
              >
                <HiChevronDoubleLeft className="text-[#FFFF00] text-xl" />
                <span className="text-white">Trở vè</span>
              </button>
            </div>
          </div>
          <div className="op"></div>
          <div className="ft"></div>
        </div>
      </div>
    </div>
  );
}
