import React from 'react';
import classnames from 'classnames';
import { string, arrayOf, node, shape } from 'prop-types';

export class InlineSearchUC extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '', focused: false };
  }

  foundText(find, regex) {
    const { selected, focused } = this.state;

    const split = find.name.split(regex);

    return (
      <span
        className={ classnames('inlinesearch__result', selected && 'inlinesearch__fake-results--selected') }
      >
        { find.image && <span className="inlinesearch__image">{ find.image }</span> }
        { split[0] }
        <span className="inlinesearch__matching-text">{ split[1] }</span>
        { split.slice(2) }
        { !split[2] && focused && <span className="inlinesearch__cursor">|</span> }
      </span>
    );
  }

  textWithoutMatch () {
    const { placeholder } = this.props;
    const { search, focused } = this.state;

    return (
      <span className="inlinesearch__noresult">
        { search || focused ?
            search :
            <span className="inlinesearch__placeholder">{ placeholder }</span>
        }
        { focused && <span className="inlinesearch__cursor">|</span> }
      </span>
    );
  }

  focus() {
    if (this.el) { this.el.focus(); }
    this.setState({ focused: true });
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
          onKeyPress={ e => { this.handleKeypress(e.target.value); } }
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
    name: string,
    image: node
  })),
  placeholder: string
};

export default InlineSearchUC;
