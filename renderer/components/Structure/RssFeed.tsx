import { useState, useEffect, FC } from 'react';
import styled from 'styled-components';

import Parser from 'rss-parser';

import Feed from 'C:\\Users\\emil-\\Desktop\\Feed.json';

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
        // const data = await parser.parseURL(
        //   'https://darksteam.net/forums/-/index.rss'
        // );

        setFeed(Feed);
      } catch (error) {
        setFeed(false);
      }
    };

    getFeed();
  }, []);

  return (
    <Container>
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
    const shortened = item.title.substr(0, 22);
    return shortened.length < title.length ? shortened + '...' : title;
  };

  return <StyledFeedItem>{getTitle(item.title)}</StyledFeedItem>;
};

/* Styles */

const Container = styled.div`
  background: rgba(0, 0, 0, 0.45);
  border-radius: 5px;
  overflow: hidden;
`;

const Feeds = styled.div`
  margin: 5px;
  overflow: hidden;
`;

const StyledFeedItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 5px;

  &:last-of-type {
    margin: none;
  }
`;
