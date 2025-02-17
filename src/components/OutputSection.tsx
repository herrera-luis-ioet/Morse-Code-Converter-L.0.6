import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 30px;
  padding: 20px;
  margin: 20px 0;
  height: 464px;
  margin-top: 60px;
`;

const Label = styled.div`
  font-size: 32px;
  color: #000000;
  margin-bottom: 20px;
`;

const TextField = styled.input`
  width: 100%;
  font-size: 28px;
  color: rgb(168, 168, 168);
  border: none;
  outline: none;
  padding: 10px;
  font-family: 'JetBrains Mono', monospace;
`;

const ControlButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
`;

const ControlButton = styled.button`
  width: 120px;
  height: 114px;
  background: #000000;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  position: relative;
`;

const PlayButton = styled(ControlButton)`
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-left: 25px solid #ffffff;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
`;

const PauseButton = styled(ControlButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  span {
    width: 14px;
    height: 51px;
    background: #ffffff;
    border-radius: 3px;
  }
`;

const StopButton = styled(ControlButton)`
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: #ffffff;
    border-radius: 3px;
  }
`;

const SettingsButton = styled(ControlButton)`
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 35px;
    height: 51px;
    background: #ffffff;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
`;

const OutputSection: React.FC = () => {
  return (
    <Section>
      <Label>Output:</Label>
      <TextField 
        type="text" 
        placeholder="Translated message" 
        readOnly 
      />
      <ControlButtons>
        <PlayButton />
        <PauseButton>
          <span />
          <span />
        </PauseButton>
        <StopButton />
        <SettingsButton />
      </ControlButtons>
    </Section>
  );
};

export default OutputSection;