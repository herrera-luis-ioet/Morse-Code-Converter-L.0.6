import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin: 20px 0;
`;

const SliderContainer = styled.div`
  margin: 20px 0;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  color: #000000;
  margin-bottom: 10px;
  font-family: 'JetBrains Mono', monospace;
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 11px;
  background: rgb(240, 240, 240);
  border-radius: 10px;
`;

const SliderFill = styled.div<{ width: number }>`
  position: absolute;
  height: 100%;
  background: rgb(132, 132, 132);
  border-radius: 10px;
  width: ${props => props.width}%;
`;

const SliderHandle = styled.div<{ left: number }>`
  position: absolute;
  width: 42px;
  height: 42px;
  background: #ffffff;
  border-radius: 50%;
  top: 50%;
  left: ${props => props.left}%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 10px 3px rgba(217, 217, 217, 0.5);
  cursor: pointer;
`;

interface SliderProps {
  label: string;
  value: number;
  percentage: number;
}

const Slider: React.FC<SliderProps> = ({ label, value, percentage }) => (
  <SliderContainer>
    <SliderLabel>
      <span>{label}</span>
      <span>{value}</span>
    </SliderLabel>
    <SliderTrack>
      <SliderFill width={percentage} />
      <SliderHandle left={percentage} />
    </SliderTrack>
  </SliderContainer>
);

const ControlsSection: React.FC = () => {
  return (
    <Section>
      <Slider label="speed" value={20} percentage={32} />
      <Slider label="pitch" value={550} percentage={53} />
      <Slider label="volume" value={80} percentage={75} />
    </Section>
  );
};

export default ControlsSection;