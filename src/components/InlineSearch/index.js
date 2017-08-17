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
    this.state = { search: '', focused: false, cursorIndex: 0 };
  }

  focus() {
    if (this.el) { this.el.focus(); }
    this.setState({ focused: true, selected: false });
  }

  handleKeyPress (item, key) {
    const { cursorIndex, search, metaKey } = this.state;

    const bound = (index) => Math.max(0, Math.min(search.length + 1, index));

    let newState = { selected: false, focused: true, cursorIndex: bound(cursorIndex + 1), metaKey: null };

    if (key === 'Enter' && item) {
      item.onAction && item.onAction(search);
      newState = Object.assign(newState, { search: '', cursorIndex: 0 });
    } else if (['ArrowLeft', 'Backspace'].includes(key)) {
      newState.cursorIndex = bound(cursorIndex - 1);
    } else if (['Shift', 'Meta', 'Control'].includes(key)) {
      newState = Object.assign(newState, { metaKey: key, cursorIndex });
    } else if (['Escape', 'Tab'].includes(key)) {
      newState.cursorIndex = cursorIndex;
    } else {
      if (metaKey === 'Meta') {
        if (key === 'a') {
          newState.selected = true;
        }
      } else {
        newState.cursorIndex = bound(cursorIndex + 1);
      }
    }

    this.setState(newState);
  }

  foundText(find, regex) {
    const { cursor } = this.props;
    const { selected, focused, cursorIndex, search } = this.state;

    const split = find.name.split(regex);
    const beforeMatch = split[0];
    const match = split[1];
    const afterMatch = split.slice(2).join('');
    const matchNode = (<span className="inlinesearch__matching-text">
      { match.slice(0, cursorIndex) }
      { focused ? cursor : null }
      { match.slice(cursorIndex) }
    </span>);

    const result = find.replacement
      ? find.replacement
      : (
        <span className="inlinesearch__result-text">
          { beforeMatch }
          <span className={ classnames('inlinesearch__search-text', selected && 'inlinesearch__search-text--selected') }>
            { matchNode }
          </span>
          { afterMatch }
        </span>
      );

    return (
      <span
        className={ classnames('inlinesearch__result inlinesearch__result--found') }
        onClick={ () => { find.onAction && find.onAction(search); } }
      >
        { find.left && <span className="inlinesearch__left">{ find.left }</span> }
        { result }
        { find.right && <span className="inlinesearch__right">{ find.right }</span> }
      </span>
    );
  }

  textWithoutMatch () {
    const { placeholder, cursor } = this.props;
    const { search, focused, selected, cursorIndex } = this.state;

    return (
      <span className="inlinesearch__result inlinesearch__result--empty">
        <span className="inlinesearch__left" />
        { search || focused
            ? (<span className={ classnames('inlinesearch__search-text', selected && 'inlinesearch__search-text--selected') }>
              { search.slice(0, cursorIndex) }
              { cursor }
              { search.slice(cursorIndex) }
            </span>)
            : <span className="inlinesearch__placeholder">{ placeholder }</span>
        }
        <span className="inlinesearch__right" />
      </span>
    );
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
          onKeyDown={ e => { this.handleKeyPress(firstFind, e.key); } }
          onKeyUp={ () => { this.setState({ metaKey: null }); } }
          onChange={ e => { this.setState({ search: e.target.value }); } }
          value={ search }
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
