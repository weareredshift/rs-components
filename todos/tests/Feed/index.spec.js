import React from 'react';
import { Feed } from 'components/Feed';
import FeedItem from 'components/Feed/FeedItem';
import FeaturedFeedItem from 'components/Feed/FeaturedFeedItem';

describe('(Component) Feed', () => {
  let _wrapper;
  const articles = [
    { tags: ['Thing'], featuredImage: {} },
    { tags: ['Thing', 'Other'], featuredImage: {} },
    { tags: ['Other'], featuredImage: {} }
  ];

  beforeEach(() => {
    _wrapper = mockComp(Feed, {
      articles,
      breakpoint: {},
      header: <FeaturedFeedItem article={ { tags: ['Featured'], featuredImage: {} } } />
    });
  });

  describe('Feed...', () => {
    it('renders a FeedItem for every article', () => {
      expect(_wrapper).to.have.exactly(3).descendants(FeedItem);
      expect(_wrapper).to.have.exactly(1).descendants(FeaturedFeedItem);
    });
  });
});
