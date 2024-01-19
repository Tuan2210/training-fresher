import { useParams } from "react-router-dom";
import PrdDetailsMainNav from "./PrdDetailsMainNav";
import PrdDetailsBlockHd from "./PrdDetailsBlockHd";

import styled from "styled-components";

import { PiShoppingCartLight } from "react-icons/pi";
import { useState } from "react";

export default function PrdDetailsBlock() {
  const { prdName } = useParams();

  const [quantity, setQuantity] = useState(1);

  function handleDecrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleIncrease() {
    setQuantity(quantity + 1);
  }

  return (
    <div className="w-full flex flex-col mt-4">
      <PrdDetailsMainNav prdName={prdName} />
      <PrdDetailsBlockHd prdName={prdName} />
      <PrdDetailsView className="prd-details-view border border-t-0 border-solid border-[#b21e02]">
        {/* top */}
        <div className="prd-details-view__top flex justify-between bg-[#EFEFEF]">
          {/* left */}
          <div className="grid grid-cols-5 w-[75%]">
            <div className="col-span-5 flex items-center gap-2 pl-2 h-36">
              <span>Chat:</span>
              <img src="https://thegioidien.com/images/zalolg.png" alt="zalo" />
              <img
                src="https://thegioidien.com/images/fmesenger.png"
                alt="messenger"
              />
              <img
                src="https://thegioidien.com/images/telegram.png"
                alt="telegram"
              />
            </div>
          </div>
          {/* right */}
          <div className="w-full flex flex-col gap-1 text-lg">
            <div className="grid grid-cols-7">
              <div className="col-span-7">
                {/* Giá bán */}
                <div className="flex text-[#430B01] gap-2 items-end pt-5 pb-5">
                  <span className="text-xl">Giá bán:</span>
                  <span className="text-[#0F4DD3] text-2xl">329.700</span>
                  <span>vnđ/Cái.</span>
                  <span className="text-[#3B3B3B] text-base">
                    Giá thị trường:
                  </span>
                  <span className="line-through text-base">366.300</span>
                  <span className="text-[#3B3B3B] text-base">vnđ/Cái.</span>
                  <span className="text-base">Tiết kiệm:</span>
                  <span className="text-[#0F4DD3] text-lg">10%</span>
                </div>

                {/* Số lượng - Mua hàng */}
                <div className="flex text-[#430B01] gap-2 items-center pt-2 pb-6">
                  <span className="text-base">Số lượng</span>
                  <div className="quantities-wrp flex items-center justify-between bg-[#B5B5B4] rounded w-44">
                    <button
                      onClick={handleDecrease}
                      className="text-[#003B4F] text-4xl w-full pt-1 pb-1 hover:text-[#B21E02]"
                    >
                      -
                    </button>
                    <input
                      className="bg-white border border-solid border-[#B5B5B4] p-4 w-20 h-12 text-center"
                      type="text"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(parseInt(e.target.value));
                      }}
                    />
                    <button
                      onClick={handleIncrease}
                      className="text-[#003B4F] text-4xl w-full pt-1 pb-1 hover:text-[#B21E02]"
                    >
                      +
                    </button>
                  </div>
                  <span>Cái</span>
                  <button
                    type="submit"
                    className="w-fit ml-3 flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
                  >
                    <PiShoppingCartLight className="text-[#FFFF00] text-3xl" />
                    <p className="text-white">Mua hàng</p>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-7">
              <div className="col-span-7">
                <div className=""></div>
              </div>
            </div> */}
          </div>
        </div>

        {/* boddy */}
        <div className="prd-details-view__body grid grid-cols-12 p-2 pr-0">
          {/* slide-thumbnail */}
          <div className="img-wrp col-span-5 flex flex-col">
            <div className="prd-slide flex items-center justify-center p-2">
              <img
                src="https://thegioidien.com/PrdGallery/6365255567.jpg"
                alt="prd-img-slide"
              />
            </div>
            <div className="prd-thumbnail bg-[#F6F6F6] w-full flex items-center justify-center mt-2 p-2">
              <img
                src="https://thegioidien.com/ThumbG/6365255567.jpg"
                alt="prd-thumbnail"
              />
            </div>
          </div>
          {/* details-info */}
          <div className="details-info-wrp col-span-7 overflow-y-scroll pl-4 flex flex-col gap-4">
            <p className="text-[#003b4f] pt-4">
              <b>Ổ cắm nối 5P 32A 6H IP44</b>
            </p>
            {/* Mã sản phẩm */}
            <div className="flex justify-between w-fit gap-3">
              <img
                className="object-contain"
                src="https://thegioidien.com/fckupload/image/tc_sd.png"
                alt="img-check"
              />
              <span>Mã sản phẩm:</span>
              <span className="text-[#ff6600]">
                <b>6</b>
              </span>
            </div>
            {/* Thương hiệu */}
            <div className="flex justify-between w-fit gap-3">
              <img
                className="object-contain"
                src="https://thegioidien.com/fckupload/image/tc_sd.png"
                alt="img-check"
              />
              <span>Thương hiệu:</span>
              <span>
                <b>Mennekes</b>
              </span>
            </div>
            {/* Thông số kỹ thuật */}
            <table className="w-full border border-collapse border-gray-300">
              <thead
                className="w-full border border-collapse border-gray-300 text-lg"
                style={{ fontFamily: "Arial Helvetica sans-serif" }}
              >
                <tr>
                  <th className="flex p-2 pl-0 gap-2" colSpan="2">
                    <img
                      className="object-contain"
                      src="https://thegioidien.com/fckupload/tc_kt.png"
                      alt="img-th"
                    />
                    <span>
                      <b>Thông số kỹ thuật</b>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Loại</td>
                  <td className="border p-2">
                    <b>Ổ cắm nối</b>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Số cực</td>
                  <td className="border p-2">
                    <b>5P (3P + N + E)</b>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Dòng định mức</td>
                  <td className="border p-2">
                    <b>32A</b>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Vị trí cực tiếp địa</td>
                  <td className="border p-2">
                    <b>6H</b>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Cấp bảo vệ</td>
                  <td className="border p-2">
                    <b>IP44</b>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Điện áp</td>
                  <td className="border p-2">
                    <b>400 VAC 50/60 Hz</b>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Tiêu chuẩn</td>
                  <td className="border p-2">
                    <b>CEE, DE, VDE, NL, KEMA, AT, OVE, CN, CQC..</b>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Tài liệu kỹ thuật */}
            <div className="flex justify-between w-fit gap-3">
              <img
                className="object-contain"
                src="https://thegioidien.com/fckupload/image/tc_sd.png"
                alt="img-check"
              />
              <span>Tài liệu kỹ thuật</span>
            </div>
            {/* Xuất xứ */}
            <div className="flex justify-between w-fit gap-3">
              <img
                className="object-contain"
                src="https://thegioidien.com/fckupload/image/tc_sd.png"
                alt="img-check"
              />
              <span>Xuất xứ:</span>
              <span className="text-[#ff6600]">
                <b>Germany</b>
              </span>
            </div>
            {/* Chất lượng */}
            <div className="flex justify-between w-fit gap-3">
              <img
                className="object-contain"
                src="https://thegioidien.com/fckupload/image/tc_sd.png"
                alt="img-check"
              />
              <span>Chất lượng:</span>
              <span>Mới 100%, chưa sử dụng</span>
            </div>
            {/* Chứng từ */}
            <div className="flex justify-between w-fit gap-3">
              <img
                className="object-contain"
                src="https://thegioidien.com/fckupload/image/tc_sd.png"
                alt="img-check"
              />
              <span>Chứng từ:</span>
              <span>CO, CQ, Hóa đơn VAT</span>
            </div>
          </div>
        </div>
      </PrdDetailsView>
    </div>
  );
}

const PrdDetailsView = styled.div``;
