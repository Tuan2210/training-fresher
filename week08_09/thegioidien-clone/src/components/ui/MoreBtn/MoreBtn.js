import { Link } from "react-router-dom";
import styled from "styled-components";
import { PiCaretDoubleRightBold } from "react-icons/pi";

export default function MoreBtn() {
  return (
    <Link to="#">
      <StyledSpan className="bg-[#B21E02] rounded-[3px] flex items-center pt-2 pb-2 pl-[0.7rem] pr-[0.7rem]">
        <PiCaretDoubleRightBold className="text-[#FFFF00] mr-2" />
        <span className="text-[#EDEDED]" style={{ lineHeight: 1.4 }}>
          Xem thêm
        </span>
      </StyledSpan>
    </Link>
  );
}

const StyledSpan = styled.span`
  background-image: linear-gradient(
    to bottom,
    #b21e02,
    #b21e02,
    #b93016,
    #b21e02,
    #b21e02
  );
`;
