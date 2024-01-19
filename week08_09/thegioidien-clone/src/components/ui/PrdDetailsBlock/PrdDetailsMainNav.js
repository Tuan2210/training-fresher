import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";

import prdsData from "../../../data/prdsData.json";
import { dataItems } from "../PrdsMenu/dataPrdsMenu";

export default function PrdDetailsMainNav({ prdName }) {
  ///findTitleByPrdName
  function findTitleByPrdName(tensp) {
    const product = prdsData.find((p) =>
      p.infos.some((info) => info.prdName === tensp)
    );
    return product ? product.title : null;
  }
  const foundTitle = findTitleByPrdName(prdName);
  ////

  ////find title of childrenItem from title-parent
  //   function findChildrenTitleByParentTitle(parentTitle) {
  //     const parentItem = dataItems.title.find((item) => item.title === parentTitle);

  //   if (parentItem) {
  //     return parentItem.childrenItem.map((childItem) => childItem.title);
  //   }

  //   return null;
  //   }
  //   const foundChildrenTitle = findChildrenTitleByParentTitle(foundTitle);
  ///

  return (
    <div className="main-nav flex flex-wrap items-center font-medium">
      <Link
        to="/"
        className="flex items-center text-[1.2rem] gap-1 pt-2 pb-2 pl-2 mr-2"
      >
        <IoHomeOutline className="text-[#E24B01] text-[1.6rem]" />
        <span className=" text-[#3E0B00]">Trang chủ</span>
      </Link>
      <div className="flex items-center text-[1.2rem] pt-2 pb-2 gap-1">
        <SlArrowRight className="text-[#E24B01]" />
        <span className="">{foundTitle}</span>
      </div>
      {/* <div className="flex items-center text-[1.2rem] pt-2 pb-2 gap-1">
        <SlArrowRight className="text-[#E24B01]" />
        <span className="">{foundChildrenTitle}</span>
      </div> */}
    </div>
  );
}
