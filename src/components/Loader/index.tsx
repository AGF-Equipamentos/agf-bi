import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const LoaderSpinnig = styled.div`
  border: 4px solid ${props => props.theme.colors.text};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC = () => {
  return (
    <Container>
      <h1 style={{ marginBottom: 16 }}>Carregando...</h1>
      <LoaderSpinnig />
    </Container>
  );
};

export default Loader;
