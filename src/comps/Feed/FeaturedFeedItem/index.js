import React from 'react';
import { Link } from 'react-router';
import ArrowButton from 'components/Buttons/ArrowButton';
import { linkifyAuthor, linkifyCategory } from '../utils';
import Builder from 'components/Builder';
import { connect } from 'react-redux';
import { setClass } from 'utils/responsiveHelpers';

/**
 * Displays a single piece of feed content
 * @param {Object} props The props passed to the FeaturedFeedItem
 * @param {number} props.id  The post ID
 * @param {string} props.title   The post title
 * @param {string} props.author  The post author
 * @param {Array}  props.tags     An array of tag associated with the post
 * @param {Object} props.featuredImage  The featured image properties
 * @param {string} props.featuredImage.created_at Date featured image was created
 * @param {string} props.featuredImage.src  Url to image asset
 * @param {string} props.link   Link to the post
 */

export function FeaturedFeedItem (props) {
  const {
    id,
    title,
    author,
    featuredImage,
    link,
    category,
    breakpoint
  } = props;

  const optionalDash = category && author ? '—' : '';

  return (
    <div
      id={ `post-${id}` }
      className="feeditem--featured theme--dark typ--center layout--flex"
      style={ { backgroundImage: `url(${featuredImage.src })` } }
    >
      <div className="feeditem--featured__featuredimg" />
      <div className="gridspacer col-2" />
      <div className="max-width" style={ { zIndex: 2, margin: 'auto', paddingTop: setClass({ default: '9rem' }, breakpoint) } }>
        <Builder>
          <div className="feeditem--featured__meta typ--bold typ--xsm typ--caps mb2">
            { category &&
              <span className="meta-tags">
                { linkifyCategory(category) } { optionalDash }
              </span>
            }
            { author &&
              <span className="feeditem__author">
                &nbsp;By { linkifyAuthor(author) }
              </span>
            }
          </div>
          <h1
            className="typ--heading feeditem__title col-center"
            style={ { maxWidth: setClass({ default: '85rem', tabletSm: '50rem' }, breakpoint) } }
          >
            <Link to={ link }>
              {title}
            </Link>
          </h1>
          <ArrowButton
            style={ { display: 'inline-block' } }
            classes="mt5 btn--ghost"
            label="Read more"
            routeTo={ link }
          />
        </Builder>
      </div>
      <div className="gridspacer col-2" />
    </div>
  );
}

const { number, string, object } = React.PropTypes;
FeaturedFeedItem.propTypes = {
  id: number,
  title: string,
  author: string,
  featuredImage: object,
  link: string.isRequired,
  category: string,
  breakpoint: object
};

const mapStateToProps = state => ({
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(FeaturedFeedItem);
