import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import styled from "styled-components";

import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { PiSignIn } from "react-icons/pi";

import { LuKeyRound } from "react-icons/lu";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import accounts from "../../../data/accounts.json";

export default function ForgotPwBlock() {
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
          <span className="">Quên mật khẩu</span>
        </div>
      </div>
      <div className="register-wrp border border-solid border-[#B21E02]">
        <div className="register-wrp__hd text-[1.2rem] p-2">
          <LuKeyRound className="text-[#FFFF00] text-xl" />
          <span>Cấp lại mật khẩu</span>
        </div>
        <div className="register-wrp__ct p-4">
          <div className="form-note flex items-center flex-wrap justify-end">
            <span className="text-[#FF6600] mr-2 text-xl">*</span>
            <span className="text-[#8D8D8D]">là thông tin bắt buộc</span>
          </div>
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

const StyledFormRow = styled.div`
  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    .lbl {
      width: 160px;
      display: flex;
      justify-content: flex-end;
      padding-right: 0.5rem;
    }
    .input-row {
      flex-direction: row !important;
      input[type="text"],
      input[type="password"],
      input[type="email"],
      select {
        width: 350px;
      }
    }
    .reg-btn-row {
      justify-content: flex-start;
      padding-left: 160px;
    }
  }

  @media screen and (min-width: 992px) {
    .lbl {
      width: 250px;
    }
    input[type="text"],
    input[type="password"],
    input[type="email"],
    select {
      width: 400px;
    }
    .reg-btn-row {
      padding-left: 250px;
    }
  }

  @media screen and (min-width: 1200px) {
    .lbl {
      width: 350px;
    }
    input[type="text"],
    input[type="password"],
    input[type="email"],
    select {
      width: 500px;
    }
    .reg-btn-row {
      padding-left: 350px;
    }
  }

  @media screen and (min-width: 1401px) {
    .lbl {
      width: 450px;
    }
    .reg-btn-row {
      padding-left: 450px;
    }
  }
`;
