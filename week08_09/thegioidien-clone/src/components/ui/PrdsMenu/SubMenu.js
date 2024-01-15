import { useState } from "react";

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import { CDropdownMenu } from "@coreui/react";

import { Link } from "react-router-dom";

import ItemChild from "./ItemChild";

export default function SubMenu({ activeItem, item }) {
  const [isActive, setIsActive] = useState(null);

  function onClick(e, subItem) {
    setIsActive(e.target.innerText !== subItem.title ? null : subItem.title);
    if (isActive !== null) setIsActive(null);
  }
  return (
    <>
      {item.subMenu.map((subItem, index) => (
        <CDropdownMenu
          key={index}
          className={`flex-col bg-[#646461] ${
            activeItem === item ? "block" : "hidden"
          }`}
          onClick={(e) => onClick(e, subItem)}
        >
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
                isActive={isActive}
                childrenItem={subItem.childrenItem}
                subItem={subItem}
              />
            )}
          </div>
        </CDropdownMenu>
      ))}
    </>
  );
}
