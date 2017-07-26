import React from 'react';
import ReactDOM from 'react-dom';
import SlideToggle from 'components/Animators/SlideToggle';
import mojs from 'mo-js';
import './Expandable.scss';

/**
 * Renders a header button that expands content prop on click
 *
 * @extends React.Component
 * @param {Object} props                    React properties argument
 * @param {Object} props.children           Children is the content that is revealed on expand
 * @param {string} [props.type]             String defining the type, passed to component as a class for unique styling
 * @param {string} [props.headingClasses]   Optional classes passed to heading element
 * @returns {React.Component}               Returns a react component
 */
export class Expandable extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
      animationInProgress: false
    };

    this.duration = 600;
  }

  componentDidUpdate (prevProps, prevState) {
    const { open } = this.state;
    const { type } = this.props;

    // unique heading animation called for spec type expandables
    if (type === 'specs') { if (open !== prevState.open) { this.toggleAnimation(prevState); } }
  }

  toggleAnimation (prevState) {
    const { open, animationInProgress } = this.state;
    const heading = ReactDOM.findDOMNode(this.refs.heading);

    if (open && animationInProgress) {
      // if toggled open during close animation
      this.animate.replay();
      return false;
    } else if (!open && animationInProgress) {
      // if toggled closed during open animation
      this.animate.replayBackward();
      return false;
    }

    this.animate = new mojs.Tween({
      duration: this.duration,
      easing: 'quint.out',
      backwardEasing: 'quint.in',
      onUpdate: progress => {
        if (heading && heading.style) {
          heading.style.transform = `translateY(${progress * 30}px)`;
        }
      },
      onPlaybackStart: () => this.setState({ animationInProgress: true }),
      onPlaybackComplete: () => this.setState({ animationInProgress: false })
    });

    // if changing from closed to open, play normally
    if (open && !prevState.open) this.animate.play();
    // if changing from open to closed, play in reverse
    if (!open && prevState.open) this.animate.playBackward();
  }

  render () {
    const { children, heading, type, headingClasses } = this.props;
    const { open } = this.state;

    return (
      <div className={ `expandable ${type} ${open ? 'is-open' : ''}` }>
        <button className={ `expandable__trigger ${type === 'specs' ? 'row' : ''}` } onClick={ () => this.setState({ open: !open }) }>
          <span ref="heading" className={ `expandable__heading ${headingClasses}` }>{ heading }</span>
          <span className="icon-arrow-down" />
        </button>
        <SlideToggle classes="expandable__content" open={ open } duration={ this.duration }>
          { children }
        </SlideToggle>
      </div>
    );
  }
}

Expandable.propTypes = {
  children: React.PropTypes.node.isRequired,
  heading: React.PropTypes.string,
  type: React.PropTypes.string,
  headingClasses: React.PropTypes.string
};

Expandable.defaultProps = {
  heading: 'Heading',
  type: 'specs',
  headingClasses: 'typ--default'
};

export default Expandable;
