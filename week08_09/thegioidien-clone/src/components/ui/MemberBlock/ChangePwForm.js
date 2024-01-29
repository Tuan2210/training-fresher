import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaSync, FaTimes } from "react-icons/fa";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { PASSWORD_REGEX } from "../../../constants/regexValidate";
import { changePw } from "../../../services/userApiRequest";
import { useState } from "react";

const updateFormSchema = yup
  .object()
  .shape({
    oldPw: yup
      .string()
      .required("Vui lòng nhập mật khẩu cũ!")
      .test("is-oldPw", "Mật khẩu cũ không hợp lệ!", function (value) {
        return yup
          .string()
          .matches(PASSWORD_REGEX, {
            message: "Mật khẩu cũ không hợp lệ!",
            excludeEmptyString: true,
          })
          .isValidSync(value);
      }),
    newPw: yup
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
    // .oneOf([yup.ref("oldPw"), null], "Mật khẩu mới trùng mật khẩu cũ!"),
    confirmNewPw: yup
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
      .oneOf([yup.ref("newPw"), null], "Mật khẩu xác nhận không đúng!"),
  })
  .required();

export default function ChangePwForm({ setIsChangePwForm }) {
  const currentUserInfo = localStorage.getItem("currentUSer")
    ? JSON.parse(localStorage.getItem("currentUSer"))
    : null;

  const dispatch = useDispatch(),
    navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateFormSchema) });

  const [msgChangePw, setMsgChangePw] = useState("");

  function onSubmitUpdatePw(data) {
    const dataObj = {
      oldPassword: data.oldPw,
      newPassword: data.confirmNewPw,
    };
    changePw(
      dataObj,
      currentUserInfo?.accessToken,
      dispatch,
      navigate,
      setMsgChangePw
    );
  }

  return (
    <form
      className="pt-1 pb-1 flex flex-col gap-2"
      onSubmit={handleSubmit((data) => onSubmitUpdatePw(data))}
    >
      {/* old-pw-wrp */}
      <div className="flex flex-col gap-1">
        <span>Mật khẩu cũ</span>
        <div className="flex gap-2">
          <input
            type="password"
            className="old-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            {...register("oldPw")}
          />
          <span className="text-[#FF6600]">*</span>
        </div>
        {errors.oldPw && (
          <span className="text-[#CC0000]">{errors.oldPw.message}</span>
        )}
      </div>
      {/* new-pw-wrp */}
      <div className="flex flex-col gap-1">
        <span>Mật khẩu mới</span>
        <div className="flex gap-2">
          <input
            type="password"
            className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            {...register("newPw")}
          />
          <span className="text-[#FF6600]">*</span>
        </div>
        {errors.newPw && (
          <span className="text-[#CC0000]">{errors.newPw.message}</span>
        )}
      </div>
      {/* confirm-pw-wrp */}
      <div className="flex flex-col gap-1">
        <span>Xác nhận mật khẩu mới</span>
        <div className="flex gap-2">
          <input
            type="password"
            className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            {...register("confirmNewPw")}
          />
          <span className="text-[#FF6600]">*</span>
        </div>
        {errors.confirmNewPw && (
          <span className="text-[#CC0000]">{errors.confirmNewPw.message}</span>
        )}
      </div>
      {msgChangePw && (
        <span className="text-[#CC0000] mt-4">{msgChangePw}</span>
      )}
      <div className="btns-row flex items-center justify-center mt-4 mb-4 gap-4 text-sm">
        {/* update-pw-btn */}
        <button
          type="submit"
          className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
        >
          <FaSync className="text-[#FFFF00]" />
          <span className="text-white">Cập nhật</span>
        </button>
        {/* cancel-btn */}
        <button
          className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
          onClick={() => {
            setIsChangePwForm(false);
          }}
        >
          <FaTimes className="text-[#FFFF00] text-lg" />
          <span className="text-white">Hủy</span>
        </button>
      </div>
    </form>
  );
}
