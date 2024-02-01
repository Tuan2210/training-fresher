import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import axios from "axios";

import styled from "styled-components";

import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  FULLNAME_REGEX,
  PHONENUMBER_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  ADDRESS_REGEX,
} from "../../../constants/regexValidate";

import { PROVINCES_URL, GGCAPTCHA_SITE_KEY } from "../../../constants/apiUrl";

import ReCAPTCHA from "react-google-recaptcha";

import {
  handleFetchProvinces,
  handleFetchDistricts,
} from "../../../services/prov_distApiRequest";
import { registerUser } from "../../../services/authApiRequest";

const registerFormSchema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .required("Vui lòng nhập họ tên!")
      .test("is-fullname", "Họ tên không hợp lệ!", function (value) {
        return yup
          .string()
          .matches(FULLNAME_REGEX, {
            message: "Họ tên không hợp lệ!",
            excludeEmptyString: true,
          })
          .isValidSync(value);
      }),
    phoneNumber: yup
      .string()
      .required("Vui lòng nhập số điện thoại!")
      // .test("is-phone-number", "Số điện thoại không hợp lệ!", function (value) {
      //   return yup
      //     .string()
      //     .matches(/^0[0-9]{9}$/, {
      //       message: "Số điện thoại không hợp lệ!",
      //       excludeEmptyString: true,
      //     })
      //     .isValidSync(value);
      // })
      .test(
        "is-phone-number-vn",
        // "Số điện thoại không hợp lệ!",
        "Vui lòng nhập SĐT theo mẫu: +84xxxxxxxxx",
        function (value) {
          // const handlePhoneNumber = `+84${value.slice(1)}`;
          return yup
            .string()
            .matches(PHONENUMBER_REGEX, {
              message: "Vui lòng nhập SĐT theo mẫu: +84xxxxxxxxx",
              excludeEmptyString: true,
            })
            .isValidSync(value);
        }
      ),
    email: yup
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
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu!")
      // .test("is-length-pw", "4-20 ký tự!", function (value) {
      //   return value.length >= 4 && value.length <= 20;
      // })
      .test("is-pw", "Mật khẩu không hợp lệ!", function (value) {
        return yup
          .string()
          .matches(PASSWORD_REGEX, {
            message: "Mật khẩu không hợp lệ!",
            excludeEmptyString: true,
          })
          .isValidSync(value);
      }),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu!")
      .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không đúng!"),
    address: yup
      .string()
      .required("Vui lòng nhập địa chỉ!")
      .test("is-address", "Địa chỉ không hợp lệ!", function (value) {
        return yup
          .string()
          .matches(ADDRESS_REGEX, {
            message: "Địa chỉ không hợp lệ!",
            excludeEmptyString: true,
          })
          .isValidSync(value);
      }),
  })
  .required();

