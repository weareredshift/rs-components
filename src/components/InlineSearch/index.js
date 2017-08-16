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
        <span>
          { beforeMatch }
          { matchNode }
          { afterMatch }
        </span>
      );

    return (
      <span
        className={ classnames('inlinesearch__result inlinesearch__result--found', selected && 'inlinesearch__result--selected') }
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
      <span className={ classnames('inlinesearch__result inlinesearch__result--empty', selected && 'inlinesearch__result--selected') }>
        <span className="inlinesearch__left" />
        { search || focused
            ? (<span>
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

  focus() {
    if (this.el) { this.el.focus(); }
    this.setState({ focused: true });
  }

  handleKeyPress (item, key) {
    const { cursorIndex, search } = this.state;

    const bound = (index) => Math.max(0, Math.min(search.length + 1, index));

    if (key === 'Enter' && item) {
      item.onAction && item.onAction(search);
      this.setState({ search: '', cursorIndex: 0 });
    } else if (key === 'ArrowLeft') {
      this.setState({ cursorIndex: bound(cursorIndex - 1) });
    } else if (key === 'Delete') {
      this.setState({ cursorIndex: bound(cursorIndex - 1) });
    } else if (key === 'Meta') {
      // Do nothing on Ctrl, Cmd, etc
      // TODO: Handle command-right, command-a etc
    } else {
      this.setState({ cursorIndex: bound(cursorIndex + 1) });
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
          onKeyDown={ e => { this.handleKeyPress(firstFind, e.key); } }
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
