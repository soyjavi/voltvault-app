import { C } from '../../../common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  const { props } = component;
  const isSignup = store.pin === undefined;
  let hash;

  component.setState({ busy: true });
  if (isSignup) {
    hash = await store.getHash(pin);
    await store.onSync();
  }
  navigation.navigate(SCREEN.DASHBOARD, undefined, props.navigation);

  if (!isSignup) {
    hash = await store.getHash(pin);
    store.onSync();
  }

  store.onSync();
  component.setState({ busy: false, pin: hash ? pin : '' });
};
