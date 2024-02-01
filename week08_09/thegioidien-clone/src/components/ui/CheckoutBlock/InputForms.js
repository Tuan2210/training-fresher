import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./CheckoutBlock.module.scss";

const cx = classNames.bind(styles);

import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuKeyRound } from "react-icons/lu";
import { PiSignIn } from "react-icons/pi";

import {
  handleFetchDistricts,
  handleFetchProvinces,
} from "../../../services/prov_distApiRequest";

import ReCAPTCHA from "react-google-recaptcha";
import { GGCAPTCHA_SITE_KEY } from "../../../constants/apiUrl";

export default function InputForms({ headers, inputs }) {
  const [selectedOption, setSelectedOption] = useState("opt1");
  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const contact = [{ title: "" }];

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
      handleFetchDistricts(null, provinces, setDistricts, setSelectedProvince);
    } else {
      setIsDisable(true);
      handleFetchDistricts(value, provinces, setDistricts, setSelectedProvince);
    }
  }
  ////

  const [capVal, setCapVal] = useState(null);
  const [isExpired, setIsExpired] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      {headers.map((hd, index) => (
        <div key={index}>
          <div
            className="hd-form flex justify-between items-center pl-2 pr-2 text-[1.1rem] bg-[#D1D1D1] cursor-pointer"
            onClick={() => setSelectedOption(hd.option)}
          >
            <div className="flex justify-between gap-2">
              <input
                name="input-rad"
                type="radio"
                value={hd.option}
                checked={selectedOption === hd.option}
                onChange={handleRadioChange}
                className="cursor-pointer"
              />
              <label
                htmlFor="input-rad"
                className="pt-[0.7rem] pb-[0.7rem] text-[#6A1300] cursor-pointer"
              >
                {hd.title}
              </label>
            </div>
            {selectedOption === hd.option ? (
              <IoIosArrowDown className="text-xl" />
            ) : (
              <MdKeyboardArrowRight className="text-2xl" />
            )}
          </div>
          {selectedOption === hd.option && (
            <>
              {/* login-form */}
              {hd.option === "opt1" && inputs[0] && (
                <form className="flex flex-col gap-4 p-4 border border-t-0 border-solid border-[#D1D1D1]">
                  {/* email-phone */}
                  <div className="input-wrapper flex flex-col gap-1">
                    <span>{inputs[0].labelAcc}</span>
                    <div className="flex gap-2">
                      <input
                        // {...input.register}
                        type={inputs[0].typeAcc}
                        placeholder={inputs[0].placeHolderAcc}
                        className="h-8 w-full border border-solid border-[#767676]"
                      />
                      <span className="text-[#FF6600]">*</span>
                    </div>
                  </div>
                  {/* pw */}
                  <div className="input-wrapper flex flex-col gap-1">
                    <span>{inputs[0].labelPw}</span>
                    <div className="flex gap-2">
                      <input
                        // {...input.register}
                        type={inputs[0].typePw}
                        className="h-8 w-full border border-solid border-[#767676]"
                      />
                      <span className="text-[#FF6600]">*</span>
                    </div>
                  </div>
                  {/* forgot-pw */}
                  <Link to="/quenmatkhau" className="flex items-center gap-2">
                    <LuKeyRound className="text-[#8D1802] text-xl" />
                    <span className="text-[#003B4F]">Quên mật khẩu?</span>
                  </Link>
                  {/* login-btn */}
                  <button
                    type="submit"
                    className="mt-2 mx-auto w-fit flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
                  >
                    <PiSignIn className="text-[#FFFF00] text-xl" />
                    <p className="text-white">Đăng nhập</p>
                  </button>
                </form>
              )}

              {/* contact-form */}
              {hd.option === "opt2" && inputs[1] && (
                <div className="flex flex-col p-4 gap-2 border border-t-0 border-solid border-[#D1D1D1]">
                  <div className="flex items-center flex-wrap justify-end">
                    <span className="text-[#FF6600] mr-2 text-xl">*</span>
                    <span className="text-[#8D8D8D]">
                      là thông tin bắt buộc
                    </span>
                  </div>
                  <form className="flex flex-col gap-4">
                    {/* fullname */}
                    <div className="flex gap-2">
                      <input
                        // {...input.register}
                        type="text"
                        placeholder={inputs[1].phName}
                        className="h-8 w-full border border-solid border-[#767676]"
                      />
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* phone */}
                    <div className="flex gap-2">
                      <input
                        // {...input.register}
                        type="text"
                        placeholder={inputs[1].phPhone}
                        className="h-8 w-full border border-solid border-[#767676]"
                      />
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* email */}
                    <div className="flex gap-2">
                      <input
                        // {...input.register}
                        type="text"
                        placeholder={inputs[1].phEmail}
                        className="h-8 w-full border border-solid border-[#767676]"
                      />
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* address */}
                    <div className="flex gap-2">
                      <input
                        // {...input.register}
                        type="text"
                        placeholder={inputs[1].phAddress}
                        className="h-8 w-full border border-solid border-[#767676]"
                      />
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* provinces */}
                    <div className="flex gap-2">
                      <select
                        className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                        defaultValue="default"
                        // {...register("placeProv", {
                        //   required: "Vui lòng chọn tỉnh thành!",
                        // })}
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
                          <option
                            key={province.province_id}
                            value={province.province_id}
                          >
                            {province.province_name}
                          </option>
                        ))}
                      </select>
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* districts */}
                    <div className="flex gap-2">
                      <select
                        className="w-full p-2 text-[16px] border border-solid border-[#767676]"
                        // {...register("placeDis", {
                        //   required: "Vui lòng chọn quận huyện!",
                        // })}
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
                      <span className="text-[#FF6600]">*</span>
                    </div>
                    {/* GG-ReCAPTCHA */}
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
                    </div>
                    {/* chkbox */}
                    <label className="flex flex-nowrap items-center pb-[0.3rem]">
                      <input type="checkbox" value="Đồng ý" defaultChecked />
                      <span className="ml-2">
                        Tôi đồng ý với các điều khoản và quy định sử dụng tại
                        thegioidien.com
                      </span>
                    </label>
                  </form>
                </div>
              )}
              {/* register-form */}
              {hd.option === "opt3" && inputs[2] && (
                <div className="border border-t-0 border-solid border-[#D1D1D1] p-4">
                  <div className="flex items-center flex-wrap justify-end">
                    <span className="text-[#FF6600] mr-2 text-xl">*</span>
                    <span className="text-[#8D8D8D]">
                      là thông tin bắt buộc
                    </span>
                  </div>
                  <form className=""></form>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
