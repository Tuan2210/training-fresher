import styled from "styled-components";

export default function PrdReviewCmtBlock() {
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
      <form className="cmt-text flex flex-col mt-4 gap-2">
        <div className="infoUserRow flex flex-col gap-2">
          {/* Họ tên */}
          <div className="input-row__wrp w-full flex">
            <input
              type="text"
              className="w-full p-2 text-[16px] border border-solid border-[#767676]"
              placeholder="Họ tên..."
              // {...register("fullName", {
              //   required: "Vui lòng nhập họ tên!",
              //   validate: handleValidateFullName,
              // })}
            />
            <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
              *
            </span>
          </div>
          {/* Email */}
          <div className="input-row__wrp w-full flex">
            <input
              type="text"
              className="w-full p-2 text-[16px] border border-solid border-[#767676]"
              placeholder="Email..."
              // {...register("fullName", {
              //   required: "Vui lòng nhập họ tên!",
              //   validate: handleValidateFullName,
              // })}
            />
            <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
              *
            </span>
          </div>
        </div>
        <div className="contentCmtRow w-full flex">
          <input
            type="text"
            className="w-full p-2 text-[16px] border border-solid border-[#767676]"
            placeholder="Họ tên..."
            // {...register("fullName", {
            //   required: "Vui lòng nhập họ tên!",
            //   validate: handleValidateFullName,
            // })}
          />
          <span className="err-alert text-[#FF6600] ml-2 mr-2 text-lg mt-2">
            *
          </span>
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
      .infoUserRow {
        flex-direction: row !important;
      }
    }
  }
`;
