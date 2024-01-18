import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import styled from "styled-components";

import { IoHomeOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";

import { PROVINCES_URL, GGCAPTCHA_SITE_KEY } from "../../../constants/apiUrl";

import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterBlock() {
  const [randomFirstNumber, setRandomFirstNumber] = useState(0);
  const [randomSecondNumber, setRandomSecondNumber] = useState(0);
  useEffect(() => {
    setRandomFirstNumber(handleGenerateRandomNumber());
    setRandomSecondNumber(handleGenerateRandomNumber());
  }, []);

  function handleGenerateRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  ////call api provinces-cities & districts
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  useEffect(() => {
    async function handleFetchProvinces() {
      try {
        const res = await axios.get(`${PROVINCES_URL}?depth=2`);
        setProvinces(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }

    handleFetchProvinces();
  }, []);

  async function handleFetchDistricts(value) {
    const provObj = provinces.find((item) => item.name === value);
    if (provObj) setDistricts(provObj.districts);
  }

  function onChangeProvince(value) {
    if (value === "default") {
      setSelectedProvince(false);
      handleFetchDistricts(null);
    } else {
      setIsDisable(true);
      setSelectedProvince(true);
      handleFetchDistricts(value);
    }
  }
  ////

  const [isChecked, setIsChecked] = useState(true);
  const [isCheckedEmail, setIsCheckedEmail] = useState(true);

  ////validate inputs & chkboxs
  function handleValidateFullName(value) {
    if (!/^[a-zA-Z\s]+$/u.test(value))
      // u means Unicode for Vietnamese
      return "Họ tên không hợp lệ!";
  }
  function handleValidatePhoneNumber(value) {
    if (!/^0[0-9]{9}$/.test(value)) return "Số điện thoại không hợp lệ!";
  }
  function handleValidateEmail(value) {
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value))
      return "Email không hợp lệ!";
  }
  function handleValidatePassword(value) {
    if (value.length < 4 || value.length > 20) return "4-20 ký tự!";
  }
  function handleValidateConfirmPw(value) {
    if (value !== watch("password", "")) return "Xác nhận mật khẩu không đúng!";
  }
  function handleValidateAddress(value) {
    if (!/^[a-zA-Z0-9\s/\-]+$/.test(value)) return "Địa chỉ không hợp lệ!";
  }
  // function handleCheckSum(value) {
  //   if (randomFirstNumber + randomSecondNumber !== parseInt(value))
  //     return "Kết quả phép tính không đúng!";
  // }
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
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(acc) {
    // e.preventDefault();
    if (isExpired) return;
    console.log(acc);
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
                    {...register("fullName", {
                      required: "Vui lòng nhập họ tên!",
                      validate: handleValidateFullName,
                    })}
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
                    {...register("phoneNumber", {
                      required: "Vui lòng nhập số điện thoại!",
                      validate: handleValidatePhoneNumber,
                    })}
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
                    {...register("email", {
                      required: "Vui lòng nhập email!",
                      validate: handleValidateEmail,
                    })}
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
                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu!",
                      validate: handleValidatePassword,
                      // pattern: {
                      //   value:
                      //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      //   message: "Mật khẩu không hợp lệ",
                      // },
                    })}
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
                    {...register("confirmPassword", {
                      required: "Vui lòng xác nhận mật khẩu!",
                      validate: handleValidateConfirmPw,
                    })}
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
                    {...register("address", {
                      required: "Vui lòng nhập địa chỉ!",
                      validate: handleValidateAddress,
                    })}
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
                    {provinces.map((province) => (
                      <option key={province.code} value={province.name}>
                        {province.name}
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
                    name=""
                    id="district"
                    className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                    {...register("placeDis", {
                      required: "Vui lòng chọn quận huyện!",
                    })}
                  >
                    <option
                      className="option-default"
                      value=""
                      disabled={!selectedProvince}
                    >
                      -- Chọn quận/huyện
                    </option>
                    {selectedProvince &&
                      districts.map((district) => (
                        <option key={district.code} value={district.name}>
                          {district.name}
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

            {/* Làm phép tính */}
            {/* <StyledFormRow className="flex flex-col mt-2">
              <span className="lbl w-full text-[#3B3B3B]">Làm phép tính</span>
              <div className="flex flex-wrap items-center mt-[0.3rem] mb-[0.3rem] gap-1">
                <div className="addition flex gap-1">
                  <span className="text-[1.5rem] text-[#0000FF] first-number">
                    {randomFirstNumber}
                  </span>
                  <span className="text-[1.5rem] text-[#0000FF]">+</span>
                  <span className="text-[1.5rem] text-[#0000FF] second-number">
                    {randomSecondNumber}
                  </span>
                  <span className="text-[1.5rem] text-[#0000FF]">=</span>
                </div>
                <input
                  type="number"
                  className="w-[60px] p-2 text-[16px] border border-solid border-[#767676]"
                  {...register("sum", {
                    required: "Vui lòng làm phép tính",
                    validate: handleCheckSum,
                  })}
                />
                <span className="err-alert text-[#FF6600] ml-1 mr-2 text-lg">
                  *
                </span>
                {errors.sum && (
                  <span className="text-[#CC0000] mt-1">
                    {errors.sum.message}
                  </span>
                )}
              </div>
            </StyledFormRow> */}

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
                {!isExpired && !capVal && (
                  <span className="text-[#CC0000] mt-1 ml-1">
                    Vui lòng nhấn reCAPTCHA!
                  </span>
                )}
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
