import React from 'react';
import { string, bool, object, element, array, oneOfType, func } from 'prop-types';
import { connect } from 'react-redux';
import { setActiveTooltip } from './actions';

/**
 * Renders a tooltip component
 * @param {Object} props                    React props object
 * @param {string} props.className          Optional prop to pass to tooltip
 * @param {string} props.id                 String defining tooltips unique id
 * @param {Object} props.triggerContent     React DOM element wrapped by the trigger
 * @param {bool} props.triggerOnHover       Determines if trigger is triggered on hover or not. If not, triggered on click.
 * @param {Object} props.children           React element wrapped by tooltip component, revealed when tooltip is active
 * @param {function} props.dispatch         Redux dispatch function
 * @param {string} props.openTooltipID      Unique string identifier for the currently active tooltip.
 *                                          null if no tooltip is active.
 * @returns {React.Component}               Returns a react component
 */
export function TooltipUC (props) {
  const { id, children, dispatch, openTooltipID, triggerContent, className, triggerOnHover } = props;

  const toggleTooltip = () => {
    const nextTooltip = openTooltipID === id ? null : id;
    dispatch(setActiveTooltip(nextTooltip));
  };

  return (
    <div className={ `tooltip ${className ? className : ''}` }>
      <div
        className={ `tooltip__trigger` }
        onClick={ () => !triggerOnHover && toggleTooltip() }
        onMouseEnter={ () => triggerOnHover && toggleTooltip() }
        onMouseLeave={ () => triggerOnHover && toggleTooltip() }
      >
        { triggerContent && triggerContent }
      </div>
      { id === openTooltipID && <div className="tooltip__content">{ children && children }</div> }
    </div>
  );
}

TooltipUC.propTypes = {
  id: string.isRequired,
  triggerOnHover: bool,
  triggerContent: object,
  children: oneOfType([element, array]),
  dispatch: func,
  openTooltipID: string,
  className: string
};

const mapStateToProps = state => ({
  openTooltipID: state.openTooltipID
});

export default connect(mapStateToProps)(TooltipUC);
