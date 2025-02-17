import React from 'react';
import styled from 'styled-components';
import InputSection from './InputSection';
import OutputSection from './OutputSection';
import ControlsSection from './ControlsSection';
import { useMorseCodeConverter } from '../hooks/useMorseCodeConverter';

const Container = styled.div`
  width: 100%;
  max-width: 1039px;
  margin: 0 auto;
  padding: 20px;
`;

const MorseCodeConverter: React.FC = () => {
  const {
    input,
    output,
    error,
    mode,
    setInput,
    toggleMode,
    clearInput
  } = useMorseCodeConverter();

  return (
    <Container>
      <InputSection
        value={input}
        onChange={setInput}
        error={error}
        mode={mode}
        onModeToggle={toggleMode}
        onClear={clearInput}
      />
      <ControlsSection />
      <OutputSection value={output} />
    </Container>
  );
};

export default MorseCodeConverter;
