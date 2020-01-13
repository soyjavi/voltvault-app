const FAMILY = 'font-family';
const FAMILY_BOLD = 'font-family-bold';

export default {
  COLOR: {
    BACKGROUND: '#000',
    BACKGROUND_INPUT: '#202020',
    BACKGROUND_OPACITY: 'rgba(16, 16, 16, 0.85)',
    BASE: '#202020',
    TEXT: '#ffffff',
    TEXT_CONTRAST: '#111',
    TEXT_LIGHTEN: '#808080',

    PRIMARY: '#ffffff',
    ACCENT: '#FFC700', // ACCENT: '#7966FF',
    ERROR: '#E9305C',

    EXPENSE: '#FF3986',
    INCOME: '#43e97b', // INCOME: '#24F2AD',
    TRANSFER: '#7218FF', // TRANSFER: '#4066EA',
    LOCATION: '#2F9BFF', // LOCATION: '#A6FE01',

    BTC: '#f4b659',
    EUR: '#0251b5',
    USD: '#d90122',
    XAU: '#FFD700',
    XAG: '#c0c0c0',
  },

  FONT: {
    FAMILY,
    FAMILY_BOLD,

    DEFAULT: {
      fontFamily: FAMILY,
    },
    HEADLINE: {
      fontFamily: FAMILY_BOLD,
      letterSpacing: -0.75,
    },
    SUBTITLE: {
      fontFamily: FAMILY_BOLD,
      letterSpacing: -0.5,
    },
    BODY: {
      fontSize: 14,
      letterSpacing: -0.5,
      lineHeight: 14 * 1.5,
    },
    CAPTION: {
      fontSize: 11,
      letterSpacing: -0.1,
    },
    BOLD: {
      fontFamily: FAMILY_BOLD,
      fontWeight: '400',
    },
    BUTTON: {
      fontSize: 16,
      fontFamily: FAMILY_BOLD,
      fontWeight: 'normal',
    },
    BUTTON_SMALL: {
      lineHeight: 15,
      fontSize: 12,
      fontFamily: FAMILY_BOLD,
      letterSpacing: -0.1,
    },
    INPUT: {
      fontFamily: FAMILY_BOLD,
    },
  },
};
