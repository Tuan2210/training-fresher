import styled from "styled-components";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function PrdsBlockContent({ prdWrp }) {
  const [isDiscount, setIsDiscount] = useState(0);
  // if (!prdWrp || !prdWrp.infos) {
  //   return null;
  // }

  return (
    <div className="grid grid-cols-6 p-4 gap-4 bg-white">
      {prdWrp.infos.map((item, index) => (
        <Link to="#" key={index}>
          <StyledItem className="flex flex-col items-center relative">
            <img src={item.img} alt="prd-img" />
            <div>{item.id}</div>
            <div>{item.prdName}</div>
            <div>{item.regularPrice}</div>
            <div>{item.salePrice}</div>
          </StyledItem>
        </Link>
      ))}
    </div>
  );
}

const StyledItem = styled.div`
  background-color: #dbdbdb;
  background-image: linear-gradient(to bottom, #fff, #fff, #e6e6e6);
`;
