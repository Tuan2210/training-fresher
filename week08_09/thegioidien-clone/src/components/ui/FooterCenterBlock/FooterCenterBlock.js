import BlockHd from "./BlockHd";
import BlockCt from "./BlockCt";

import { FaRegFilePdf } from "react-icons/fa";

export default function FooterCenterBlock() {
  return (
    <>
      {/* Hướng dẫn - Câu hỏi thường gặp */}
      <div className="bg-[#EDEDED] border-[3px] border-t-0 border-l-0 border-r-0 border-solid border-b-[#94AAB1]">
        <BlockHd>
          <i className="far fa-question-circle text-[#DFCA00]" />
          <p className="text-white hover:text-[#F9EEDD]">
            Hướng dẫn - Câu hỏi thường gặp
          </p>
        </BlockHd>
        <BlockCt>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/images403117148830324310.jpg"
              alt="img-footer-ct"
            />
            <span>Hướng dẫn yêu cầu báo giá trực tuyến (online)</span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/payonline172628575215358252.jpg"
              alt="img-footer-ct"
            />
            <span>Hướng dẫn thanh toán khi mua hàng</span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/images065020878023434620.jpg"
              alt="img-footer-ct"
            />
            <span>Hướng dẫn tìm sản phẩm tại thegioidien.com (P3)</span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/images065020878023434620.jpg"
              alt="img-footer-ct"
            />
            <span>Hướng dẫn tìm sản phẩm tại thegioidien.com (P2)</span>
          </div>
        </BlockCt>
      </div>
      {/* Tài liệu kỹ thuật */}
      <div className="bg-[#EDEDED] border-[3px] border-t-0 border-l-0 border-r-0 border-solid border-b-[#94AAB1]">
        <BlockHd>
          <FaRegFilePdf className="text-[#DFCA00]" />
          <p className="text-white hover:text-[#F9EEDD]">Tài liệu kỹ thuật</p>
        </BlockHd>
        <BlockCt>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/cadivi548476014643563814.jpg"
              alt="img-footer-ct"
            />
            <span>Hướng dẫn sử dụng cáp điện Cadivi trong xây dựng</span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/acronym856568264037413600.jpg"
              alt="img-footer-ct"
            />
            <span>Hướng dẫn một số từ viết tắt trong điện công nghiệp</span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/IPratings211347436877072435.jpg"
              alt="img-footer-ct"
            />
            <span>Cấp bảo vệ IP (IP44, IP55, IP65, IP67) là gì ?</span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/TLUG534424638648374342.jpg"
              alt="img-footer-ct"
            />
            <span>T.LUG - Đầu Cos</span>
          </div>
        </BlockCt>
      </div>
      {/* Bảng giá sản phẩm< */}
      <div className="bg-[#EDEDED] border-[3px] border-t-0 border-l-0 border-r-0 border-solid border-b-[#94AAB1]">
        <BlockHd>
          <i className="far fa-dollar-sign text-[#DFCA00]" />
          <p className="text-white hover:text-[#F9EEDD]">Bảng giá sản phẩm</p>
        </BlockHd>
        <BlockCt>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/Mennekes181728460066052280268475215.jpg"
              alt="img-footer-ct"
            />
            <span>
              Bảng giá ổ cắm công nghiệp Mennekes mới nhất đang áp dụng
            </span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/Panasonic_chieusang263271718838585467.jpg"
              alt="img-footer-ct"
            />
            <span>
              Bảng giá thiết bị chiếu sáng Panasonic mới nhất đang áp dụng
            </span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/LS_TuDong026710642466227447.jpg"
              alt="img-footer-ct"
            />
            <span>Bảng giá thiết bị tự động LS mới nhất đang áp dụng</span>
          </div>
          <div className="wrp">
            <img
              src="https://thegioidien.com/hmhNews/Broyce%20Control772846571238628403.jpg"
              alt="img-footer-ct"
            />
            <span>
              Bảng giá rơle bảo vệ Broyce control mới nhất đang áp dụng
            </span>
          </div>
        </BlockCt>
      </div>
    </>
  );
}
