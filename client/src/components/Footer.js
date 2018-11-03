import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <FooterWrapper>
    Made for Vincit Hackfest 2018
  </FooterWrapper>
);

const FooterWrapper = styled.div`
  background-color: #1c1b1d;
  color: #dddddd;
  width: 100vw;
  text-align: center;
  height: 50px;
  line-height: 50px;
`;

export default Footer;
