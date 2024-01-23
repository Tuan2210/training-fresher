import styles from "../../../layouts/Header/Header.module.scss";
import classNames from "classnames/bind";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONENUMBER_REGEX,
} from "../../../constants/regexValidate";

import { loginUser } from "../../../services/authApiRequest";

import { MdOutlineLock, MdOutlineLockOpen } from "react-icons/md";

const cx = classNames.bind(styles);

const loginFormSchema = yup
  .object()
  .shape({
    ["email-phoneNumber"]: yup
      .string()
      .required()
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
      ),
    password: yup
      .string()
      .required()
      .test("is-pw", "Mật khẩu không hợp lệ!", function (value) {
        return yup
          .string()
          .matches(PASSWORD_REGEX, {
            message: "Mật khẩu không hợp lệ!",
            excludeEmptyString: true,
          })
          .isValidSync(value);
      }),
    // fieldValue: yup.string().oneOf(accounts, "Giá trị không hợp lệ"),
  })
  .required();

export default function LoginFormHd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  function onSubmit(acc) {
    let user = {};

    if (/@/.test(acc["email-phoneNumber"]))
      user = { email: acc["email-phoneNumber"] };
    else if (/\+84/.test(acc["email-phoneNumber"]))
      user = { phoneNumber: acc["email-phoneNumber"] };

    user.password = acc.password;
    loginUser(user, dispatch, navigate);
  }

  const [isHoveredBtn, setIsHoveredBtn] = useState(false);

  return (
    <>
      <form
        className={cx([
          "header-content__right",
          "col-span-3 w-full block p-2 rounded-sm bg-[#DBDBDB]",
        ])}
        onSubmit={handleSubmit((acc) => onSubmit(acc))}
      >
        <div className={cx(["rsrow", "w-full grid items-center"])}>
          <div className="rscoll">
            <i className="far fa-user fa-fw pl-1 pr-6 text-[#003B4F]" />
            <span className="text-[#8D1802]">Tài khoản</span>
          </div>
          <div className="rscolr flex">
            <input
              name="txtEmail"
              type="text"
              id="txtEmailLG"
              placeholder="Email hoặc điện thoại"
              className="w-full border border-solid border-[#4F4F4F] placeholder-gray-500"
              {...register("email-phoneNumber")}
            />
          </div>
        </div>
        <div className={cx(["rsrow", "w-full mt-2 grid items-center"])}>
          <div className="rscoll w-[115px] flex items-center">
            <img
              src="/assets/imgs/fa-key.png"
              alt="fa-key"
              width={30}
              height={30}
              className="pl-[0.1rem] pr-2"
            />
            <span className="text-[#8D1802]">Mật khẩu</span>
          </div>
          <div className="rscolr">
            <input
              name="txtPass"
              type="password"
              id="txtPassLG"
              className="w-full border border-solid border-[#4F4F4F] placeholder-gray-500"
              {...register("password")}
            />
          </div>
        </div>
        <div className={cx(["rsrow", "w-full mt-2 grid items-center"])}>
          <Link
            to=""
            id="lktoquenpass"
            className="text-[#4D4E47] hover:text-gray-500"
          >
            Quên mật khẩu?
          </Link>
          <button
            type="submit"
            className="w-fit flex justify-center items-center rounded pt-2 pb-2 pl-[0.7rem] pr-[0.7rem] gap-1 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
            onMouseEnter={() => setIsHoveredBtn(true)}
            onMouseLeave={() => setIsHoveredBtn(false)}
          >
            {isHoveredBtn ? (
              <MdOutlineLockOpen className="text-xl text-[#FFFF00] font-bold" />
            ) : (
              <MdOutlineLock className="text-xl text-[#FFFF00] font-bold" />
            )}
            <span className="text-white">Đăng Nhập</span>
          </button>
        </div>
      </form>
    </>
  );
}
