import { useState, useContext } from 'react';
import styled from 'styled-components';
import store from '../store';
import { commandSender } from '../utils';
import { ADD_NOTICE, SET_CONFIG } from '../store/types';

const Settings = () => {
  const { state, dispatch } = useContext(store);
  const [settings, setSettings] = useState<any>(state.config);

  const typer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings && settings[e.target.name]) {
      setSettings({
        ...settings,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveChanges = () => {
    commandSender('update-config', settings);

    dispatch({
      type: SET_CONFIG,
      payload: { ...state.config, ...settings },
    });

    dispatch({
      type: ADD_NOTICE,
      payload: {
        type: 'success',
        message: `Settings saved`,
      },
    });
  };

  return (
    <Container>
      {!settings ? (
        `Loading...`
      ) : (
        <>
          <Title>Settings</Title>
          <FieldsArea>
            <Row>
              <div>Server Name</div>
              <div>
                <input
                  type='text'
                  name='name'
                  value={settings.name}
                  onChange={typer}
                />
              </div>
            </Row>
            <Row>
              <div>Username</div>
              <div>
                <input
                  type='text'
                  name='userId'
                  value={settings.userId}
                  onChange={typer}
                />
              </div>
            </Row>
            <Row>
              <div>Resolution</div>
              <div>
                <select
                  defaultValue={settings.resolution}
                  onChange={(e) =>
                    setSettings({ ...settings, resolution: e.target.value })
                  }
                >
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
                <input
                  type='checkbox'
                  onChange={(e) => {
                    setSettings({ ...settings, sound: e.target.checked });
                  }}
                  checked={settings.sound}
                />
              </div>
            </Row>
            <Row>
              <div>Music</div>
              <div>
                <input
                  type='checkbox'
                  onChange={(e) => {
                    setSettings({ ...settings, music: e.target.checked });
                  }}
                  checked={settings.music}
                />
              </div>
            </Row>
            <Row>
              <div>Window Mode</div>
              <div>
                <input
                  type='checkbox'
                  onChange={(e) => {
                    setSettings({ ...settings, windowMode: e.target.checked });
                  }}
                  checked={settings.windowMode}
                />
              </div>
            </Row>
            <Row>
              <div>
                <button onClick={saveChanges}>Save Changes</button>
              </div>
            </Row>
          </FieldsArea>
        </>
      )}
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
