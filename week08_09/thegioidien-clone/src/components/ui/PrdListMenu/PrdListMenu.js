import { useState } from "react";
import { dataItems } from "./dataPrdListMenu";

import { MdMenu } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

export default function PrdListMenu() {
  function MenuItem({ item, level, toggleSubMenu }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
      toggleSubMenu(level);
    };

    return (
      <li className="relative">
        <button onClick={handleToggle} className="block p-2 focus:outline-none">
          {item.title}
        </button>
        {isOpen && item.subMenu && (
          <ul className="absolute left-0 top-full bg-white shadow-lg rounded p-2 mt-1">
            {item.subMenu.map((subItem, index) => (
              <MenuItem
                key={index}
                item={subItem}
                level={level + 1}
                toggleSubMenu={toggleSubMenu}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const [isDisplay, setIsDisplay] = useState("none");

  const [activeLevels, setActiveLevels] = useState([]);
  function toggleSubMenu(level) {
    const newActiveLevels = activeLevels.includes(level)
      ? activeLevels.filter((l) => l !== level)
      : [...activeLevels, level];

    setActiveLevels(newActiveLevels);
  }

  function handleClickListItem() {
    setIsDisplay(isDisplay === "none" ? "block" : "none");
  }

  return (
    <div className="col-span-3 p-[0.7rem] bg-[#B21E02] hover:bg-[#9B1A01] relative">
      <button
        className="flex justify-between items-center w-full text-white text-[1.1rem]"
        onClick={handleClickListItem}
      >
        <MdMenu className="text-2xl" />
        <span>DANH MỤC SẢN PHẨM</span>
        <FaPlus className="text-xl" />
      </button>
      <ul
        className="absolute left-0 top-full bg-white shadow-lg rounded p-2 mt-1"
        style={{ display: isDisplay }}
      >
        {dataItems.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            level={1}
            toggleSubMenu={toggleSubMenu}
          />
        ))}
      </ul>
    </div>
    // <>
    //   <button
    //     id="multiLevelDropdownButton"
    //     data-dropdown-toggle="multi-dropdown"
    //     className="col-span-3 bg-[#B21E02]"
    //     type="button"
    //   >
    //     Dropdown button{" "}
    //     <svg
    //       className="w-2.5 h-2.5 ms-3"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 10 6"
    //     >
    //       <path
    //         stroke="currentColor"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="m1 1 4 4 4-4"
    //       />
    //     </svg>
    //   </button>

    //   <div
    //     id="multi-dropdown"
    //     className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    //   >
    //     <ul
    //       className="py-2 text-sm text-gray-700 dark:text-gray-200"
    //       aria-labelledby="multiLevelDropdownButton"
    //     >
    //       <li>
    //         <a
    //           href="#"
    //           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //         >
    //           Dashboard
    //         </a>
    //       </li>
    //       <li>
    //         <button
    //           id="doubleDropdownButton"
    //           data-dropdown-toggle="doubleDropdown"
    //           data-dropdown-placement="right-start"
    //           type="button"
    //           className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //         >
    //           Dropdown
    //           <svg
    //             className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 6 10"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="m1 9 4-4-4-4"
    //             />
    //           </svg>
    //         </button>
    //         <div
    //           id="doubleDropdown"
    //           className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    //         >
    //           <ul
    //             className="py-2 text-sm text-gray-700 dark:text-gray-200"
    //             aria-labelledby="doubleDropdownButton"
    //           >
    //             <li>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 Overview
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 My downloads
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 Billing
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //               >
    //                 Rewards
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //         >
    //           Earnings
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           href="#"
    //           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //         >
    //           Sign out
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </>
  );
}
