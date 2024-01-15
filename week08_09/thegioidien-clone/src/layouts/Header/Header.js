import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

import { Link } from "react-router-dom";

import { MdOutlineLock, MdOutlineLockOpen } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { PiShoppingCartLight } from "react-icons/pi";
import { LiaCartArrowDownSolid } from "react-icons/lia";

// import PrdsMenu from "../../components/ui/PrdsMenu/PrdsMenu";

import { dataItems } from "../../components/ui/PrdsMenu/dataPrdsMenu";

import { MdMenu } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

import { CDropdown, CDropdownToggle, CDropdownMenu } from "@coreui/react";
import MenuList from "../../components/ui/PrdsMenu/MenuList";

const cx = classNames.bind(styles);

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDisplay, setIsDisplay] = useState("none");

  return (
    <div className="header flex flex-col gap-4">
      {/* header-top */}
      <div className="header-top flex justify-between items-center bg-[#6A1300]">
        <div className="menu-header-top flex justify-center gap-0.5">
          <Link
            to=""
            className={cx([
              "menu-header-item",
              "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
            ])}
          >
            <i className="far fa-file-pdf text-[#DFCA00]" />
            <p className="text-white">Tài liệu kỹ thuật</p>
          </Link>
          <Link
            to=""
            className={cx([
              "menu-header-item",
              "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
            ])}
          >
            <i className="far fa-question-circle text-[#DFCA00]" />
            <p className="text-white">Hướng dẫn</p>
          </Link>
          <Link
            to=""
            className={cx([
              "menu-header-item",
              "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
            ])}
          >
            <i className="far fa-dollar-sign text-[#DFCA00]" />
            <p className="text-white">Bảng giá sản phẩm</p>
          </Link>
          <Link
            to=""
            className={cx([
              "menu-header-item",
              "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
            ])}
          >
            <i className="far fa-address-book text-[#DFCA00]" />
            <p className="text-white">Liên hệ</p>
          </Link>
        </div>
        <Link
          to=""
          className={cx([
            "registerBtn",
            "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
          ])}
        >
          <i className="fa-solid fa-user-plus text-[#FFFF00]" />
          <p className="text-white">Đăng ký</p>
        </Link>
      </div>
      {/* header-content */}
      <div
        className={cx([
          "header-content",
          "grid grid-cols-12 grid-flow-row gap-4",
        ])}
      >
        <Link
          to="/"
          className={cx([
            "header-content__left",
            "col-span-3 h-40 flex items-center",
          ])}
        >
          <div className="p-2">
            <img
              src="https://thegioidien.com/images/logoEworldcom.jpg"
              alt="thegioidien-clone-img"
              className={cx(["logo", ""])}
            />
          </div>
        </Link>
        <div
          className={cx([
            "header-content__center",
            "col-span-6 flex justify-around",
          ])}
        >
          <div
            className={cx([
              "btctleft",
              "flex justify-center items-center gap-2",
            ])}
          >
            <div className="p-2 flex justify-around items-center">
              <img
                src="/assets/imgs/fa-phone-office.png"
                alt="phone-office"
                width={50}
                height={50}
              />
              <div className="btspsub flex flex-col pl-3">
                <span className="text-xl text-[#0D427A]">
                  028 3720 2968 - 0967 266 277
                </span>
                <span className="text-[#8D8D8D]">
                  Thứ 2-6: 8-17H; Thứ 7: 8-12H
                </span>
              </div>
            </div>
          </div>
          <div
            className={cx([
              "btctright",
              "flex justify-center items-center gap-2",
            ])}
          >
            <div className="p-2 flex justify-around items-center">
              <i
                className="fa-regular fa-envelope text-[#1D8DD9]"
                style={{ fontSize: "35px" }}
              />
              <div className="btspsub flex flex-col pl-5">
                <span className="text-xl text-[#0D427A]">
                  sales@thegioidien.com
                </span>
                <span className="text-[#8D8D8D]">
                  Trả lời 24h trong giờ hành chính
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cx([
            "header-content__right",
            "col-span-3 w-full block p-2 rounded-sm bg-[#DBDBDB]",
          ])}
        >
          <div className={cx(["rsrow", "w-full grid items-center"])}>
            <div className="rscoll w-[115px]">
              <i className="far fa-user fa-fw pl-1 pr-6 text-[#003B4F]" />
              <span className="text-[#8D1802]">Tài khoản</span>
            </div>
            <div className="rscolr">
              <input
                name="txtEmail"
                type="text"
                id="txtEmailLG"
                placeholder="Email hoặc điện thoại"
                className="w-[190px] border border-solid border-[#4F4F4F] placeholder-gray-500"
              />
            </div>
          </div>
          <div className={cx(["rsrow", "w-full mt-2 grid items-center"])}>
            <div className="rscoll w-[115px] flex items-center">
              <img
                src="/assets/imgs/fa-key.png"
                alt="fa-key"
                width={30}
                height={30}
                className="pl-[0.1rem] pr-2"
              />
              <span className="text-[#8D1802]">Mật khẩu</span>
            </div>
            <div className="rscolr">
              <input
                name="txtPass"
                type="password"
                id="txtPassLG"
                className="w-[190px] border border-solid border-[#4F4F4F] placeholder-gray-500"
              />
            </div>
          </div>
          <div className={cx(["rsrow", "w-full mt-2 grid items-center"])}>
            <Link
              to=""
              id="lktoquenpass"
              className="text-[#4D4E47] hover:text-gray-500"
            >
              Quên mật khẩu?
            </Link>
            <Link
              to=""
              className="flex justify-center items-center w-32 rounded pt-2 pb-2 pl-[0.7rem] pr-[0.7rem] gap-1 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? (
                <MdOutlineLockOpen className="text-xl text-[#FFFF00] font-bold" />
              ) : (
                <MdOutlineLock className="text-xl text-[#FFFF00] font-bold" />
              )}
              <span className="text-white">Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>
      {/* header-bottom */}
      <div
        className={cx([
          "header-bottom",
          "grid grid-cols-12 grid-flow-row gap-4",
        ])}
      >
        {/* prds list */}
        <CDropdown className="col-span-3 bg-[#B21E02] hover:bg-[#9B1A01]">
          <CDropdownToggle
            className="flex justify-between items-center w-full h-full p-[0.7rem] text-white text-[1.1rem]"
            onClick={() => setIsDisplay(isDisplay === "none" ? "flex" : "none")}
          >
            <MdMenu className="text-2xl" />
            <span>DANH MỤC SẢN PHẨM</span>
            {isDisplay.match("none") ? (
              <FaPlus className="text-lg" />
            ) : (
              <IoIosArrowUp className="text-2xl mr-[-0.2rem] text-[#FFC2D4]" />
            )}
          </CDropdownToggle>
        </CDropdown>

        {/* search-prd */}
        <div className={cx(["srwrp", "col-span-6 p-[4px] bg-[#B21E02]"])}>
          <div className="pnSearch w-full flex justify-between items-center bg-[#FFFFE6]">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="w-full focus:outline-none bg-[#FFFFE6]"
            />
            <IoSearchOutline className="text-3xl text-[#1D8DD9] pr-2" />
          </div>
        </div>

        {/* quantities prds */}
        <div className="col-span-3 flex justify-center items-center bg-[#B21E02]">
          <a
            id="lktodtdt"
            className="aspNetDisabled text-white flex justify-center items-center gap-1 pt-[0.5rem] pb-[0.5rem] pl-[0.7rem] pr-[0.7rem]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <LiaCartArrowDownSolid className="text-3xl text-[#FFFF00]" />
            ) : (
              <PiShoppingCartLight className="text-3xl text-[#FFFF00]" />
            )}
            <span>0 Sản phẩm</span>
          </a>
        </div>
      </div>
      <CDropdownMenu
        className="col-span-12 mt-[-1rem] flex-col rounded left-0 w-full z-10"
        style={{ display: isDisplay, marginBottom: "-40%" }}
      >
        {dataItems.map((item, index) => (
          <MenuList key={index} item={item} index={index} />
        ))}
      </CDropdownMenu>
    </div>
  );
}
