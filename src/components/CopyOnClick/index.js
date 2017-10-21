import React from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';

export class CopyOnClickUC extends React.Component {
  constructor (props) {
    super(props);
    this.state = { success: false, failure: false };
  }

  copy (event) {
    const textarea = event.target;
    textarea.select();

    try {
      document.execCommand('copy');
      this.setState({ success: true });
    } catch (err) {
      this.setState({ failure: true });
    }
  }

  render () {
    const { text, successText, failureText, className } = this.props;
    const { success, failure } = this.state;

    return (
      <div className={ classnames('copy-on-click', className) }>
        <textarea onClick={ e => this.copy(e) } className="copy-on-click__text">{ text }</textarea>
        <div className={ classnames('copy-on-click__success-text', success && 'copy-on-click__success-text--successful') }>
          { successText }
        </div>
        <div className={ classnames('copy-on-click__failure-text', failure && 'copy-on-click__failure-text--failed') }>
          { failureText }
        </div>
      </div>
    );
  }
}

CopyOnClickUC.propTypes = {
  text: string.isRequired,
  successText: string,
  failureText: string,
  className: string
};

export default CopyOnClickUC;
