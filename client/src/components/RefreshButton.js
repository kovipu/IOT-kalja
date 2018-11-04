import React from 'react';
import styled from 'styled-components';

const RefreshButton = ({ onClick }) => (
  <RefreshButtonWrapper onClick={onClick}>
    <i
      className="fas fa-sync fa-lg"
      style={{
        lineHeight: '50px',
        margin: 'auto'
      }}
    />
  </RefreshButtonWrapper>
);

const RefreshButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: #e08541;
  border-radius: 5px;
  position: fixed;
  bottom: 65px;
  right: 0.5em;
  display: flex;
  justify-content: center;
  box-shadow: 0 5px 0 -2px rgba(0,0,0,.08);
`;

export default RefreshButton;
