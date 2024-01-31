import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { FaPaperPlane } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuKeyRound } from "react-icons/lu";
import { SlArrowRight } from "react-icons/sl";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { EMAIL_REGEX } from "../../../constants/regexValidate";

import ReCAPTCHA from "react-google-recaptcha";
import { GGCAPTCHA_SITE_KEY } from "../../../constants/apiUrl";

import { resetPassword } from "../../../services/authApiRequest";
import ConfirmResetPwForm from "./ConfirmResetPwForm";

const forgotPwSchema = yup.object().shape({
  ["Email"]: yup
    .string()
    .required("Vui lòng nhập email!")
    .test("is-email", "Email không hợp lệ!", function (value) {
      return yup
        .string()
        .matches(EMAIL_REGEX, {
          message: "Email không hợp lệ!",
          excludeEmptyString: true,
        })
        .isValidSync(value);
    }),
});

export default function ForgotPwBlock() {
  const dispatch = useDispatch();

  const [capVal, setCapVal] = useState(null);
  const [isExpired, setIsExpired] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPwSchema) });

  const [showResetPwForm, setShowResetPwForm] = useState(false);
  const [resetPwMsg, setResetPwMsg] = useState("");

  async function onSubmitResetPw(data) {
    // e.preventDefault();
    if (isExpired) return;

    resetPassword(data.Email, dispatch, setShowResetPwForm, setResetPwMsg);
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
          <span className="">Quên mật khẩu</span>
        </div>
      </div>
      <div className="register-wrp border border-solid border-[#B21E02]">
        <div className="register-wrp__hd flex items-center gap-2 text-[1.2rem] p-2">
          <LuKeyRound className="text-[#FFFF00] text-xl" />
          <span>Cấp lại mật khẩu</span>
        </div>
        <div className="register-wrp__ct p-4">
          <div className="form-note flex items-center flex-wrap justify-end">
            <span className="text-[#FF6600] mr-2 text-xl">*</span>
            <span className="text-[#8D8D8D]">là thông tin bắt buộc</span>
          </div>
          {showResetPwForm ? (
            <ConfirmResetPwForm />
          ) : (
            <form
              className="reset-pw-form"
              onSubmit={handleSubmit((data) => onSubmitResetPw(data))}
            >
              {/* Email */}
              <StyledFormRow className="flex flex-col mt-2">
                <span className="lbl w-full text-[#3B3B3B]">Email</span>
                <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                  <div className="input-row__wrp w-full flex">
                    <input
                      type="email"
                      className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                      {...register("Email")}
                    />
                    <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                      *
                    </span>
                  </div>
                  {errors.Email && (
                    <span className="text-[#CC0000] w-full mt-1">
                      {errors.Email.message}
                    </span>
                  )}
                </div>
              </StyledFormRow>
              {/* GG-ReCAPTCHA */}
              <StyledFormRow className="flex flex-col mt-2">
                <span className="lbl w-full text-[#3B3B3B]"></span>
                <div className="flex flex-wrap items-center mt-[0.3rem] mb-[0.3rem] gap-1">
                  <ReCAPTCHA
                    sitekey={GGCAPTCHA_SITE_KEY}
                    onExpired={() => {
                      setIsExpired(true);
                      setCapVal(null);
                    }}
                    onChange={(val) => {
                      setIsExpired(false);
                      setCapVal(val);
                    }}
                  />
                  {/* {isExpired && (
                  <span className="text-[#CC0000] mt-1 ml-1">
                    Vui lòng nhấn reCAPTCHA!
                  </span>
                )} */}
                </div>
              </StyledFormRow>
              {/* resetpw-msg-row */}
              {resetPwMsg && (
                <StyledFormRow className="flex flex-col mt-2">
                  <div className="resetpw-msg-row pt-2 pb-2 flex flex-nowrap justify-center">
                    <span className="text-[#CC0000] w-full mt-1">
                      {resetPwMsg}
                    </span>
                  </div>
                </StyledFormRow>
              )}
              {/* Nút cấp mk */}
              <StyledFormRow className="flex flex-col mt-2">
                <div className="resetpw-btn-row pt-2 pb-2 flex flex-nowrap justify-center">
                  <button
                    type="submit"
                    className="w-fit flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
                  >
                    <FaPaperPlane className="text-[#FFFF00]" />
                    <p className="text-white">Yêu cầu cấp lại mật khẩu</p>
                  </button>
                </div>
              </StyledFormRow>
            </form>
          )}
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
    .resetpw-btn-row,
    .resetpw-msg-row {
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
    .resetpw-btn-row,
    .resetpw-msg-row {
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
    .resetpw-btn-row,
    .resetpw-msg-row {
      padding-left: 350px;
    }
  }

  @media screen and (min-width: 1401px) {
    .lbl {
      width: 450px;
    }
    .resetpw-btn-row,
    .resetpw-msg-row {
      padding-left: 450px;
    }
  }
`;
