import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';

interface Props {
  loading: boolean;
}

const AppLoader: FC<Props> = ({ loading }) => {
  const [shouldLoad, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoader(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container className={loading || shouldLoad ? 'loading' : ''}>
      <MuIcon />
      <LoaderWrapper>
        <LoaderFill />
      </LoaderWrapper>
    </Container>
  );
};

export default AppLoader;

/* Styles */

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  background: url('/images/background.jpg') no-repeat center center/cover;
  font-size: 20px;
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &.loading {
    opacity: 1;
    pointer-events: all;
  }
`;

const MuIcon = styled.div`
  width: 100px;
  height: 100px;
  background: url('/images/icon.png') no-repeat center center/contain;
`;

const LoaderWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 4px;
  margin-top: 10px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const LoaderFill = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #4de3f8;
  animation: loader 1.5s ease-in-out forwards infinite;

  @keyframes loader {
    0% {
      width: 0%;
      left: 0;
    }
    50% {
      width: 100%;
      left: 0;
    }
    100% {
      left: 100%;
    }
  }
`;
