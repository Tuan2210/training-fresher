import { RouterProvider } from "react-router-dom";

import { publicRoutes } from "./routes";

import styled from "styled-components";

function App() {
  return (
    <StyledDiv className="wrpall h-screen mx-auto">
      <RouterProvider router={publicRoutes} />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  @media screen and (min-width: 1401px) {
    width: 95%;
  }
`;

export default App;
