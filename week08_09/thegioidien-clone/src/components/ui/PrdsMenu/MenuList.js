import { useState } from "react";

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

import { CDropdown, CDropdownToggle, CDropdownMenu } from "@coreui/react";

import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";

export default function MenuList({ item, index }) {
  const [activeItem, setActiveItem] = useState(null);
  const [isDisplaySub, setIsDisplaySub] = useState("none");

  function onClickSubMenu() {
    setActiveItem(item === activeItem ? null : item);
    setIsDisplaySub(isDisplaySub === "none" ? "flex" : "none");
  }

  return (
    <>
      {item.subMenu && (
        <>
          <CDropdown
            component="div"
            className={`w-full h-full text-white ${
              activeItem ? "bg-[#B82F15]" : "bg-[#48322A]"
            } hover:bg-[#B82F15] duration-[0.4s]`}
          >
            <CDropdownToggle
              className={`w-full p-[0.7rem] flex items-center justify-between ${
                index !== 0 ? "border-t-[#CBCBCB] hover:border-t-[#CBCBCB]" : ""
              }`}
              onClick={onClickSubMenu}
            >
              <div className="flex items-center">
                <i className="fas fa-caret-right fa-fw fa-lg mr-3" />
                <Link
                  to="#"
                  className="pl-[0.7rem] pr-[0.7rem] text-[1.1rem] hover:bg-[#1C8DD9]"
                >
                  {item.title}
                </Link>
              </div>
              {isDisplaySub.match("none") ? (
                <FaPlus className="text-lg" />
              ) : (
                <IoIosArrowUp className="text-2xl mr-[-0.2rem] text-[#FFC2D4]" />
              )}
            </CDropdownToggle>
          </CDropdown>
          <SubMenu activeItem={activeItem} item={item} />
        </>
      )}
    </>
  );
}
