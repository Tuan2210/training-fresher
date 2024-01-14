import carouselLogoData from "../../../data/carouselLogoData.json";
import { Link } from "react-router-dom";

import styled, { keyframes } from "styled-components";
// import Slider from "react-slick";

export default function PrdsCarousel() {
  return (
    <StyledPrdsCarousel className="carousel-container bg-[#83857A] pt-[8px] pl-[13px] pb-[8px] pr-[13px] inline-block whitespace-nowrap">
      <div className="flex overflow-hidden">
        <MarqueeGroup className="flex items-center justify-around w-full gap-2 mr-2">
          {carouselLogoData.map((item, index) => (
            <Link key={index} to="#" className="grid img-grp h-12">
              <img src={item.logo} className="w-full h-full" />
            </Link>
          ))}
        </MarqueeGroup>
        <MarqueeGroup className="flex items-center justify-around w-full gap-2">
          {carouselLogoData.map((item, index) => (
            <Link key={index} to="#" className="grid img-grp h-12">
              <img src={item.logo} className="w-full h-full" />
            </Link>
          ))}
        </MarqueeGroup>
      </div>
    </StyledPrdsCarousel>
  );
}

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const MarqueeGroup = styled.div`
  flex-shrink: 0;
  white-space: nowrap;
  animation: ${scrollX} 30s linear infinite;
  /* &:hover {
    animation: none;
  } */
`;

const StyledPrdsCarousel = styled.div`
  grid-area: th;
`;
