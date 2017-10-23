import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveTooltip } from './actions';

/**
 * Renders a tooltip component
 * @param {Object} props                    React props object
 * @param {string} props.id                 String defining tooltips unique id
 * @param {Object} props.triggerContent     React DOM element wrapped by the trigger
 * @param {Object} props.children           React element wrapped by tooltip component, revealed when tooltip is active
 * @param {function} props.dispatch         Redux dispatch function
 * @param {string} props.openTooltipID      Unique string identifier for the currently active tooltip.
 *                                          null if no tooltip is active.
 * @returns {React.Component}               Returns a react component
 */
export function Tooltip (props) {
  const { id, color, children, dispatch, openTooltipID } = props;

  const toggleTooltip = () => {
    const nextTooltip = openTooltipID === id ? null : id;
    dispatch(setActiveTooltip(nextTooltip));
  };

  return (
    <div className="tooltip">
      <div className={ `tooltip__trigger` } onClick={ () => toggleTooltip() }>
        { triggerContent && triggerContent }
      </div>
      { id === openTooltipID && <div className="tooltip__content">{ children && children }</div> }
    </div>
  );
}

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  triggerContent: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func,
  openTooltipID: PropTypes.bool
};

const mapStateToProps = state => ({
  openTooltipID: state.openTooltipID
});

export default connect(mapStateToProps)(Tooltip);
