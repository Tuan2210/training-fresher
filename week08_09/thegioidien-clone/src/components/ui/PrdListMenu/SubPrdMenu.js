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

import { Link } from "react-router-dom";

export default function SubPrdMenu({ item, activeItem }) {
  function FirstSubMenu({ item, index }) {
    return (
      <>
        <Link to="#">{item.title}</Link>
      </>
    );
  }

  return (
    <>
      {item.firstSubMenu && (
        <CDropdownMenu
          className={`flex-col bg-[#646461] border border-solid border-[#CBCBCB] border-b-[#F1FAFE] ${
            activeItem === item ? "block" : "hidden"
          }`}
        >
          {item.firstSubMenu.map((subItem, index) => (
            <FirstSubMenu key={index} item={subItem} index={index} />
          ))}
        </CDropdownMenu>
      )}
    </>
  );
}
