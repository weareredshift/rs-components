import React from 'react';
import { Link } from 'react-router';
import { setClass } from 'utils/responsiveHelpers';
import { connect } from 'react-redux';

/**
 * Returns a commonly used arrow button used generally for call to action
 * routing.
 * @param {Object} props                 React props object
 * @param {string} [props.routeTo]       Route string that the button will navigate to
 * @param {string} props.classes         Optional additional classes that can be passed
 *                                       to the button
 * @param {string} props.label           String that will appear inside the button
 * @param {Function} props.onClick       Function called on click if no routeTo given
 * @returns {React.Component}            Returns react component
 */
export function ArrowButton (props) {
  const { routeTo, classes, label, onClick, breakpoint } = props;

  const linkHTML = () => {
    const route = typeof routeTo === 'string'
      ? routeTo
      : routeTo.pathname;

    const linkProps = {
      className: `btn btn--icon typ--caps typ--bold ${classes} `.concat(
        setClass({ default: 'typ--sm', mobileLg: 'typ--xxsm' }, breakpoint)
      ),
      onClick,
      children: [label, <span className="icon-longarrow-right" />]
    };

    return route.includes('http')
      ? <a { ...linkProps } href={ route } />
      : <Link to={ routeTo } { ...linkProps } />;
  };

  const spanHTML = () => (
    <span
      onClick={ onClick }
      className={ `btn btn--icon typ--caps typ--bold ${classes} `.concat(
        setClass({ default: 'typ--sm', mobileLg: 'typ--xxsm' }, breakpoint)
      ) }
    >
      { label }
      <span className="icon-longarrow-right" />
    </span>
  );

  return (
    routeTo ? linkHTML() : spanHTML()
  );
};

const { string, func, object, oneOfType } = React.PropTypes;
ArrowButton.propTypes = {
  routeTo: oneOfType([string, object]),
  classes: string,
  label: string,
  onClick: func,
  breakpoint: object
};

ArrowButton.defaultProps = {
  classes: 'btn--ghost',
  label: 'Arrow button',
  onClick: () => {}
};

const mapStateToProps = state => ({
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(ArrowButton);
