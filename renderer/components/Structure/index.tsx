import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import Toolbar from './Toolbar';
import UpdateBar from './UpdateBar';
import RssFeed from './RssFeed';

const Structure: FC = ({ children }) => {
  return (
    <Wrapper>
      <Toolbar />
      <ContentArea>
        <Content>{children}</Content>
        <RssFeed />
      </ContentArea>
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

const ContentArea = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr 200px;
  padding: 10px;
  grid-gap: 10px;
`;

const Content = styled.div`
  background: rgba(0, 0, 0, 0.45);
  border-radius: 5px;
`;
