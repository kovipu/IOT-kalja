import React from 'react';
import styled from 'styled-components';

const SettingsModal = ({ visible, timeout, setTimeout }) => (
  <SettingsModalWrapper visible={visible}>
    <SettingsWrapper visible={visible}>
      Päivitystiheys
      <TimeOutSelectorWrapper
        visible={visible}
      >
        <TimeOutSelector
          type="number"
          value={timeout}
          onChange={(ev) => setTimeout(parseFloat(ev.target.value))}
        /> minuuttia
      </TimeOutSelectorWrapper>
    </SettingsWrapper>
    <SettingsChevron visible={visible}/>
  </SettingsModalWrapper>
);

const SettingsModalWrapper = styled.div`
  width: ${props => props.visible ? '200px' : '30px'};
  height: 60px;
  position: fixed;
  right: ${props => props.visible ? '80px' : '0.5em' };
  bottom: 0.5em;
  display: inline-flex;
  align-items: flex-end;
  z-index: 998;
  transition: ${props => props.visible
    ? 'width 200ms, height 500ms, right 200ms'
    : 'width 500ms, height 200ms, right 500ms'};
`;

const SettingsWrapper = styled.div`
  width: ${props => props.visible ? '180px' : '6px' };
  height: ${props => props.visible ? '100%' : '30px'};
  padding: 10px;
  color: ${props => props.visible ? '#000' : 'transparent'}
  text-align: center;
  background-color: #fff;
  border-radius: 10px 10px 10px 10px;
  box-shadow: ${props => props.visible
    ? '0 5px 0 -2px rgba(0,0,0,.08)'
    : ''};
  transition: ${props => props.visible 
    ? 'width 200ms, height 500ms, color 500ms'
    : 'width 500ms, height 200ms, color 200ms'};
`;

const TimeOutSelectorWrapper = styled.div`
  opacity: ${props => props.visible ? 1 : 0};
  transition: ${props => props.visible
    ? 'opacity 500ms'
    : 'opacity 50ms'};
  padding-top: 10px;
  color: #666;
`;

const TimeOutSelector = styled.input`
  width: 30px;
`;

const SettingsChevron = styled.div`
  width: 0;
  height: 0;
  border-left: ${props => props.visible
    ? '20px solid #fff'
    : 'none'};
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  transition: border 100ms;
  margin-bottom: 8px;
`;

export default SettingsModal;
