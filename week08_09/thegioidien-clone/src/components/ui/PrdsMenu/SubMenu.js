import { useState } from "react";

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

import { CDropdown, CDropdownToggle, CDropdownMenu } from "@coreui/react";

import { Link } from "react-router-dom";

import ItemChild from "./ItemChild";

export default function SubMenu({ activeItem, item }) {
  const [isActive, setIsActive] = useState(null);
  const [isDisplayItem, setIsDisplayItem] = useState("none");

  function onClick() {
    setIsActive(item.subMenu === isActive ? null : item.subMenu);
    setIsDisplayItem(isDisplayItem === "none" ? "flex" : "none");
  }
  return (
    <CDropdownMenu
      className={`flex-col bg-[#646461] ${
        activeItem === item ? "block" : "hidden"
      }`}
      onClick={onClick}
    >
      {item.subMenu.map((subItem, index) => (
        <div
          key={index}
          className="border border-solid border-l-0 border-r-0 border-t-[#CBCBCB] border-b-[#F1FAFE] hover:cursor-pointer"
        >
          <div className="flex items-center justify-between p-[0.7rem] text-white">
            <div className="ml-4 flex items-center justify-between gap-3">
              <MdKeyboardArrowRight className="text-3xl" />
              <Link
                to="#"
                key={index}
                className="text-[1.1rem] hover:bg-[#1C8DD9]"
              >
                {subItem.title}
              </Link>
            </div>
            <FaPlus className="text-lg" />
          </div>

          {subItem.childrenItem && (
            <ItemChild
              key={index}
              isActive={isActive}
              isDisplayItem={isDisplayItem}
              childrenItem={subItem.childrenItem}
            />
          )}
        </div>
      ))}
    </CDropdownMenu>
  );
}
