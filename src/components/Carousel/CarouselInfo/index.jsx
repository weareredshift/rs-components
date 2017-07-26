import React from 'react';
import { setClass, breakpointIsLessThan } from 'utils/responsiveHelpers';
import { connect } from 'react-redux';
import './CarouselInfo.scss';

/**
 * Renders the info block at the bottom of the CarouselWithArrowControls
 *
 * @param {Object} props
 * @param {Object} props.breakpoint             Object describing current breakpoint state
 * @param {string} props.room                   String defining the room this photo depicts
 * @param {string} props.activity               String defining the activity this photo depics
 * @param {Array} props.fixtureTypes[]          Arrow of strings defining the fixture types in this room
 * @param {Object[]} props.products[]           Arrow of objects defining the products associated with this setup
 * @param {string} props.products[].label       String defining this products name
 * @param {string} props.products[].img         Src string defining the path to the product image
 * @param {number} props.products[].qty         A number defining how many of this product for this layout
 * @returns {React.Component}
 */
export function CarouselInfo (props) {
  const { breakpoint, room, activity, fixtureTypes, products } = props;

  return (
    <div className="carousel__infowrapper cf">
      <div className={ 'theme--lightmedium carousel__info col-center '.concat(
        setClass({ default: 'col-15', desktopSm: 'col-17', mobileLg: 'mcol-6' }, breakpoint)
      ) }>
        <div>
          <h3 className={ 'typ--heading typ--dark-gray typ--t1 '.concat(
            setClass({
              mobileLg: 'mcol-3 typ--center',
              mobileMd: 'mcol-3 typ--left',
              mobileXsm: 'mcol-6 typ--center mb1' }, breakpoint)) }
          >
            { room }
          </h3>
          <p className={ 'typ--caps typ--xsm '.concat(
            setClass({
              mobileLg: 'mcol-3 typ--center typ--bold',
              mobileMd: 'mcol-3 typ--right typ--bold',
              mobileXsm: 'mcol-6 typ--center typ--bold' }, breakpoint)
          ) }>
            <span className="icon-cocktail" />
            { activity }
          </p>
        </div>

        { breakpointIsLessThan('mobileLg', breakpoint.size) && <div className="keyline my2" /> }

        <div className={
          setClass({ default: 'layout--flex', mobileLg: 'mcol-4 col-center typ--center layout--flex-center' }, breakpoint)
        }>
          { products.map((prod, index) => (
            <div key={ index } className={ 'layout--flex '.concat(
              setClass({ default: 'mr4', tabletMd: 'mr2' }, breakpoint)
            ) }>
              <img src={ prod.img } alt={ prod.label } />
              <span className="typ--t2 pl1">{ `x${prod.qty}` }</span>
            </div>
          )) }
        </div>

        { breakpointIsLessThan('mobileLg', breakpoint.size) && <div className="keyline my2" /> }

        <div
          className={ setClass({ mobileLg: 'typ--center' }, breakpoint) }
          style={ { maxWidth: setClass({ tabletLg: '16rem', mobileLg: 'none' }, breakpoint) } }
        >
          <h6 className={ 'typ--bold typ--dark-gray '.concat(
            setClass({ default: 'typ--default', tabletSm: 'typ--t3' }, breakpoint)
          ) }>Types of light fixtures:</h6>

          <p className={ setClass({ tabletSm: 'typ--t3' }, breakpoint) }>
            { fixtureTypes.map((fixture, index) => (
              <span key={ index }>{ `${fixture}${index < fixtureTypes.length - 1 ? ', ' : ''}` }</span>
            )) }
          </p>
        </div>
      </div>
    </div>
  );
}

const { object, string, array } = React.PropTypes;
CarouselInfo.propTypes = {
  breakpoint: object,
  room: string,
  activity: string,
  fixtureTypes: array,
  products: array
};

const mapStateToProps = state => ({
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(CarouselInfo);
