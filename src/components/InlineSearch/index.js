import React from 'react';
import classnames from 'classnames';
import { string, arrayOf, node, shape, func } from 'prop-types';

/**
 * Searches through given options for relevant results, and presents first match inline.
 *
 * @param {Object} props
 * @param {string} props.className
 * @param {Object[]} props.options Array of option objects through which to search
 * @param {React.Component} props.options[].left Optional node (usually image) to display left of result
 * @param {React.Component} props.options[].right Optional node (usually image) to display right of result
 * @param {React.Component} props.options[].replacement Optional node (usually image) to display in place of result
 * @param {string} props.options[].name Name to search through
 */
export class InlineSearchUC extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '', focused: false };
  }

  foundText(find, regex) {
    const { cursor } = this.props;
    const { selected, focused } = this.state;

    const split = find.name.split(regex);

    const result = find.replacement
      ? find.replacement
      : (
        <span>
          { split[0] }
          <span className="inlinesearch__matching-text">{ split[1] }</span>
          { split.slice(2) }
        </span>
      );

    return (
      <span
        className={ classnames('inlinesearch__result inlinesearch__result--found', selected && 'inlinesearch__fake-results--selected') }
      >
        { find.left && <span className="inlinesearch__left">{ find.left }</span> }
        { result }
        { find.right && <span className="inlinesearch__right">{ find.right }</span> }
        { focused && cursor }
      </span>
    );
  }

  textWithoutMatch () {
    const { placeholder, cursor } = this.props;
    const { search, focused } = this.state;

    return (
      <span className="inlinesearch__result inlinesearch__result--empty">
        { search || focused ?
            search :
            <span className="inlinesearch__placeholder">{ placeholder }</span>
        }
        { focused && cursor }
      </span>
    );
  }

  focus() {
    if (this.el) { this.el.focus(); }
    this.setState({ focused: true });
  }

  handleKeyPress (item, key) {
    if (key === 'Enter') {
      item.onAction && item.onAction(item);
    }
  }

  render () {
    const { className, options } = this.props;
    const { search, focused } = this.state;

    const searchRegex = new RegExp('(' + search + ')', 'i');
    const firstFind = search.length > 0 && options.find(opt => opt.name.match(searchRegex));

    return (
      <div className={ classnames('inlinesearch rscomp', className) }>
        <input
          type="text"
          ref={ el => { this.el = el; } }
          className={ classnames('inlinesearch__input', focused && 'inlinesearch__input--focused') }
          onKeyPress={ e => { this.handleKeyPress(firstFind, e.key); } }
          value={ search }
          onChange={ e => { this.setState({ search: e.target.value }); } }
          onBlur={ () => { this.setState({ focused: false }); } }
        />
        <div
          className="inlinesearch__fake-input"
          onClick={ () => { this.focus(); } }
        >
          { firstFind
            ? this.foundText(firstFind, searchRegex)
            : this.textWithoutMatch()
          }
        </div>
      </div>
    );
  }
}

InlineSearchUC.propTypes = {
  className: string,
  options: arrayOf(shape({
    name: string.isRequired,
    left: node,
    right: node,
    replacement: node,
    onAction: func
  })),
  placeholder: string,
  cursor: node
};

InlineSearchUC.defaultProps = {
  cursor: <span className="inlinesearch__cursor">|</span>
};

export default InlineSearchUC;
