import { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import { shell } from 'electron';
import Parser from 'rss-parser';
import Moment from 'react-moment';

// import Feed from 'C:\\Users\\emil-\\Desktop\\Feed.json';

const parser = new Parser();

type IFeedItem = {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
};

const RssFeed = () => {
  const [feed, setFeed] = useState<any>(null);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const data = await parser.parseURL(
          'https://darksteam.net/forums/-/index.rss'
        );

        setFeed(data);
      } catch (error) {
        setFeed(false);
      }
    };

    getFeed();
  }, []);

  return (
    <Container>
      <Title>RSS Feed</Title>
      <Feeds>
        {feed === null
          ? `Loading...`
          : !feed
          ? `Couldn't fetch feed`
          : feed.items.map((item: IFeedItem) => <FeedItem item={item} />)}
      </Feeds>
    </Container>
  );
};

export default RssFeed;

const FeedItem: FC<{ item: IFeedItem }> = ({ item }) => {
  const getTitle = (title: string) => {
    const shortened = item.title.substr(0, 23);
    return shortened.length < title.length ? shortened + '...' : title;
  };

  return (
    <StyledFeedItem onClick={() => shell.openExternal(item.link)}>
      <ThreadName>{getTitle(item.title)}</ThreadName>
      <Legend>
        <Date>
          <Moment fromNow>{item.pubDate}</Moment>
        </Date>
        <Author>{item.creator}</Author>
      </Legend>
    </StyledFeedItem>
  );
};

/* Styles */

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
  background: rgba(0, 0, 0, 0.7);
  height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Feeds = styled.div`
  display: grid;
  grid-gap: 5px;
  padding: 5px;
  height: 427px;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledFeedItem = styled.a`
  display: block;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(52, 171, 235, 0.2);
  padding: 5px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: rgba(52, 171, 235, 0.2);
  }
`;

const ThreadName = styled.div`
  font-size: 14px;
  padding-bottom: 5px;
`;

const Legend = styled.div`
  display: flex;
  font-size: 11px;
  color: #96aeb5;
`;

const Date = styled.div`
  flex: 1;
`;

const Author = styled.div`
  flex: 1;
  text-align: right;
`;
