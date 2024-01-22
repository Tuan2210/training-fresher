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

import {
  EMAIL_REGEX,
  PHONENUMBER_REGEX,
} from "../../../constants/regexValidate";

import accounts from "../../../data/accounts.json";

const loginFormSchema = yup
  .object()
  .shape({
    ["Tài khoản"]: yup
      .string()
      .required("Vui lòng nhập email hoặc số điện thoại!")
      .test(
        "is-email-or-phone",
        "Email hoặc số điện thoại không hợp lệ",
        (value) => {
          if (value.includes("@")) {
            return yup
              .string()
              .matches(EMAIL_REGEX, {
                message: "Email không hợp lệ!",
                excludeEmptyString: true,
              })
              .isValidSync(value);
          } else {
            return yup
              .string()
              .matches(PHONENUMBER_REGEX, {
                message: "Số điện thoại không hợp lệ!",
                excludeEmptyString: true,
              })
              .isValidSync(value);
          }
        }
      )
      .test(
        "is-exist-email",
        "Sai email, vui lòng nhập lại!",
        function (value) {
          return value === accounts[0]?.email;
        }
      ),
    // .test(
    //   "is-exist-phoneNumber",
    //   "Sai số điện thoại, vui lòng nhập lai!",
    //   function (value) {
    //     return value === accounts[0]?.phoneNumber;
    //   }
    // ),
    ["Mật khẩu"]: yup
      .string()
      .required("Vui lòng nhập mật khẩu!")
      .test("is-pw-length", "4-20 ký tự!", function (value) {
        if (!value) return true;
        return value.length >= 4 && value.length <= 20;
      })
      .test(
        "is-exist-confirmPW",
        "Sai mật khẩu, vui lòng nhập lai!",
        function (value) {
          return value === accounts[0]?.confirmPassword;
        }
      ),
    // fieldValue: yup.string().oneOf(accounts, "Giá trị không hợp lệ"),
  })
  .required();

export default function LoginBlock() {
  ////validate inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormSchema) });

  //   function handleValidateEmailPhoneNumber(value) {
  //     if (value.includes("@")) {
  //       if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value))
  //         return "Email không hợp lệ!";
  //     } else {
  //       if (!/^0[0-9]{9}$/.test(value)) return "Số điện thoại không hợp lệ!";
  //     }
  //   }
  ////

  function onSubmit(acc) {
    console.log("Đăng nhập thành công!", acc);
  }

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
          <span className="">Tài khoản</span>
        </div>
      </div>
      <div className="login-wrp border border-solid border-[#B21E02]">
        <div className="login-wrp__hd flex justify-between">
          <div className="flex gap-2 items-center text-[1.2rem] p-2">
            <i className="far fa-user text-[#FFFF00]" />
            <span>Đăng nhập</span>
          </div>
          <Link to="/dangky" className="flex bg-[#DBDBDB] items-center p-2">
            <i className="fa-solid fa-user-plus mr-2 text-[#8D1802]" />
            <span className="text-[#002F3F]">Đăng ký thành viên</span>
          </Link>
        </div>
        <div className="login-wrp__ct p-4">
          <form
            className="login-form"
            onSubmit={handleSubmit((acc) => onSubmit(acc))}
          >
            {/* Tài khoản */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Tài khoản</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Email hoặc số điện thoại"
                      className="w-full p-2 text-[16px] border border-solid border-[#767676] placeholder:text-[#7C7C7C]"
                      {...register("Tài khoản")}
                    />
                    <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-1">
                      *
                    </span>
                  </div>
                  {errors["Tài khoản"] && (
                    <span className="text-[#CC0000] mt-2">
                      {errors["Tài khoản"]?.message}
                    </span>
                  )}
                </div>
              </div>
            </StyledFormRow>

            {/* Mật khẩu */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Mật khẩu</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <div className="flex">
                    <input
                      type="password"
                      className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                      {...register("Mật khẩu")}
                    />
                    <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                      *
                    </span>
                  </div>
                  {errors["Mật khẩu"] && (
                    <span className="text-[#CC0000] mt-2">
                      {errors["Mật khẩu"]?.message}
                    </span>
                  )}
                </div>
              </div>
            </StyledFormRow>

            {/* Quện mật khẩu */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]"></span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <Link to="/quenmatkhau" className="flex items-center gap-2">
                    <LuKeyRound className="text-[#8D1802] text-xl" />
                    <span className="text-[#003B4F]">Quên mật khẩu?</span>
                  </Link>
                </div>
              </div>
            </StyledFormRow>

            {/* Nút đăng nhập*/}
            <StyledFormRow className="flex flex-col mt-2">
              <div className="log-btn-row pt-4 pb-4 flex flex-nowrap justify-center">
                <button
                  type="submit"
                  className="w-fit flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
                >
                  <PiSignIn className="text-[#FFFF00] text-xl" />
                  <p className="text-white">Đăng nhập</p>
                </button>
              </div>
            </StyledFormRow>
          </form>
        </div>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .login-wrp {
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
  @media screen and (max-width: 767px) {
    .input-row {
      &__wrp {
        flex-direction: column !important;
      }
      input[type="text"],
      input[type="password"],
      input[type="email"],
      select {
        width: 100%;
      }
    }
  }
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
        width: 280px;
      }
    }
    .log-btn-row {
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
    .log-btn-row {
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
    .log-btn-row {
      padding-left: 350px;
    }
  }

  @media screen and (min-width: 1401px) {
    .lbl {
      width: 450px;
    }
    .log-btn-row {
      padding-left: 450px;
    }
  }
`;
