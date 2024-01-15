import { Link } from "react-router-dom";

import { IoHomeOutline } from "react-icons/io5";
import { ImFileText2 } from "react-icons/im";
import { FaRegFilePdf } from "react-icons/fa";
import { BsLightning } from "react-icons/bs";

import styled from "styled-components";

import { dataItems } from "../PrdsMenu/dataPrdsMenu";

export default function FooterBottomBlock() {
  return (
    <Styled>
      {/* wrp-top */}
      <div className="wrp-top flex flex-wrap p-2 justify-center">
        <Link
          to="/"
          className="bg-[#1C8DD9] text-[#EDEDED] flex gap-3 items-center rounded-[3px] pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] mt-2 mr-2 hover:bg-[#3498DB] hover:text-white"
        >
          <IoHomeOutline className="text-[#F3DC08]" />
          <span>Trang chủ</span>
        </Link>
        <Link
          to="#"
          className="bg-[#1C8DD9] text-[#EDEDED] flex gap-3 items-center rounded-[3px] pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] mt-2 mr-2 hover:bg-[#3498DB] hover:text-white"
        >
          <FaRegFilePdf className="text-[#F3DC08]" />
          <span>Tài liệu kỹ thuật</span>
        </Link>
        <Link
          to="#"
          className="bg-[#1C8DD9] text-[#EDEDED] flex gap-3 items-center rounded-[3px] pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] mt-2 mr-2 hover:bg-[#3498DB] hover:text-white"
        >
          <i className="far fa-question-circle text-[#F3DC08]" />
          <span>Hướng dẫn</span>
        </Link>
        <Link
          to="#"
          className="bg-[#1C8DD9] text-[#EDEDED] flex gap-3 items-center rounded-[3px] pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] mt-2 mr-2 hover:bg-[#3498DB] hover:text-white"
        >
          <i className="far fa-dollar-sign text-[#DFCA00]"></i>
          <span>Bảng giá sản phẩm</span>
        </Link>
        <Link
          to="#"
          className="bg-[#1C8DD9] text-[#EDEDED] flex gap-3 items-center rounded-[3px] pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] mt-2 mr-2 hover:bg-[#3498DB] hover:text-white"
        >
          <i className="far fa-address-book text-[#DFCA00]" />
          <span>Liên hệ</span>
        </Link>
        <Link
          to="#"
          className="bg-[#1C8DD9] text-[#EDEDED] flex gap-3 items-center rounded-[3px] pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] mt-2 mr-2 hover:bg-[#3498DB] hover:text-white"
        >
          <ImFileText2 className="text-[#DFCA00]" />
          <span>Quy định - điều khoản sử dụng websie</span>
        </Link>
      </div>
      {/* wrp-center */}
      <div className="wrp-center flex flex-wrap pr-2 pb-4 pl-2 justify-center">
        {dataItems.map((item, index) => (
          <Link
            to="#"
            key={index}
            className={`flex items-center gap-1 pt-[0.4rem] pb-[0.4rem] pl-[0.7rem] pr-[0.7rem] text-[#002343] rounded-[3px] mt-2 mr-2 border border-solid border-[#6A1300]  hover:bg-[#EFEFEF]`}
          >
            <BsLightning className="text-[#B21E02]" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      {/* wrp-bottom */}
      <div className="wrp-bottom text-[#3E3E3E] p-4 border-t border-dotted border-[#B21E02]">
        <p className="text-center">
          <Link to="http://online.gov.vn/Home/WebDetails/19235?AspxAutoDetectCookieSupport=1">
            <img
              src="https://thegioidien.com/fckupload/bocongthuong.png"
              alt="img-noticed"
              className="align-middle w-28 h-8 bg-none"
              style={{ margin: "0 auto" }}
            />
          </Link>
        </p>
        <p className="text-center">
          Bản quyền &#169; 2008-2022 thuộc về thegioidien.com
        </p>
        <p className="text-center">
          Ghi rõ nguồn khi sử dụng các thông tin tại WWW.THEGIOIDIEN.COM.
        </p>
        <p className="text-center">
          WWW.THEGIOIDIEN.COM thuộc sở hữu và điều hành bởi Công ty TNHH Thế
          Giới Điện
        </p>
        <p className="text-center">
          Văn phòng giao dịch: 98D Linh Đông, Khu Phố 7, Phường Linh Đông,
          TP.Thủ Đức, TP.HCM
        </p>
        <p className="text-center">
          GPKD: 0305921340 , Sở KHĐT TPHCM cấp ngày 23/08/2008. Địa chỉ: 32
          đường số 35, khu phố 2, phường Linh Đông, thành phố Thủ Đức, TP HCM
        </p>
      </div>
    </Styled>
  );
}

const Styled = styled.div`
  background-image: url(https://thegioidien.com/images/ftbg.jpg);
  background-repeat: repeat;
  border-bottom: 8px solid #540f00;
`;
