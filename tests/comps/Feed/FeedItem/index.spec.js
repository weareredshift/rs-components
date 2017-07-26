import { FeedItem } from 'components/Feed/FeedItem';

describe('(Component) FeedItem', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = mockComp(FeedItem, {
      postID: 1,
      title: 'title',
      author: 'author',
      tags: ['tag1', 'tag2'],
      featuredImage: [{
        created_at: 'some date',
        src: 'http://somepath.com'
      }],
      permalink: 'some-slug-url',
      breakpoint: {}
    });
  });

  describe('FeedItem...', () => {
    it('should render divs with accurate classNames', () => {
      expect(_wrapper).to.have.exactly(1).descendants('.feeditem');
    });
  });
});
