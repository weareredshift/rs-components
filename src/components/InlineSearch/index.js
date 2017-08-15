import React from 'react';
import classnames from 'classnames';
import { string, arrayOf, node, shape } from 'prop-types';

export class InlineSearchUC extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  render () {
    const { className, options } = this.props;
    const { search, focused, selected } = this.state;

    const searchRegex = new RegExp('(' + search + ')', 'i');
    const firstFind = search.length > 0 && options.find(opt => opt.name.match(searchRegex));
    let preMatch, firstMatch, postMatch;

    if (firstFind) {
      const split = firstFind.name.split(searchRegex);
      preMatch = split[0];
      firstMatch = split[1];
      postMatch = split.slice(2);
    }

    return (
      <div className={ classnames('inlinesearch rscomp', className) }>
        <input
          type="text"
          ref={ el => { this.el = el; } }
          className="inlinesearch__input"
          onKeyPress={ e => { this.handleKeypress(e.target.value); } }
          value={ search }
          onChange={ e => { this.setState({ search: e.target.value }); } }
          onBlur={ () => { this.setState({ focused: false }); } }
        />
        <div
          className="inlinesearch__fake-input"
          onClick={ () => {
            this.setState({ focused: true });
            this.el.focus();
          } }
        >
          { firstFind
            ? (
              <span
                className={
                  'inlinesearch__fake-results'.concat(
                    selected && 'inlinesearch__fake-results--selected'
                  )
                }
              >
                { firstFind.image && <span className="inlinesearch__image">{ firstFind.image }</span> }
                { preMatch }
                <b>{ firstMatch }</b>
                { focused && <span className="inlinesearch__cursor">|</span> }
                { postMatch }
              </span>
            )
            : (
              <span>
                { search }
                { focused && <span className="inlinesearch__cursor">|</span> }
              </span>
            )
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
  }))
};

export default InlineSearchUC;
