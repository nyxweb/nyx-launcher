import { FC } from 'react';
import styled from 'styled-components';

import Toolbar from './Toolbar';
import UpdateBar from './UpdateBar';

const Structure: FC = ({ children }) => {
  return (
    <Wrapper>
      <Toolbar />
      <Content>{children}</Content>
      <UpdateBar />
    </Wrapper>
  );
};

export default Structure;

/* Styles */

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'toolbar'
    'content'
    'updatebar';
  grid-template-columns: 1fr;
  grid-auto-rows: 70px 1fr 70px;
  -webkit-user-select: none;
  -webkit-app-region: drag;
`;

const Content = styled.div`
  grid-area: content;
  display: flex;
  align-items: center;
  justify-content: center;
`;
