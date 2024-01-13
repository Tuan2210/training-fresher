import { Link } from "react-router-dom";
import styled from "styled-components";

export default function PrdsBlockHeader({ prdWrp }) {
  return (
    <StyledHeader className="flex w-full">
      <Link
        to="#"
        className="text-[1.2rem] p-[0.5rem] text-white hover:text-[#FFFF00]"
      >
        {prdWrp.title}
      </Link>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #b21e02;
  background-image: linear-gradient(
    to bottom,
    #b21e02,
    #b21e02,
    #b93016,
    #b21e02,
    #b21e02
  );
`;
