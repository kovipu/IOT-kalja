import React from 'react';
import styled from 'styled-components';

const Beer = (beer) => (
  <BeerWrapper>
    Kalja
  </BeerWrapper>
);

const BeerWrapper = styled.div`
  padding: 10px;
  margin: 16px;
  background-color: #f5f5f6;
  max-height: 600px;
  width: 400px;
  @media(max-width: 768px) {
    width: 100vw;
  }
`;

export default Beer;
