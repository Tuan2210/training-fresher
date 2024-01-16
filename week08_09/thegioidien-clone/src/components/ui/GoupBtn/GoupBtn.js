import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { LiaHomeSolid } from "react-icons/lia";

export default function GoupBtn() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      //   console.log(window.scrollY);
      if (myComponentRef > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/* {showTopBtn && ( */}
      <StyledDiv
        id="backTop"
        onClick={goToTop}
        className="fixed bottom-1 right-5 z-[99] w-[42px] h-[42px] rounded-[50%] bg-[#1C8DD9] opacity-70"
      >
        <Link className="m-0 p-0 w-[42px] h-[42px] rounded-[50%] flex justify-center items-center">
          <LiaHomeSolid className="text-2xl text-[#FFFF00]" />
        </Link>
      </StyledDiv>
      {/* )} */}
    </>
  );
}

const StyledDiv = styled.div`
  @media (min-width: 1401px) {
    opacity: 1;
  }
`;
