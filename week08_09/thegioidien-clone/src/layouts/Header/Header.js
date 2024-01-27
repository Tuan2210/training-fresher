import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FaRegFilePdf, FaSignOutAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { MdMenu } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";

import { CDropdown, CDropdownMenu, CDropdownToggle } from "@coreui/react";

import ActiveUserHd from "../../components/ui/HeaderCtRightBlock/ActiveUserHd";
import LoginFormHd from "../../components/ui/HeaderCtRightBlock/LoginFormHd";
import MenuList from "../../components/ui/PrdsMenu/MenuList";
import { dataItems } from "../../components/ui/PrdsMenu/dataPrdsMenu";
import { refreshAccessToken } from "../../services/authApiRequest";

import { jwtDecode } from "jwt-decode";

const cx = classNames.bind(styles);

export default function Header() {
  // const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemLoggedIn = localStorage.getItem("isLoggedIn")
    ? localStorage.getItem("isLoggedIn")
    : null;
  const [isLoggedIn, setIsLoggedIn] = useState(itemLoggedIn);

  const currentUSerInfo = JSON.parse(localStorage.getItem("currentUSer"));

  const expireAccessToken = new Date(currentUSerInfo?.expireTime);
  const decodedRefreshToken = currentUSerInfo?.refreshToken
    ? jwtDecode(currentUSerInfo?.refreshToken)
    : null;

  function handleCheckATAndRT(
    currentUSerInfo,
    expireAccessToken,
    decodedRefreshToken
  ) {
    const currentDate = new Date();
    if (currentUSerInfo && isLoggedIn) {
      //access exp
      if (expireAccessToken - currentDate <= 0) {
        //refresh no exp
        if (decodedRefreshToken?.exp >= currentDate.getTime() / 1000) {
          refreshAccessToken(
            currentUSerInfo?.accessToken,
            currentUSerInfo?.refreshToken,
            dispatch
          );
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("currentUSer");
          navigate("/dangnhap");
        }
      }
    }
  }

  useEffect(() => {
    handleCheckATAndRT(currentUSerInfo, expireAccessToken, decodedRefreshToken);
  }, [itemLoggedIn, isLoggedIn, currentUSerInfo]);

  const [isDisplay, setIsDisplay] = useState("none");

  return (
    <div className="header w-full flex flex-col gap-4">
      {/* header-top */}
      <div
        className={cx([
          "header-top",
          "flex justify-between items-center bg-[#6A1300]",
        ])}
      >
        <div className={cx(["menu-header-top", "flex justify-center gap-0.5"])}>
          <Link
            to=""
            className={cx([
              "menu-header-item",
              "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
            ])}
          >
            <FaRegFilePdf className="text-[#DFCA00]" />
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
        <div className={cx(["register-header-top"])}>
          {isLoggedIn ? (
            <Link
              to="/"
              className={cx([
                "logoutBtn",
                "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
              ])}
            >
              <FaSignOutAlt className="text-[#FFFF00]" />
              {/* <i className="fa-solid fa-user-plus text-[#FFFF00]" /> */}
              <p className="text-white">Thoát</p>
            </Link>
          ) : (
            <>
              <Link
                to="/dangky"
                className={cx([
                  "registerBtn",
                  "flex justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
                ])}
              >
                <i className="fa-solid fa-user-plus text-[#FFFF00]" />
                <p className="text-white">Đăng ký</p>
              </Link>
              <Link
                to="/dangnhap"
                className={cx([
                  "registerBtn-574",
                  "hidden justify-center items-center p-2 pl-3 pr-3 gap-2 bg-[#B21E02]",
                ])}
              >
                <i className="fas fa-user-tie text-[#FFFF00]"></i>
                <p className="text-white">Tài khoản</p>
              </Link>
            </>
          )}
        </div>
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
            "col-span-6 flex flex-wrap-reverse items-center justify-around",
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
        {isLoggedIn ? <ActiveUserHd /> : <LoginFormHd />}
        {/* header-content__center_990 */}
        <div
          className={cx([
            "header-content__center-990",
            "col-span-12 hidden flex-wrap-reverse items-center justify-around",
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
      </div>
      {/* header-bottom */}
      <div
        className={cx([
          "header-bottom",
          "grid grid-cols-12 grid-flow-row gap-4",
        ])}
      >
        {/* prds list */}
        <CDropdown
          className={cx([
            "prdsMenuBtn",
            "col-span-3 bg-[#B21E02] hover:bg-[#9B1A01]",
          ])}
        >
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
              className="w-full focus:outline-none bg-[#FFFFE6] placeholder:text-[#757575]"
            />
            <IoSearchOutline className="text-3xl text-[#1D8DD9] pr-2" />
          </div>
        </div>

        {/* quantities prds */}
        <div
          className={cx([
            "sc-ct",
            "col-span-3 flex justify-center items-center bg-[#B21E02]",
          ])}
        >
          <Link
            to="#"
            className={cx([
              "lktodtdt",
              " text-white flex justify-center items-center gap-1 pt-[0.5rem] pb-[0.5rem] pl-[0.7rem] pr-[0.7rem]",
            ])}
          >
            <PiShoppingCartLight
              className={cx(["cart-icon", "text-3xl text-[#FFFF00]"])}
            />
            <LiaCartArrowDownSolid
              className={cx(["cart-arrow-icon", "text-3xl text-[#FFFF00]"])}
            />
            <span>0 Sản phẩm</span>
          </Link>
        </div>
      </div>
      {/* header-bottom-768 */}
      <div
        className={cx([
          "header-bottom-768",
          "hidden grid-cols-12 grid-flow-row gap-4",
        ])}
      >
        {/* quantities prds-574 */}
        <div
          className={cx([
            "sc-ct-574",
            "hidden col-span-6 justify-center items-center bg-[#B21E02]",
          ])}
        >
          <Link
            to="#"
            className={cx([
              "lktodtdt",
              " text-white flex justify-center items-center gap-1 pt-[0.5rem] pb-[0.5rem] pl-[0.7rem] pr-[0.7rem]",
            ])}
          >
            <PiShoppingCartLight
              className={cx(["cart-icon", "text-3xl text-[#FFFF00]"])}
            />
            <LiaCartArrowDownSolid
              className={cx(["cart-arrow-icon", "text-3xl text-[#FFFF00]"])}
            />
            <span>0 Sản phẩm</span>
          </Link>
        </div>

        {/* search-prd-574 */}
        <div
          className={cx([
            "srwrp-574",
            "hidden col-span-6 p-[4px] bg-[#B21E02]",
          ])}
        >
          <div className="pnSearch w-full flex justify-between items-center bg-[#FFFFE6]">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="w-full focus:outline-none bg-[#FFFFE6] placeholder:text-[#757575]"
            />
            <IoSearchOutline className="text-3xl text-[#1D8DD9] pr-2" />
          </div>
        </div>

        {/* prds list */}
        <CDropdown
          className={cx([
            "prdsMenuBtn",
            "col-span-6 bg-[#B21E02] hover:bg-[#9B1A01]",
          ])}
        >
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

        {/* quantities prds */}
        <div
          className={cx([
            "sc-ct",
            "col-span-6 flex justify-center items-center bg-[#B21E02]",
          ])}
        >
          <Link
            to="#"
            className={cx([
              "lktodtdt",
              " text-white flex justify-center items-center gap-1 pt-[0.5rem] pb-[0.5rem] pl-[0.7rem] pr-[0.7rem]",
            ])}
          >
            <PiShoppingCartLight
              className={cx(["cart-icon", "text-3xl text-[#FFFF00]"])}
            />
            <LiaCartArrowDownSolid
              className={cx(["cart-arrow-icon", "text-3xl text-[#FFFF00]"])}
            />
            <span>0 Sản phẩm</span>
          </Link>
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
      {/* <Toast /> */}
    </div>
  );
}
