import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 30px;
  padding: 20px;
  margin: 20px 0;
  height: 290px;
  margin-top: 187px;
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

const InputSection: React.FC = () => {
  return (
    <Section>
      <Label>Input:</Label>
      <TextField 
        type="text" 
        placeholder="Type your message here"
      />
    </Section>
  );
};

export default InputSection;