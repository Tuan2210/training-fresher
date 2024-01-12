import { useState } from "react";
import { dataItems } from "./dataPrdsMenu";

import { MdMenu } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

import { CDropdown, CDropdownToggle, CDropdownMenu } from "@coreui/react";

import MenuList from "./MenuList";

export default function PrdsMenu() {
  const [isDisplay, setIsDisplay] = useState("none");

  return (
    <>
      <CDropdown className="col-span-3 bg-[#B21E02] hover:bg-[#9B1A01] relative">
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
      <CDropdownMenu
        className="absolute flex-col mt-[3.3rem] rounded left-0 w-full pl-9 pr-9"
        style={{ display: isDisplay }}
      >
        {dataItems.map((item, index) => (
          <MenuList key={index} item={item} index={index} />
        ))}
      </CDropdownMenu>
    </>
  );
}
