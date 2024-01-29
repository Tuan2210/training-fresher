import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaSync, FaTimes } from "react-icons/fa";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  ADDRESS_REGEX,
  FULLNAME_REGEX,
  PHONENUMBER_REGEX,
} from "../../../constants/regexValidate";

const updateFormSchema = yup
  .object()
  .shape({
    fullNameCt: yup
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
    phoneNumberCt: yup
      .string()
      .required("Vui lòng nhập số điện thoại!")
      .test(
        "is-phone-number-vn",
        "Vui lòng nhập SĐT theo mẫu: +84xxxxxxxxx",
        function (value) {
          return yup
            .string()
            .matches(PHONENUMBER_REGEX, {
              message: "Vui lòng nhập SĐT theo mẫu: +84xxxxxxxxx",
              excludeEmptyString: true,
            })
            .isValidSync(value);
        }
      ),
    addressCt: yup
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

export default function UpdateContactForm({ setIsUpdateContactForm }) {
  const userInfo = useSelector((state) => state.user.currentUser?.info);

  const fullAddress = userInfo?.address?.split(", ") ?? [];
  const address = fullAddress[0] ?? "",
    district = fullAddress[1] ?? "",
    province = fullAddress[2] ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateFormSchema) });

  function onSubmitUpdateContact(data) {
    console.log(data);
  }

  return (
    <form
      className="pt-1 pb-1 flex flex-col gap-2"
      onSubmit={handleSubmit((data) => onSubmitUpdateContact(data))}
    >
      {/* fullname-wrp */}
      <div className="flex flex-col gap-1">
        <span>Họ tên</span>
        <div className="flex gap-2">
          <input
            type="text"
            className="old-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            defaultValue={userInfo?.name}
            {...register("fullNameCt")}
          />
          <span className="text-[#FF6600]">*</span>
        </div>
        {errors.fullNameCt && (
          <span className="text-[#CC0000]">{errors.fullNameCt.message}</span>
        )}
      </div>
      {/* phone-wrp */}
      <div className="flex flex-col gap-1">
        <span>Điện thoại</span>
        <div className="flex gap-2">
          <input
            type="text"
            className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            defaultValue={userInfo?.phone}
            {...register("phoneNumberCt")}
          />
          <span className="text-[#FF6600]">*</span>
        </div>
        {errors.phoneNumberCt && (
          <span className="text-[#CC0000]">{errors.phoneNumberCt.message}</span>
        )}
      </div>
      {/* address-wrp */}
      <div className="flex flex-col gap-1">
        <span>Địa chỉ</span>
        <div className="flex gap-2">
          <input
            type="text"
            className="new-pw w-full p-2 text-base h-8 border border-solid border-[#767676] rounded-sm"
            defaultValue={address}
            {...register("addressCt")}
          />
          <span className="text-[#FF6600]">*</span>
        </div>
        {errors.addressCt && (
          <span className="text-[#CC0000]">{errors.addressCt.message}</span>
        )}
      </div>
      {/* province */}
      <div className="flex flex-col gap-1">
        <span>Tỉnh thành</span>
        <select
          defaultValue={province}
          {...register("placeProv", {
            required: "Vui lòng chọn tỉnh thành!",
          })}
        >
          <option value={province}>{province}</option>
        </select>
        {errors.placeProv && (
          <span className="text-[#CC0000]">{errors.placeProv.message}</span>
        )}
      </div>
      {/* district */}
      <div className="flex flex-col gap-1">
        <span>Quận huyện</span>
        <select
          defaultValue={district}
          {...register("placeDis", {
            required: "Vui lòng chọn quận huyện!",
          })}
        >
          <option value={district}>{district}</option>
        </select>
        {errors.placeDis && (
          <span className="text-[#CC0000]">{errors.placeDis.message}</span>
        )}
      </div>
      <div className="btns-row flex items-center justify-center mt-4 mb-4 gap-4 text-sm">
        <button
          type="submit"
          className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
        >
          <FaSync className="text-[#FFFF00]" />
          <span className="text-white">Cập nhật</span>
        </button>
        <button
          className="changePwBtn flex items-center p-2 gap-2 bg-[#1C8DD9] rounded-[3px]"
          onClick={() => {
            setIsUpdateContactForm(false);
          }}
        >
          <FaTimes className="text-[#FFFF00] text-lg" />
          <span className="text-white">Hủy</span>
        </button>
      </div>
    </form>
  );
}
