import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./CheckoutBlock.module.scss";

const cx = classNames.bind(styles);

import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuKeyRound } from "react-icons/lu";
import { PiSignIn } from "react-icons/pi";

export default function InputForms({ headers, inputs }) {
  const [selectedOption, setSelectedOption] = useState("opt1");
  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const contact = [{ title: "" }];

  return (
    <div className="flex flex-col gap-2">
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
            <form className="border border-t-0 border-solid border-[#D1D1D1] p-4">
              {/* login-form */}
              {hd.option === "opt1" && inputs[0] && (
                <>
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
                    <span className="mt-4">{inputs[0].labelPw}</span>
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
                  <Link
                    to="/quenmatkhau"
                    className="mt-4 flex items-center gap-2"
                  >
                    <LuKeyRound className="text-[#8D1802] text-xl" />
                    <span className="text-[#003B4F]">Quên mật khẩu?</span>
                  </Link>
                  {/* login-btn */}
                  <button
                    type="submit"
                    className="mt-6 mx-auto w-fit flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
                  >
                    <PiSignIn className="text-[#FFFF00] text-xl" />
                    <p className="text-white">Đăng nhập</p>
                  </button>
                </>
              )}

              {/* contact-form */}
              {hd.option === "opt2" && inputs[1] && (
                <>
                  <div className="flex items-center flex-wrap justify-end">
                    <span className="text-[#FF6600] mr-2 text-xl">*</span>
                    <span className="text-[#8D8D8D]">
                      là thông tin bắt buộc
                    </span>
                  </div>
                </>
              )}

              {/* register-form */}
              {hd.option === "opt3" && inputs[2] && (
                <>
                  <div className="flex items-center flex-wrap justify-end">
                    <span className="text-[#FF6600] mr-2 text-xl">*</span>
                    <span className="text-[#8D8D8D]">
                      là thông tin bắt buộc
                    </span>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
