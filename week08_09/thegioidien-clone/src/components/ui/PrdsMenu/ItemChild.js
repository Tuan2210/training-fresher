import { useState } from "react";
import { CDropdownMenu } from "@coreui/react";
import { BsLightning } from "react-icons/bs";

import { Link } from "react-router-dom";

export default function ItemChild({
  isActive,
  isDisplayItem,
  childrenItem,
  subItem,
}) {
  console.log("isActive", isActive);
  console.log("isDisplayItem", isDisplayItem);
  function ItemChildMenu({ item }) {
    return (
      <Link
        to="#"
        className={`flex items-center gap-1 pt-[0.7rem] pb-[0.7rem] pl-4 pr-4 bg-[#ECECEC] text-[#002343] rounded-[3px] hover:bg-[#FFFFEF]`}
      >
        <BsLightning className="text-[#B21E02]" />
        <span>{item.title}</span>
      </Link>
    );
  }

  return (
    <div
      className={`${
        isActive === subItem.title ? "block" : "hidden"
      } w-full pt-[0.3rem] pl-8 pb-2 pr-4`}
      // className={`block w-full pt-[0.3rem] pl-8 pb-2 pr-4`}
      // style={{ display: isDisplayItem }}
    >
      <div className="flex flex-row flex-wrap gap-[2px]">
        {childrenItem.map((item, index) => (
          <ItemChildMenu key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
