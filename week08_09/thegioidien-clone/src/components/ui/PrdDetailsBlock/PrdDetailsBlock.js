import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PrdDetailsMainNav from "./PrdDetailsMainNav";
import PrdDetailsBlockHd from "./PrdDetailsBlockHd";
import PrdReviewCmtBlock from "./PrdReviewCmtBlock";

import styled from "styled-components";

import { PiShoppingCartLight } from "react-icons/pi";
import { FaStream } from "react-icons/fa";

import prdsData from "../../../data/prdsData.json";
import PrdsBlockContent from "../PrdsBlock/PrdsBlockCt/PrdsBlockContent";

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

  const firstTwelvePrds = prdsData.slice(0, 1);

  return (
    <div className="w-full flex flex-col mt-4">
      <PrdDetailsMainNav prdName={prdName} />
      <PrdDetailsBlockHd prdName={prdName} />
      <PrdDetailsView className="prd-details-view border border-t-0 border-solid border-[#b21e02]">
        {/* top */}
        <div className="prd-details-view__top flex justify-between bg-[#EFEFEF]">
          {/* left */}
          <div className="left-wrp grid grid-cols-5 w-[75%]">
            <div className="col-span-5 flex items-center gap-2 pl-2">
              <div className="flex flex-wrap items-center gap-2">
                <span>Chat:</span>
                <img
                  src="https://thegioidien.com/images/zalolg.png"
                  alt="zalo"
                  className="hover:bg-white"
                />
                <img
                  src="https://thegioidien.com/images/fmesenger.png"
                  alt="messenger"
                  className="hover:bg-white"
                />
                <img
                  src="https://thegioidien.com/images/telegram.png"
                  alt="telegram"
                  className="hover:bg-white"
                />
              </div>
            </div>
          </div>
          {/* right */}
          <div className="right-wrp w-full flex gap-1 text-lg">
            <div className="grid grid-cols-7 w-full">
              <div className="col-span-7">
                {/* Giá bán */}
                <div className="price-wrp flex flex-col text-[#430B01] gap-2 pt-5 pb-5">
                  <div className="price-wrp__left col-span-3 flex gap-2 items-baseline">
                    <span className="text-xl">Giá bán:</span>
                    <span className="text-[#0F4DD3] text-2xl">329.700</span>
                    <span>vnđ/Cái.</span>
                  </div>
                  <div className="price-wrp__right col-span-4 flex gap-2 items-baseline">
                    <span className="text-[#3B3B3B] text-base">
                      Giá thị trường:
                    </span>
                    <span className="line-through text-[1.1rem] text-[#936B62]">
                      366.300
                    </span>
                    <span className="text-[#3B3B3B] text-base">vnđ/Cái.</span>
                    <span className="text-base">Tiết kiệm:</span>
                    <span className="text-[#0F4DD3] text-lg">10%</span>
                  </div>
                </div>

                {/* Số lượng - Mua hàng */}
                <div className="quant-buy-wrp flex text-[#430B01] gap-2 items-center pt-2 pb-6">
                  <span className="text-base lblQuantity">Số lượng</span>
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
                  <Link
                    to="/muahang"
                    className="w-fit ml-3 flex justify-center items-center rounded pt-2 pb-2 pl-4 pr-4 gap-2 bg-[#1C8DD9] hover:bg-[#1c8dd9e0]"
                  >
                    <PiShoppingCartLight className="text-[#FFFF00] text-3xl" />
                    <p className="text-white">Mua hàng</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* boddy */}
        <div className="prd-details-view__body grid grid-cols-12 p-2 pr-0">
          {/* slide-thumbnail */}
          <div className="img-wrp col-span-12 flex flex-col">
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
          <div className="details-info-wrp col-span-12 overflow-y-auto ml-2 flex flex-col gap-4 border-b border-solid border-[#E8E8E8]">
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
                className="text-lg"
                style={{ fontFamily: "Arial Helvetica sans-serif" }}
              >
                <tr>
                  <th className="flex p-2 pl-0 gap-2 w-max" colSpan="2">
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
            {/* Chiết khấu */}
            <div className="flex justify-between w-fit gap-3">
              <img
                className="object-contain w-4"
                src="https://thegioidien.com/fckupload/image/giamthem.png"
                alt="img-check"
              />
              <span>
                <b>Giảm thêm chiết khấu cao khi mua số lượng lớn</b>
              </span>
            </div>
            {/* Giới thiệu sản phẩm */}
            <div className="flex flex-col">
              <div className="flex justify-between w-fit gap-3">
                <img
                  className="object-contain"
                  src="https://thegioidien.com/fckupload/image/tc_sd.png"
                  alt="img-check"
                />
                <span>Giới thiệu sản phẩm:</span>
              </div>
              <div>
                MENNEKES là nhà sản xuất phích cắm, ổ cắm cho thị trường toàn
                cầu. Trụ sở chính được đặt tại Kirchhundem - Đức. Thông qua các
                văn phòng bán hàng khu vực, các đại lý và đối tác, MENNEKES có
                mặt trên khắp thế giới. Với hơn 800 nhân viên, MENNEKES đã trở
                thành nhãn hiệu phổ biến toàn cầu.
                <br />
                <br /> Sản phẩm Mennekes đã vượt qua những kiểm nghiệm gắt gao
                nhất để làm nên thương hiệu của mình. Những kiểm nghiệm gắt gao
                nhất về nhiệt độ, bụi bẩn, chống thấm nước, ..đã được thực hiện
                rất nhiều lần trong phòng thí nghiệm trước khi đưa ra thị
                trường.
                <br />
                <br /> Sản phẩm Mennekes đã được chứng nhận tuân theo các tiêu
                chuẩn quốc tế bởi các tổ chức kiểm định có uy tín. Để đạt được
                mục tiêu sản xuất ra những sản phẩm có chất lượng tốt nhất, hệ
                thống quản lý chất lượng theo tiêu chuẩn DIN EN ISO 9001:2000 đã
                được thiết lập và chứng nhận tại tất cả các nhà máy của
                Mennekes.
                <br />
                <br /> Với định hướng thương mại xuất khẩu, Mennekes đã đạt được
                các chứng nhận của các tổ chức quốc tế có liên quan như sau:
                TÜV, VDE, DMT, Lloyd's Register, DNV.Sản phẩm phích cắm, ổ cắm
                của MENNEKES được thiết kế phù hợp với những tiêu chuẩn có liên
                quan của các quốc gia: Argentina, Bỉ, Đan Mạch, Đức, Phần Lan,
                Pháp, Anh, Ý, Canada, Croatia, Hà Lan, Na Uy, Áo, Ba Lan, Nga,
                Thụy Điển, Thụy Sĩ, Slowakia, Tây Ban Nha, Nam Phi, Cộng Hòa
                Séc, Hungary, Mỹ, Trung Quốc, ....
              </div>
            </div>
          </div>
        </div>

        {/* prd-review */}
        <PrdReviewCmtBlock />

        {/* Sản phẩm khác */}
        <StyledOtherPrdsHd className="w-full p-2 flex items-center border-t border-solid border-[#B21E02] bg-[#F2D9D4]">
          <Link to="#" className="flex items-center gap-2 ml-2">
            <FaStream className="text-[#E24B01]" />
            <span className="text-lg text-[#3E0B00] hover:text-[#002F3F]">
              Sản Phẩm Khác Thuộc Dòng Wide - Panasonic
            </span>
          </Link>
        </StyledOtherPrdsHd>
        {firstTwelvePrds.map((prd, index) => (
          <div key={index} className="w-full mt-4">
            <PrdsBlockContent prdWrp={prd} />
          </div>
        ))}
      </PrdDetailsView>
    </div>
  );
}

