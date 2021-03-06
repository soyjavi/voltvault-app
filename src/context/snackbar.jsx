import PropTypes from 'prop-types';
import React, { useContext, useReducer, createContext } from 'react';
import { THEME } from 'reactor/common';
import { Snackbar } from 'reactor/components';

import { C } from '@common';

const KEY = `${C.NAME}:context:snackbar`;
const SnackBarContext = createContext(KEY);
const { COLOR, ICON } = THEME;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action;

    case 'HIDE':
      return { ...state, caption: undefined, type: 'HIDE' };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SnackBarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { color: undefined, caption: undefined });

  const events = {
    error: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.ERROR }),
    success: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.BRAND }),
    warning: (caption) => dispatch({ type: 'SHOW', caption, color: COLOR.CTA }),
  };

  return (
    <SnackBarContext.Provider value={events}>
      {children}
      <Snackbar
        {...state}
        family={ICON.FAMILY}
        position="top"
        visible={state.type === 'SHOW'}
        onClose={() => dispatch({ type: 'HIDE' })}
      />
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useSnackBar = () => useContext(SnackBarContext);

export { SnackBarProvider, useSnackBar };
