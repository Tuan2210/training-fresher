import { Link } from "react-router-dom";
import styled from "styled-components";

export default function BlockHd({ children }) {
  return (
    <Link to="#">
      <StyledDiv className="flex justify-center items-center p-2 pl-3 pr-3 gap-2 text-[1.2rem]">
        {children}
      </StyledDiv>
    </Link>
  );
}
const StyledDiv = styled.div`
  background-color: #b21e02;
  background-image: linear-gradient(
    to bottom,
    #b21e02,
    #b21e02,
    #b21e02,
    #b21e02,
    #c2452e,
    #d26c5a,
    #e19487
  );
`;
