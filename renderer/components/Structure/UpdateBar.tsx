import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { commandSender } from '../../utils';
import store from '../../store';
import { ADD_NOTICE } from '../../store/types';
import { v4 as uuid } from 'uuid';

const UpdateBar = () => {
  const { state, dispatch } = useContext(store);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTotal(100);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const updatingNotice = () => {
    dispatch({
      type: ADD_NOTICE,
      payload: {
        id: uuid(),
        type: 'warning',
        message: 'Please wait while the clinet is updating.',
      },
    });
  };

  const startGame = () => {
    if (state.updating) {
      updatingNotice();
    } else {
      commandSender('start-main');
    }
  };

  return (
    <Container>
      <Version>v{state.config!.version}</Version>
      <Updater>
        <Title>
          {state.updating
            ? `New version 0.0.2 available. Updating...`
            : `You are up to date!`}
        </Title>
        <ProgressWrapper>
          <ProgressGroup>
            <Text>Files</Text>
            <Progress>
              <ProgressFill style={{ width: `${total}%` }} />
            </Progress>
            <Text>{total}%</Text>
          </ProgressGroup>
          <ProgressGroup>
            <Text>Total</Text>
            <Progress>
              <ProgressFill className='green' style={{ width: `${total}%` }} />
            </Progress>
            <Text>{total}%</Text>
          </ProgressGroup>
        </ProgressWrapper>
      </Updater>
      <StartGame>
        <PlayButton
          onClick={startGame}
          className={state.updating ? 'updating' : ''}
        >
          {!state.updating ? 'START' : 'UPDATING'}
        </PlayButton>
      </StartGame>
    </Container>
  );
};

export default UpdateBar;

/* Styles */

const Container = styled.div`
  position: relative;
  grid-area: updatebar;
  display: grid;
  grid-template-columns: 70px 1fr 160px;
  background: rgba(0, 0, 0, 0.45);
`;

const Version = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 11px;
  font-family: 'Courier New', Courier, monospace;
  transition: 0.2s ease-in-out;
  opacity: 0.8;
  -webkit-app-region: none;

  &:hover {
    opacity: 1;
  }
`;

const Updater = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 30px;
  padding-bottom: 3px;
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 40px;
  padding-bottom: 5px;
`;

const ProgressGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  justify-items: center;
`;

const Text = styled.span`
  font-size: 10px;
`;

const Progress = styled.div`
  width: 100%;
  height: 4px;
  background: #4b5c7d;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: 0;
  height: 4px;
  background: #1cc0e6;
  transition: 1s ease;

  &.green {
    background: #1ce68b;
  }
`;

const StartGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PlayButton = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 4px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(16, 179, 16, 1) 0%,
    rgba(11, 120, 11, 1) 100%
  );
  -webkit-app-region: none;
  cursor: pointer;
  color: #004500;

  &:hover {
    background: linear-gradient(
      180deg,
      rgba(21, 199, 21, 1) 0%,
      rgba(12, 153, 12, 1) 100%
    );
  }

  &:active {
    padding: 2px 0 0 2px;
  }

  &.updating {
    background: linear-gradient(
      180deg,
      rgba(244, 181, 40, 1) 0%,
      rgba(209, 154, 30, 1) 100%
    );

    color: #804800;
    cursor: wait;

    &:hover {
      background: linear-gradient(
        180deg,
        rgba(244, 181, 40, 1) 0%,
        rgba(209, 154, 30, 1) 100%
      );
    }
  }
`;
