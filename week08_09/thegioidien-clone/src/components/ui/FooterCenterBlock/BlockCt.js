import styled from "styled-components";

export default function BlockCt({ children }) {
  return <StyledDiv className="grid p-4">{children}</StyledDiv>;
}

const StyledDiv = styled.div`
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 1.5rem 1rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
`;
