import { Link } from "react-router-dom";
import styled from "styled-components";

export default function PrdsBlockHeader() {
  return (
    <StyledHeader className="flex w-full">
      <Link
        to="#"
        className="text-[1.2rem] p-[0.5rem] text-white hover:text-[#FFFF00]"
      >
        Công Tắc Ổ Cắm và Phụ Kiện
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
