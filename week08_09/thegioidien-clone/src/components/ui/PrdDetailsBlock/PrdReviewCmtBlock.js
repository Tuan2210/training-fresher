import styled from "styled-components";

import { FaPaperPlane } from "react-icons/fa";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { FULLNAME_REGEX, EMAIL_REGEX } from "../../../constants/regexValidate";

const CmtReviewSchema = yup.object().shape({
  ["Họ tên"]: yup
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
  ["Nội dung"]: yup.string().required("Vui lòng nhập nội dung!"),
});

export default function PrdReviewCmtBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CmtReviewSchema) });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <StyledDiv className="bg-[#F9F9F9] mt-4 p-4 grid gap-2">
      {/* Đánh Giá Sản Phẩm */}
      <div className="cmt-hd flex flex-wrap">
        <div className="lblCmt pt-2 pb-2 pl-4 pr-4 bg-[#48322A] text-white">
          <i className="far fa-comments text-[#FFFF00] mr-2" />
          <span>Đánh Giá Sản Phẩm (0)</span>
        </div>
      </div>
      {/* Form đánh giá */}
      <form
        className="cmt-text flex flex-col mt-4 gap-2"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="info-user-row flex flex-wrap gap-2">
          {/* Họ tên */}
          <div className="full-name-wrp w-full items-center flex flex-wrap">
            <div className="w-full items-center flex">
              <input
                type="text"
                className="w-full p-2 text-[16px] border border-solid border-[#767676] focus:bg-[#FFFFF6]"
                placeholder="Họ tên..."
                {...register("Họ tên")}
              />
              <span className="err-alert text-[#CC0000] ml-2 mr-2 text-lg mt-2">
                *
              </span>
            </div>
            {errors["Họ tên"] && (
              <span className="text-[#CC0000] w-full">
                {errors["Họ tên"]?.message}
              </span>
            )}
          </div>
          {/* Email */}
          <div className="email-wrp w-full items-center flex flex-wrap">
            <div className="w-full items-center flex">
              <input
                type="text"
                className="w-full p-2 text-[16px] border border-solid border-[#767676] focus:bg-[#FFFFF6]"
                placeholder="Email..."
                {...register("Email")}
              />
              <span className="err-alert text-[#CC0000] ml-2 mr-2 text-lg mt-2">
                *
              </span>
            </div>
            {errors.Email && (
              <span className="text-[#CC0000] w-full">
                {errors.Email.message}
              </span>
            )}
          </div>
        </div>
        {/* Nội dung */}
        <div className="content-cmt-row w-full items-center flex flex-wrap justify-start">
          <div className="textarea-wrp w-full items-center flex">
            <textarea
              type="text"
              rows="3"
              className="w-full p-2 text-[16px] border border-solid border-[#767676] focus:bg-[#FFFFF6] focus:outline-none"
              placeholder="Nội dung..."
              {...register("Nội dung")}
            />
            <span className="err-alert text-[#CC0000] ml-2 mr-2 text-lg mt-2">
              *
            </span>
          </div>
          {errors["Nội dung"] && (
            <span className="text-[#CC0000]">
              {errors["Nội dung"]?.message}
            </span>
          )}
        </div>
        <div className="send-cmt-wrp mt-2">
          <button
            type="submit"
            className="sendCmtBtn flex items-center pt-2 pb-2 pl-[0.7rem] pr-[0.7rem] gap-2 text-[1.1rem] rounded-[3px] bg-[#646461]"
          >
            <FaPaperPlane className="text-[#FFFF00]" />
            <span className="text-[#FAFAFA]">Gửi đánh giá</span>
          </button>
        </div>
      </form>
      <div className="cmt-list"></div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .lblCmt {
    background-image: linear-gradient(to top, #48322a, #604d46);
  }

  @media screen and (min-width: 768px) {
    .cmt-text {
      .info-user-row {
        .full-name-wrp,
        .email-wrp {
          width: auto;
          flex-wrap: nowrap;
        }
        input[type="text"] {
          width: 320px;
        }
      }
      .content-cmt-row {
        .textarea-wrp {
          width: 70% !important;
          textarea {
            width: 670px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 992px) {
    .cmt-text {
      .content-cmt-row {
        .textarea-wrp {
          width: 850px !important;
          textarea {
            width: 820px;
          }
        }
      }
    }
  }
`;
