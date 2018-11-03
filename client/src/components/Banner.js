import React from 'react';
import styled from 'styled-components';

const Banner = () => (
  <BannerWrapper>
    IOT-kalja
  </BannerWrapper>
);

const BannerWrapper = styled.div`
  width: 100vw;
  font-family: 'Candal', sans-serif;
  font-weight: 500;
  background-color: #ee4f37;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 3em;
`;

export default Banner;
