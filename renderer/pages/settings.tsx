import styled from 'styled-components';

const Settings = () => {
  return (
    <Container>
      <Title>Settings</Title>
      <FieldsArea>
        <Row>
          <div>Username</div>
          <div>
            <input type='text' />
          </div>
        </Row>
        <Row>
          <div>Resolution</div>
          <div>
            <select>
              <option>640x480</option>
              <option>800x600</option>
              <option>1024x768</option>
              <option>1280x1024</option>
              <option>1920x1080</option>
            </select>
          </div>
        </Row>
        <Row>
          <div>Sound</div>
          <div>
            <input type='checkbox' />
          </div>
        </Row>
        <Row>
          <div>Music</div>
          <div>
            <input type='checkbox' />
          </div>
        </Row>
        <Row>
          <div>Window Mode</div>
          <div>
            <input type='checkbox' />
          </div>
        </Row>
        <Row>
          <div>
            <button>Save Changes</button>
          </div>
        </Row>
      </FieldsArea>
    </Container>
  );
};

export default Settings;

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

const FieldsArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 427px;

  input,
  select {
    width: 100px;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
