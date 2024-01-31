import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from "styled-components";

import { FaPaperPlane } from "react-icons/fa";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { PASSWORD_REGEX } from "../../../constants/regexValidate";
import { confirmResetPassword } from "../../../services/authApiRequest";
import { useState } from "react";

const forgotPwSchema = yup.object().shape({
  ["NewPassword"]: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới!")
    .test("is-newPw", "Mật khẩu mới không hợp lệ!", (value) => {
      return yup
        .string()
        .matches(PASSWORD_REGEX, {
          message: "Mật khẩu mới không hợp lệ!",
          excludeEmptyString: true,
        })
        .isValidSync(value);
    }),
  ["ConfirmNewPassword"]: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu mới!")
    .test("is-newPw", "Xác nhận mật khẩu mới không hợp lệ!", (value) => {
      return yup
        .string()
        .matches(PASSWORD_REGEX, {
          message: "Xác nhận mật khẩu mới không hợp lệ!",
          excludeEmptyString: true,
        })
        .isValidSync(value);
    })
    .oneOf([yup.ref("NewPassword"), null], "Mật khẩu xác nhận không đúng!"),
  ["Token"]: yup.string().required("Vui lòng nhập mã xác nhận!"),
});

export default function ConfirmResetPwForm() {
  const dispatch = useDispatch(),
    navigate = useNavigate();

  const [confirmResetPwMsg, setConfirmResetPwMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPwSchema) });

  function onSubmitConfirmResetPw(data) {
    // console.log(data);
    const resetPwData = {
      token: data.Token.trim(),
      newPassword: data.ConfirmNewPassword.trim(),
    };
    // console.log(resetPwData);
    confirmResetPassword(resetPwData, dispatch, navigate, setConfirmResetPwMsg);
  }

  return (
    <form
      className="confirm-reset-pw-form"
      onSubmit={handleSubmit((data) => onSubmitConfirmResetPw(data))}
    >
      {/* new-pw */}
      <StyledFormRow className="flex flex-col mt-2">
        <span className="lbl w-full text-[#3B3B3B]">Mật khẩu mới</span>
        <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
          <div className="input-row__wrp w-full flex">
            <input
              type="password"
              className="w-full p-2 text-[16px] border border-solid border-[#767676]"
              {...register("NewPassword")}
            />
            <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
              *
            </span>
          </div>
          {errors.NewPassword && (
            <span className="text-[#CC0000] w-full mt-1">
              {errors.NewPassword.message}
            </span>
          )}
        </div>
      </StyledFormRow>

      {/* confirm-new-pw */}
      <StyledFormRow className="flex flex-col mt-2">
        <span className="lbl w-full text-[#3B3B3B]">Xác nhận mật khẩu mới</span>
        <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
          <div className="input-row__wrp w-full flex">
            <input
              type="password"
              className="w-full p-2 text-[16px] border border-solid border-[#767676]"
              {...register("ConfirmNewPassword")}
            />
            <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
              *
            </span>
          </div>
          {errors.ConfirmNewPassword && (
            <span className="text-[#CC0000] w-full mt-1">
              {errors.ConfirmNewPassword.message}
            </span>
          )}
        </div>
      </StyledFormRow>

      {/* token */}
      <StyledFormRow className="flex flex-col mt-2">
        <span className="lbl w-full text-[#3B3B3B]">Mã xác nhận</span>
        <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
          <div className="input-row__wrp w-full flex">
            <input
              type="text"
              className="w-full p-2 text-[16px] border border-solid border-[#767676]"
              {...register("Token")}
            />
            <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
              *
            </span>
          </div>
          {errors.Token && (
            <span className="text-[#CC0000] w-full mt-1">
              {errors.Token.message}
            </span>
          )}
        </div>
      </StyledFormRow>

      {/* confirm-reset-pw-msg */}
      {confirmResetPwMsg && (
        <StyledFormRow className="flex flex-col mt-2">
          <div className="confirm-resetpw-row pt-2 pb-2 flex flex-nowrap justify-center">
            <span className="text-[#CC0000] w-full mt-1">
              {confirmResetPwMsg}
            </span>
          </div>
        </StyledFormRow>
      )}

      {/* update-pw-btn */}
      <StyledFormRow className="flex flex-col mt-2">
        <div className="confirm-resetpw-row pt-2 pb-2 flex flex-nowrap justify-center">
          <button
            type="submit"
            className="w-fit flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
          >
            <FaPaperPlane className="text-[#FFFF00]" />
            <p className="text-white">Đổi mật khẩu</p>
          </button>
        </div>
      </StyledFormRow>
    </form>
  );
}

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
    .confirm-resetpw-row,
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
    .confirm-resetpw-row,
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
    .confirm-resetpw-row,
    .resetpw-msg-row {
      padding-left: 350px;
    }
  }

  @media screen and (min-width: 1401px) {
    .lbl {
      width: 450px;
    }
    .confirm-resetpw-row,
    .resetpw-msg-row {
      padding-left: 450px;
    }
  }
`;
