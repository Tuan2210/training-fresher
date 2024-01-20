import { Link } from "react-router-dom";
import styled from "styled-components";

import prdsData from "../../../data/prdsData.json";

import { FaBoltLightning } from "react-icons/fa6";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function PrdDetailsBlockHd({ prdName }) {
  function findIdByPrdName(data, prdName) {
    for (const category of data) {
      for (const info of category.infos) {
        if (info.prdName === prdName) {
          return info.id;
        }
      }
    }
    return null;
  }
  const productId = findIdByPrdName(prdsData, prdName);

  return (
    <StyledDiv className="flex items-center justify-between text-[1.2rem] border border-b-0 border-solid border-[#b21e02]">
      <div className="flex nav-left items-center gap-1 ml-2">
        <FaBoltLightning className="text-[#FFFF00]" />
        <span>
          {productId} - {prdName}
        </span>
      </div>
      <Link
        to="#"
        className="flex guide-btn bg-[#DBDBDB] items-center p-2 hover:bg-[#EAEAEA]"
      >
        <AiOutlineQuestionCircle className="mr-2 text-[#8D1802]" />
        <span className="text-[#002F3F] text-base">Hướng dẫn mua hàng</span>
      </Link>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background-color: #b21e02;
  background-image: linear-gradient(
    to bottom,
    #b21e02,
    #b21e02,
    #b93016,
    #b21e02,
    #b21e02
  );
  color: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column !important;
    .nav-left {
      width: 100%;
      justify-content: flex-start;
      padding: 0.5rem 0 0.5rem 0;
    }
    .guide-btn {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;
