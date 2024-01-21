import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

import styled from "styled-components";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function CheckoutBlock() {
  return (
    <StyledDiv className="w-full flex flex-col mt-4 gap-4">
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
          <span className="">Dự toán đơn hàng</span>
        </div>
      </div>
      <div className="checkout-wrp border border-solid border-[#B21E02]">
        <div className="checkout-wrp__hd text-[1.2rem] flex items-center justify-between">
          <div className="nav-left flex items-center ml-2">
            <FaFileInvoiceDollar className="mr-2 text-[#FFFF00]" />
            <span>Chi tiết đơn hàng, dự án</span>
          </div>
          <button className="flex guide-btn bg-[#DBDBDB] items-center p-2 hover:bg-[#EAEAEA]">
            <FaTrashAlt className="mr-2 text-[#8D1802]" />
            <span className="text-[#002F3F] text-base">Xóa đơn hàng</span>
          </button>
        </div>
        <div className="checkout-wrp__ct p-4">
          <span className="w-full text-[1.2rem] text-[#430B01]">
            Chọn sản phẩm nhanh
          </span>
        </div>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .checkout-wrp {
    &__hd {
      background-color: #b21e02;
      background-image: linear-gradient(
        to bottom,
        #b21e02,
        #b21e02,
        #b93016,
        #b21e02,
        #b21e02
      );
      color: #fff;
    }
  }
`;
