import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${"#111111"};
  backdrop-filter: blur(12px);
  align-items: center;
  gap: 1rem;
  @media only screen and (max-width: 600px) {
    padding: 1.2rem;
    flex-wrap: wrap;
    height: 10%;
  }
`;

export const ImageContainer = styled.div`
  padding: 15px;
  display: flex;

  height: 100%;
  align-items: center;
  justify-content: center;
  img {
    max-width: 50%;
    width: 90px;
  }
  @media only screen and (max-width: 600px) {
    padding: 0rem;
    justify-content: center;
    img {
      max-width: 50%;
    }
  }
`;
