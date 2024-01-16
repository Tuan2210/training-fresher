import styled from "styled-components";

import { Link } from "react-router-dom";

import MoreBtn from "../../MoreBtn/MoreBtn";

export default function PrdsBlockContent({ prdWrp }) {
  function formatPrice(number) {
    return number.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <StyledWrp>
      <StyledDiv className="grid grid-cols-6 p-4 gap-4 bg-white">
        {prdWrp.infos.map((item, index) => (
          <StyledItem
            key={index}
            className="ctitem flex flex-col text-[1rem] relative"
          >
            {item.discount !== 0 && (
              <div className="stick absolute top-0 right-0 w-[42px] h-[42px] text-center text-[#FFFF00] z-[1]">
                <span>-{item.discount}%</span>
              </div>
            )}
            <div className="ctitct flex flex-col h-full">
              <div className="ctitcemter flex justify-center">
                <Link to="#">
                  <img src={item.img} alt="prd-img" />
                </Link>
              </div>
              <div className="ctitemma flex justify-center mt-2">
                <Link>
                  <b>{item.id}</b>
                </Link>
              </div>
              <Link className="ctname p-2 flex overflow-hidden">
                {item.prdName}
              </Link>
              <div className="ctprsale flex justify-center items-center mt-auto">
                {item.discount !== 0 && (
                  <>
                    <span className="text-[1.2rem] text-[#936B62] mr-[0.3rem] line-through">
                      {formatPrice(item.regularPrice)}
                    </span>
                    <sup className="text-[#585858]">đ</sup>
                  </>
                )}
              </div>
            </div>
            <div className="ctprice flex justify-center items-center p-2 border-t border-solid border-t-white">
              <span className="text-[1.3rem] text-[#890F00] mr-[0.3rem]">
                {formatPrice(item.salePrice)}
              </span>
              <sup className="text-[#585858]">đ</sup>
            </div>
          </StyledItem>
        ))}
      </StyledDiv>
      <div className="moreBtn hidden justify-end p-4">
        <MoreBtn />
      </div>
    </StyledWrp>
  );
}

const StyledItem = styled.div`
  .stick {
    line-height: 42px;
    background-image: url(https://thegioidien.com/images/salebg.png);
    background-repeat: no-repeat;
  }
  .ctitct {
    background: linear-gradient(to bottom, #fff, #fff, #eeeeee);
    .ctname {
      line-height: 1.4;
    }
  }
  .ctprice {
    background-image: linear-gradient(to top, #d5d5d5, #ebebeb, #ebebeb);
  }
  sup {
    font-size: smaller;
  }
`;

const StyledDiv = styled.div`
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const StyledWrp = styled.div`
  @media screen and (max-width: 1200px) {
    .moreBtn {
      display: flex !important;
    }
  }
`;
