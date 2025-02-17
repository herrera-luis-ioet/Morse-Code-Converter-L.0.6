import React from 'react';
import styled from 'styled-components';
import InputSection from './InputSection';
import OutputSection from './OutputSection';
import ControlsSection from './ControlsSection';

const Container = styled.div`
  width: 100%;
  max-width: 1039px;
  margin: 0 auto;
  padding: 20px;
`;

const MorseCodeConverter: React.FC = () => {
  return (
    <Container>
      <InputSection />
      <ControlsSection />
      <OutputSection />
    </Container>
  );
};

export default MorseCodeConverter;