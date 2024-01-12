import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

import { CDropdown, CDropdownToggle, CDropdownMenu } from "@coreui/react";

import { Link } from "react-router-dom";

export default function ItemChild({ item }) {
  console.log("itemchild-page", item);
  return (
    <CDropdownMenu className="bg-yellow-300">
      <Link
        to="#"
        className="pl-[0.7rem] pr-[0.7rem] text-[1.1rem] hover:bg-[#1C8DD9]"
      >
        {item.title}
      </Link>
    </CDropdownMenu>
  );
}