export default function RegisterBlock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////call api provinces-cities & districts
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [registerMsg, setRegisterMsg] = useState("");
  useEffect(() => {
    handleFetchProvinces(setProvinces);
  }, []);

  function onChangeProvince(value) {
    setSelectedProvince(false);
    if (value === "default") {
      // setSelectedProvince(false);
      handleFetchDistricts(null, provinces, setDistricts, setSelectedProvince);
    } else {
      setIsDisable(true);
      // setSelectedProvince(true);
      handleFetchDistricts(value, provinces, setDistricts, setSelectedProvince);
    }
  }
  ////

  const [isChecked, setIsChecked] = useState(true);
  const [isCheckedEmail, setIsCheckedEmail] = useState(true);

  const [capVal, setCapVal] = useState(null);
  const [isExpired, setIsExpired] = useState(true);
  function handleCheckAgreeChkBox() {
    if (!isChecked) return "Vui lòng đồng ý để tiếp tục!";
  }
  function handleCheckEmailChkBox() {}
  ////

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerFormSchema) });

  async function onSubmit(acc) {
    // e.preventDefault();
    const provObj = provinces.find(
      (item) => item.province_id === acc.placeProv
    );

    if (isExpired || !provObj) return;

    //check wrong or not district in province
    handleFetchDistricts(
      provObj.province_id,
      provinces,
      setDistricts,
      setSelectedProvince
    );
    const findDisId = districts.find(
      (item) => item.district_name === acc.placeDis
    );
    if (!findDisId) return;

    const newUser = {
      email: acc.email,
      password: acc.confirmPassword,
      phone: acc.phoneNumber,
      name: acc.fullName,
      address: acc.address + ", " + acc.placeDis + ", " + provObj.province_name,
    };
    registerUser(newUser, dispatch, navigate, setRegisterMsg);
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
          <span className="">Đăng ký</span>
        </div>
      </div>
      <div className="register-wrp border border-solid border-[#B21E02]">
        <div className="register-wrp__hd text-[1.2rem] p-2">
          <i className="fa-solid fa-user-plus mr-2 text-[#FFFF00]" />
          <span>Đăng ký thành viên</span>
        </div>
        <div className="register-wrp__ct p-4">
          <div className="form-note flex items-center flex-wrap justify-end">
            <span className="text-[#FF6600] mr-2 text-xl">*</span>
            <span className="text-[#8D8D8D]">là thông tin bắt buộc</span>
          </div>
          <form
            className="register-form"
            onSubmit={handleSubmit((acc) => onSubmit(acc))}
          >
            {/* Họ tên */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Họ tên</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <input
                    type="text"
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    {...register("fullName")}
                  />
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {errors.fullName && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.fullName.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Điện thoại */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Điện thoại</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <input
                    type="text"
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    {...register("phoneNumber")}
                  />
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {errors.phoneNumber && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Email */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Email</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <input
                    type="email"
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    {...register("email")}
                  />
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {errors.email && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Mật khẩu */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Mật khẩu</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <input
                    type="password"
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    {...register("password")}
                  />
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {errors.password && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Xác nhận mật khẩu */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">
                Xác nhận mật khẩu
              </span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <input
                    type="password"
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    {...register("confirmPassword")}
                  />
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {errors.confirmPassword && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Địa chỉ */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Địa chỉ</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <input
                    type="text"
                    className="w-full p-2 text-[16px] border border-solid border-[#767676] placeholder:text-[#757575]"
                    placeholder="Số nhà, tên đường, phường/xã"
                    {...register("address")}
                  />
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {errors.address && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Tỉnh/Thành */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Tỉnh/Thành</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <select
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    defaultValue="default"
                    {...register("placeProv", {
                      required: "Vui lòng chọn tỉnh thành!",
                    })}
                    onChange={(e) => {
                      onChangeProvince(e.target.value);
                    }}
                  >
                    <option
                      className="option-default"
                      value=""
                      disabled={isDisable}
                    >
                      -- Chọn tỉnh thành
                    </option>
                    {/* {provinces.map((province) => (
                      <option key={province.code} value={province.name}>
                        {province.name}
                      </option>
                    ))} */}
                    {provinces.map((province) => (
                      <option
                        key={province.province_id}
                        value={province.province_id}
                      >
                        {province.province_name}
                      </option>
                    ))}
                  </select>
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {errors.placeProv && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.placeProv.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Quận/Huyện */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Quận/Huyện</span>
              <div className="input-row flex flex-col flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <div className="input-row__wrp w-full flex">
                  <select
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    {...register("placeDis", {
                      required: "Vui lòng chọn quận huyện!",
                    })}
                  >
                    <option
                      className="option-default"
                      value=""
                      disabled={selectedProvince}
                    >
                      -- Chọn quận/huyện
                    </option>
                    {selectedProvince &&
                      districts.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_name}
                        >
                          {district.district_name}
                        </option>
                      ))}
                  </select>
                  <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
                    *
                  </span>
                </div>
                {selectedProvince && errors.placeDis && (
                  <span className="text-[#CC0000] w-full mt-1">
                    {errors.placeDis.message}
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
                {/* {!isExpired && !capVal && (
                  <span className="text-[#CC0000] mt-1 ml-1">
                    Vui lòng nhấn reCAPTCHA!
                  </span>
                )} */}
              </div>
            </StyledFormRow>

            {/* Đồng ý điều khoản */}
            <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full"></span>
              <div className="mt-[0.3rem] mb-[0.3rem]">
                <label className="flex flex-nowrap items-center pb-[0.3rem]">
                  <input
                    type="checkbox"
                    value="Đồng ý"
                    checked={isChecked}
                    {...register("agreeChkBox", {
                      validate: handleCheckAgreeChkBox,
                    })}
                    onChange={() => {
                      setIsChecked(!isChecked);
                    }}
                  />
                  <span className="ml-2">
                    Tôi đồng ý với các điều khoản và quy định sử dụng tại
                    thegioidien.com
                  </span>
                </label>
                {errors.agreeChkBox && (
                  <span className="text-[#CC0000]">
                    {errors.agreeChkBox.message}
                  </span>
                )}
              </div>
            </StyledFormRow>

            {/* Nhận info qua email */}
            <StyledFormRow className="flex flex-col">
              <span className="lbl w-full"></span>
              <div className="flex flex-nowrap items-center mt-[0.3rem] mb-[0.3rem]">
                <label>
                  <input
                    type="checkbox"
                    value="Đồng ý"
                    checked={isCheckedEmail}
                    {...register("emailChkBox", {
                      validate: handleCheckEmailChkBox,
                    })}
                    onChange={() => {
                      setIsCheckedEmail(!isCheckedEmail);
                    }}
                  />
                  <span className="ml-2">
                    Nhận thông tin khuyến mãi qua email
                  </span>
                </label>
              </div>
            </StyledFormRow>

            {registerMsg && (
              <StyledFormRow className="flex flex-col">
                <span className="lbl w-full"></span>
                <div className="flex flex-nowrap items-center mt-4 mb-[0.3rem]">
                  <span className="text-[#FF6600]">{registerMsg}</span>
                </div>
              </StyledFormRow>
            )}

            {/* Nút đăng ký */}
            <StyledFormRow className="flex flex-col mt-2">
              <div className="reg-btn-row pt-2 pb-2 flex flex-nowrap justify-center">
                <button
                  type="submit"
                  className="w-fit flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
                >
                  <i className="fa-solid fa-user-plus text-[#FFFF00]" />
                  <p className="text-white">Đăng ký</p>
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
