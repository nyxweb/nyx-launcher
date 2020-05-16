import styled from 'styled-components';

const Settings = () => {
  return (
    <Container>
      <input type='datetime' name='' id='' />
      <input type='datetime' name='' id='' />
      <input type='datetime' name='' id='' />
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
`;
