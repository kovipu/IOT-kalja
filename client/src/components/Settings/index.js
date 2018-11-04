import React, {Component} from 'react';
import styled from 'styled-components';

import SettingsModal from './SettingsModal';

class SettingsButton extends Component {
  state = {
    modalVisible: false
  };

  render() {
    const handleClick = () => this.setState({
      modalVisible: !this.state.modalVisible
    });

    return (
      <>
        <SettingsModal
          visible={this.state.modalVisible}
          timeout={this.props.timeout}
          setTimeout={this.props.setTimeout}
        />
        <SettingsButtonWrapper onClick={handleClick}>
          <img
            src="settings.svg"
            width="34px"
          />
        </SettingsButtonWrapper>
      </>
    )
  }
}

const SettingsButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;
  box-shadow: 0 5px 0 -2px rgba(0,0,0,.08);
  background-color: #e08541;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export default SettingsButton;
