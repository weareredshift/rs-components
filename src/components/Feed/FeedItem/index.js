import React from 'react';
import { Link } from 'react-router';
import ArrowButton from 'components/Buttons/ArrowButton';
import { ellipsisTitle, linkifyAuthor, linkifyCategory } from '../utils';
import { setClass } from 'utils/responsiveHelpers';
import { connect } from 'react-redux';
import Builder from 'components/Builder';

/**
 * Displays a single piece of feed content
 * @param {Object} props The props passed to the FeedItem
 * @param {number} props.postID  The post ID
 * @param {string} props.title   The post title
 * @param {string} props.author  The post author
 * @param {Array}  props.tags     An array of tag associated with the post
 * @param {Object} props.featuredImage  The featured image properties
 * @param {string} props.featuredImage.created_at Date featured image was created
 * @param {string} props.featuredImage.src  Url to image asset
 * @param {string} props.link   Where to link on click
 * @param {string} props.cta    Text of button on feed item, defaults to Read more
 */

export function FeedItem (props) {
  const {
    title,
    author,
    featuredImage,
    link,
    category,
    layout,
    cta,
    overlay,
    description
  } = props;

  const optionalDash = category && author ? '—' : '';
  const { breakpoint } = props;

  return (
    <div className={ `feeditem__wrapper feeditem--${layout}` }>
      <Builder>
        <div className="feeditem">
          <Link to={ link }>
            { featuredImage
              ? <div className="feeditem__featuredimg" style={ { backgroundImage: `url(${featuredImage.src })` } } >
                { overlay }
              </div>
              : null
            }
          </Link>
          <div className="feeditem__copy">
            <div className={ 'feeditem__meta typ--caps typ--bold mb2 typ--dark-grey '.concat(
              setClass({
                default: 'typ--xsm',
                mobileLg: 'typ--xxsm'
              }, breakpoint)
            ) } >
              { category &&
                <span className="typ--dark-grey meta-tags">
                  { linkifyCategory(category) } { optionalDash }
                </span>
              }
              { author &&
                <span className="typ--dark-grey feeditem__author">
                  &nbsp;By { linkifyAuthor(author) }
                </span>
              }
            </div>
            <Link to={ link } className="feeditem__permalink">
              <h3 className={ 'typ--heading feeditem__title '.concat(
                setClass({
                  default: 'typ--h3',
                  mobileLg: 'typ--h2'
                }, breakpoint)
              ) }>
                { ellipsisTitle(title, 45) }
              </h3>

              { description && <p className="typ--t2 my2 typ--medium-grey">{ description }</p> }

              <ArrowButton
                classes="mt5 btn--ghost"
                label={ cta || 'Read more' }
              />
            </Link>
          </div>
        </div>
      </Builder>
    </div>
  );
}

const { string, object, node } = React.PropTypes;
FeedItem.propTypes = {
  title: string,
  author: string,
  featuredImage: object,
  link: string,
  category: string,
  layout: string,
  breakpoint: object,
  cta: string,
  overlay: node,
  description: string
};

FeedItem.defaultProps = {
  layout: 'column'
};

const mapStateToProps = state => ({
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(FeedItem);
