import styled from 'styled-components';

const App = () => {
  return (
    <Container>
      <Title>Index</Title>
    </Container>
  );
};

export default App;

const Container = styled.div`
  background: rgba(0, 0, 0, 0.45);
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  background: rgba(0, 0, 0, 0.9);
  height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
