import { useState } from "react";
import { dataItems } from "./dataPrdListMenu";

import { MdMenu } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from "@coreui/react";

export default function PrdListMenu() {
  const [isDisplay, setIsDisplay] = useState("none");
  function handleClickListItem() {
    setIsDisplay(isDisplay === "none" ? "flex" : "none");
  }

  // const [isDisplaySub, setIsDisplaySub] = useState("none");
  // function handleClickSubListItem() {
  //   setIsDisplaySub(isDisplaySub === "none" ? "flex" : "none");
  // }

  function FirstSubMenu({ item, index }) {
    return (
      <CDropdown
        component="div"
        className="w-full h-full text-white bg-[#48322A] hover:bg-[#B82F15] duration-[0.4s]"
      >
        <CDropdownToggle
          className={`w-full p-[0.7rem] flex items-center justify-between border border-solid border-[#48322A] hover:border-[#B82F15] ${
            index !== 0 ? "border-t-[#CBCBCB] hover:border-t-[#CBCBCB]" : ""
          }`}
          // onClick={handleClickSubListItem}
        >
          <div className="flex items-center">
            <i className="fas fa-caret-right fa-fw fa-lg mr-3" />
            <span className="pl-[0.7rem] pr-[0.7rem] text-[1.1rem] hover:bg-[#1C8DD9]">
              {item.title}
            </span>
          </div>
          <FaPlus className="text-lg" />
        </CDropdownToggle>
        {/* <CDropdownMenu
          className="absolute flex-col mt-[3.3rem] rounded bg-red-400"
          style={{ display: isDisplaySub }}
        >
          {item.subMenu.map((item, index) => (
            <FirstSubMenu key={index} item={item} index={index} />
          ))}
        </CDropdownMenu> */}
      </CDropdown>
    );
  }

  return (
    <>
      <CDropdown className="col-span-3 bg-[#B21E02] hover:bg-[#9B1A01] relative">
        <CDropdownToggle
          className="flex justify-between items-center w-full h-full p-[0.7rem] text-white text-[1.1rem]"
          onClick={handleClickListItem}
        >
          <MdMenu className="text-2xl" />
          <span>DANH MỤC SẢN PHẨM</span>
          {isDisplay.match("none") ? (
            <FaPlus className="text-lg" />
          ) : (
            <IoIosArrowUp className="text-2xl text-[#FFC2D4]" />
          )}
        </CDropdownToggle>
      </CDropdown>
      <CDropdownMenu
        className="absolute flex-col mt-[3.3rem] rounded left-0 w-full pl-9 pr-9"
        style={{ display: isDisplay }}
      >
        {dataItems.map((item, index) => (
          <FirstSubMenu key={index} item={item} index={index} />
        ))}
      </CDropdownMenu>
    </>
  );
}
