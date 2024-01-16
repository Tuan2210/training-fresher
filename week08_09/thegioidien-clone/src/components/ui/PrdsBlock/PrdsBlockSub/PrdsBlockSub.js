import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export default function PrdsBlockSub({ prdWrp }) {
  return (
    <StyledSub className="grid grid-cols-12 grid-flow-row w-full p-2 gap-2">
      {prdWrp.brandsLogo.map((item, index) => (
        <Link
          to="#"
          key={index}
          className="rounded border border-solid hover:border-[#B21E02]"
        >
          <img src={item.logo} alt="logo" className="rounded" />
        </Link>
      ))}
    </StyledSub>
  );
}

const StyledSub = styled.div`
  background-color: #dbdbdb;
  background-image: linear-gradient(
    to bottom,
    #d4bbb6,
    #dbdbdb,
    #dbdbdb,
    #dbdbdb,
    #dbdbdb
  );

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    img {
      height: 60px;
    }
  }

  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