const PrdDetailsView = styled.div`
  @media screen and (max-width: 575px) {
    .prd-details-view {
      &__top {
        padding: 1rem 0 1rem 0 !important;
        .right-wrp {
          .quant-buy-wrp {
            flex-wrap: wrap;
            .lblQuantity {
              display: none;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .prd-details-view {
      &__top {
        flex-direction: column !important;
        padding: 1rem;
        .left-wrp {
          width: 100%;
        }
        .right-wrp {
          .price-wrp {
            flex-direction: row !important;
            flex-wrap: wrap;
            width: 100%;
            padding-left: 0.5rem;
            align-items: flex-end;
            &__right {
              flex-wrap: wrap;
            }
          }
          .price-wrp,
          .price-wrp__left,
          .price-wrp__right {
            gap: 0.5rem;
          }
          .quant-buy-wrp {
            justify-content: center;
          }
        }
      }
      &__body {
        padding: 0.5rem !important;
        .details-info-wrp {
          padding: 0 !important;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .prd-details-view {
      &__top {
        .left-wrp {
          width: 40% !important;
        }
        .right-wrp {
          width: 100% !important;
        }
      }
      &__body {
        height: 480px;
        .img-wrp,
        .details-info-wrp {
          grid-column: span 6 !important;
        }
      }
    }
  }
  @media screen and (min-width: 993px) {
    .prd-details-view {
      &__top {
        .left-wrp {
          width: 40% !important;
        }
        .right-wrp {
          width: 100% !important;
          .price-wrp {
            flex-direction: row !important;
            align-items: flex-end;
          }
        }
      }
      &__body {
        .img-wrp {
        }
        .details-info-wrp {
        }
      }
    }
  }
  @media screen and (min-width: 1200px) {
    .prd-details-view {
      &__top {
        .left-wrp {
          width: 75% !important;
        }
      }
      &__body {
        .img-wrp {
          grid-column: span 5 !important;
        }
        .details-info-wrp {
          grid-column: span 7 !important;
        }
      }
    }
  }
  @media screen and (min-width: 1401px) {
    .prd-details-view {
      &__top {
        .left-wrp {
          width: 75% !important;
        }
      }
    }
  }
`;

const StyledOtherPrdsHd = styled.div`
  background-image: linear-gradient(to bottom, #f2d9d4, #fff);
`;
