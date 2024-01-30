import { useEffect, useState } from "react";
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

import {
  handleFetchDistricts,
  handleFetchProvinces,
} from "../../../services/prov_distApiRequest";
import { updateContactInfo } from "../../../services/userApiRequest";
import axios from "axios";
import { PROVINCES_URL } from "../../../constants/apiUrl";

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

  const currentUserInfo = localStorage.getItem("currentUSer")
    ? JSON.parse(localStorage.getItem("currentUSer"))
    : null;

  const dispatch = useDispatch(),
    navigate = useNavigate();

  const fullAddress = userInfo?.address?.split(", ") ?? [];
  const address = fullAddress[0].trim() ?? "";
  const [disDefault, setDisDefault] = useState(fullAddress[1].trim() ?? "");
  const [provDefault, setProvDefault] = useState(fullAddress[2].trim() ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateFormSchema) });

  ////call api provinces-cities & districts
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(false);
  const [updateContactMsg, setUpdateContactMsg] = useState("");

  function onChangeProvince(value) {
    setSelectedProvince(false);
    if (value !== disDefault) setProvDefault(value);

    const provObj = provinces.find((item) => item.province_name === value);
    if (provObj)
      handleFetchDistricts(
        provObj.province_id,
        provinces,
        setDistricts,
        setSelectedProvince
      );
  }

  function onChangeDistrict(value) {
    setDisDefault(value);
  }
  ////

  function onSubmitUpdateContact(data) {
    const contactInfo = {
      phone: data.phoneNumberCt,
      name: data.fullNameCt,
      address: data.addressCt + ", " + data.placeProv + ", " + data.placeDis,
    };
    updateContactInfo(
      contactInfo,
      currentUserInfo?.accessToken,
      dispatch,
      setIsUpdateContactForm,
      navigate,
      setUpdateContactMsg
    );
  }

  useEffect(() => {
    const provId = provinces.find(
      (p) => p.province_name === provDefault
    )?.province_id;
    if (provId) {
      const fetchDisDefault = async () => {
        const res = await axios.get(
          `${PROVINCES_URL}/api/province/district/${provId}`
        );
        res?.data?.results && setDistricts(res.data.results);
      };
      fetchDisDefault();
    }
  }, [provinces]);

  useEffect(() => {
    if (provDefault && !districts.length) handleFetchProvinces(setProvinces);
  }, []);

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
          className="w-full p-2 text-[16px] border border-solid border-[#767676]"
          {...register("placeDis", {
            required: "Vui lòng chọn quận huyện!",
          })}
          value={provDefault}
          onChange={(e) => {
            onChangeProvince(e.target.value);
          }}
        >
          <option
            className="option-default"
            value=""
            disabled={selectedProvince}
          >
            -- Chọn tỉnh thành
          </option>
          {provinces.map((p) => (
            <option key={p.province_id} value={p.province_name}>
              {p.province_name}
            </option>
          ))}
        </select>
        {errors.placeProv && (
          <span className="text-[#CC0000]">{errors.placeProv.message}</span>
        )}
      </div>
      {/* district */}
      <div className="flex flex-col gap-1">
        <span>Quận huyện</span>
        <select
          className="w-full p-2 text-[16px] border border-solid border-[#767676]"
          {...register("placeProv", {
            required: "Vui lòng chọn tỉnh thành!",
          })}
          value={disDefault}
          onChange={(e) => {
            onChangeDistrict(e.target.value);
          }}
        >
          {districts.map((d) => (
            <option key={d.district_id} value={d.district_name}>
              {d.district_name}
            </option>
          ))}
        </select>
        {errors.placeDis && (
          <span className="text-[#CC0000]">{errors.placeDis.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <span></span>
        <span className="text-[#CC0000]">{updateContactMsg}</span>
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
