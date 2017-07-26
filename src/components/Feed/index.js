import React from 'react';
import FeedItem from './FeedItem';
import { connect } from 'react-redux';
import { setClass } from 'utils/responsiveHelpers';
import { StickyContainer } from 'react-sticky';
import './Feed.scss';

/**
 * Displays a stream of content as FeedItems
 * @param {Object} props The props passed to the feed
 * @param {Array} props.articles An array of articles to display on the feed
 * @param {React.Component} props.header An optional element inserted at top of feed
 * @param {number} props.articles.postID  The post ID
 * @param {string} props.articles.title   The post title
 * @param {string} props.articles.author  The post author
 * @param {Array} props.articles.tags     An array of tag associated with the post
 * @param {Object} props.articles.featuredImage  The featured image properties
 * @param {string} props.articles.featuredImage.created_at Date featured image was created
 * @param {string} props.articles.featuredImage.src  Url to image asset
 * @param {string} props.articles.permalink   The SEO freindly slug for the post
 */

export function Feed ({ articles, header, breakpoint, title }) {
  return (
    <StickyContainer>
      <div className="feed__container isthisit">
        { header && header }
        { title &&
          <div className="row">
            <div className={ 'col-center cf '.concat(setClass({ default: 'col-17', desktopSm: 'col-19', mobileLgL: 'mcol-6' }, breakpoint)) }>
              <div className="typ--t1 typ--heading">{ title }</div>
              <div className="keyline" />
            </div>
          </div>
        }
        <div className="feed row">
          <div className={ 'col-center cf '.concat(setClass({ default: 'col-17', desktopSm: 'col-19', mobileLgL: 'mcol-6' }, breakpoint)) }>
            { articles.map((art, ind) => <FeedItem { ...art } key={ ind } />) }
          </div>
        </div>
      </div>
    </StickyContainer>
  );
}

const { array, element, object, string } = React.PropTypes;
Feed.propTypes = {
  articles: array,
  header: element,
  breakpoint: object,
  title: string
};

const mapStateToProps = state => ({
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(Feed);
