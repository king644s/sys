// SYSLight Design Tokens — React Theme Object
// Established July 2026

export const theme = {
  colors: {
    dark: {
      void: '#010101',
      voidDark: '#000000',
      surface: '#0D0C15',
      surfaceAlt: '#141321',
      surfaceHigh: '#1C1B2C',
      cream: '#E5E5E6',
      textDim: '#9B99BB',
      textGhost: '#7D7B9B',
      gold: '#6A67CC',
      goldLight: '#8F8DF0',
      goldMuted: '#413F8C',
      border: '#201F33',
      borderMid: '#2E2D4A',
      borderHigh: '#3C3A5E',
    },
    light: {
      void: '#FFFFFF',
      voidDark: '#F5F5F7',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F5F7',
      surfaceHigh: '#EBEBEF',
      cream: '#010101',
      textDim: '#4B4B5E',
      textGhost: '#767589',
      gold: '#4D4A9D',
      goldLight: '#6C69C1',
      goldMuted: '#333175',
      border: '#E5E5E6',
      borderMid: '#CCCCCC',
      borderHigh: '#B0AFCC',
    }
  },
  typography: {
    families: {
      serif: '"Cormorant Garamond", Georgia, serif',
      sans: '"DM Sans", sans-serif',
      mono: '"Space Mono", monospace'
    },
    sizes: {
      displayXxl: '96px',     // 6.0rem
      displayXl: '72px',      // 4.5rem
      displayLg: '60px',      // 3.75rem
      h1: '48px',             // 3.0rem
      h2: '40px',             // 2.5rem
      h2Sm: '28px',           // 1.75rem
      h3: '20px',             // 1.25rem
      h4: '18px',             // 1.125rem
      bodyLg: '16px',         // 1.0rem
      bodyMd: '14px',         // 0.875rem (primary body copy)
      bodySm: '13px',         // 0.8125rem
      caption: '12px',        // 0.75rem
      labelUi: '11px'         // 0.6875rem (absolute floor)
    },
    lineHeights: {
      display: '1.0',
      hero: '1.05',
      heading: '1.15',
      subheading: '1.3',
      body: '1.65',
      ui: '1.4',
      caption: '1.5',
      label: '1.3'
    },
    letterSpacing: {
      tight: '-0.025em',
      snug: '-0.01em',
      normal: '0em',
      label: '0.15em',
      overline: '0.25em',
      widest: '0.35em'
    }
  },
  spacing: {
    base: 8,
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px',
    20: '80px',
    28: '112px'
  },
  radius: {
    none: '0px',
    sm: '1px',
    md: '2px',
    lg: '4px',
    xl: '8px',
    xxl: '16px',
    full: '9999px'
  },
  elevation: {
    none: 'none',
    subtle: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    card: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
    hover: '0 12px 30px -10px rgba(77, 74, 157, 0.18)',
    lifted: '0 20px 48px -12px rgba(77, 74, 157, 0.28)',
    glow: '0 0 45px rgba(106, 103, 204, 0.15)'
  },
  opacity: {
    hoverImg: 0.70,
    activeImg: 0.95,
    overlay: 0.85,
    disabled: 0.50,
    muted: 0.60,
    ghost: 0.40
  },
  transitions: {
    duration: {
      fast: '200ms',
      standard: '300ms',
      medium: '500ms',
      luxury: '700ms'
    },
    easing: {
      luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }
  },
  icons: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
    hero: '40px'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px'
  },
  containers: {
    max: '1280px',
    wide: '1152px',
    default: '1024px',
    narrow: '896px',
    text: '672px',
    reading: '576px'
  },
  components: {
    buttons: {
      height: {
        sm: '36px',
        md: '44px',
        lg: '48px',
        xl: '56px'
      }
    },
    inputs: {
      height: {
        sm: '36px',
        md: '44px',
        lg: '52px'
      }
    },
    tables: {
      rowHeight: {
        compact: '36px',
        default: '44px',
        relaxed: '52px'
      }
    },
    cards: {
      padding: {
        xs: '12px',
        sm: '16px',
        md: '20px',
        lg: '24px',
        xl: '32px',
        xxl: '40px'
      }
    },
    sections: {
      paddingY: {
        xs: '32px',
        sm: '48px',
        md: '64px',
        lg: '80px',
        xl: '96px',
        xxl: '112px'
      }
    }
  }
};
