import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from "styled-components";

import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";

export default function RegisterBlock() {
  const { register, handleSubmit, setValue } = useForm();

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
          <span className="">Đăng ký</span>
        </div>
      </div>
      <div className="register-wrp border border-solid border-[#B21E02]">
        <div className="register-wrp__hd text-[1.2rem] p-2">
          <i className="fa-solid fa-user-plus mr-2 text-[#FFFF00]" />
          <span>Đăng ký thành viên</span>
        </div>
        <div className="register-form">
          form
        </div>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .register-wrp {
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
