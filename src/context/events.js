import { func, node } from 'prop-types';
import React, { PureComponent, createContext } from 'react';
import { NetInfo } from 'react-native';

import { C } from '../common';

const { Provider, Consumer: ConsumerEvents } = createContext(`${C.NAME}:context:events`);

class ProviderEvents extends PureComponent {
  static propTypes = {
    children: node,
    getFingerprintAsync: func,
    getLocationAsync: func,
  };

  static defaultProps = {
    children: undefined,
    getFingerprintAsync: undefined,
    getLocationAsync: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { isConnected: false };
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then((isConnected) => this.setState({ isConnected }));
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => this.setState({ isConnected }));
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange');
  }

  render() {
    const { props: { children, ...props }, state } = this;

    return (
      <Provider value={{ ...state, ...props }}>
        { children }
      </Provider>
    );
  }
}

export { ConsumerEvents, ProviderEvents };
