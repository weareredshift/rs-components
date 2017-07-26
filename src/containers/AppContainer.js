import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

function handleUpdate () {
  let { action } = this.state.location;

  // Flag passed in object-form of react-router `to` argument, ie:
  // { to: '/somePath', state: { doNotScrollToTop: true } }
  const instructedNotToScroll = this.state.location.state &&
        this.state.location.state.doNotScrollToTop;

  if (action === 'PUSH' && !instructedNotToScroll) {
    window.scrollTo(0, 0);
  }
}

class AppContainer extends Component {
  componentDidMount () {
    const rootNode = document.querySelector('#root');
    setTimeout(() => { rootNode.style.opacity = 1; }, 100);
  }

  static propTypes = {
    routes: PropTypes.array.isRequired,
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={ store }>
        <Router
          history={ browserHistory }
          children={ routes }
          onUpdate={ handleUpdate }
        />
      </Provider>
    );
  }
}

export default AppContainer;
