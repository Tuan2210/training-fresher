import PrdsCarousel from "../../components/ui/PrdsCarousel/PrdsCarousel";
import FooterCenterBlock from "../../components/ui/FooterCenterBlock/FooterCenterBlock";
import FooterBottomBlock from "../../components/ui/FooterBottomBlock/FooterBottomBlock";

import styled from "styled-components";

export default function Footer() {
  return (
    <StyledDiv className="footer w-full mt-4 flex flex-col gap-4">
      <PrdsCarousel />
      <div className="footer-center grid grid-cols-3 gap-4 mt-1">
        <FooterCenterBlock />
      </div>
      <div className="footer-bottom">
        <FooterBottomBlock />
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  @media screen and (max-width: 768px) {
    .footer-center {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
`;
