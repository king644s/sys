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
  // Mirrors docs/typography.md and the classes in app/globals.css.
  typography: {
    families: {
      display: '"Inter Tight", "Inter", system-ui, sans-serif',
      sans: '"Inter", system-ui, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace'
    },
    sizes: {
      display: 'clamp(2.5rem, 6vw, 4.5rem)',   // 40 → 72px  .display-1
      h1: 'clamp(2rem, 4.5vw, 3.25rem)',        // 32 → 52px  .heading-1
      h2: 'clamp(1.75rem, 3.2vw, 2.5rem)',      // 28 → 40px  .heading-2
      h3: '20px',                               // .heading-3
      cardTitle: '18px',                        // .card-title
      stat: '28px',                             // .stat-value
      lead: '17px',                             // .lead
      body: '15px',                             // .body
      bodySm: '14px',                           // card body, table values
      meta: '13px',                             // helper text, captions
      label: '12px'                             // .eyebrow — absolute floor
    },
    lineHeights: {
      display: '1.02',
      h1: '1.06',
      h2: '1.1',
      h3: '1.25',
      cardTitle: '1.35',
      body: '1.65',
      label: '1.3'
    },
    letterSpacing: {
      display: '-0.035em',
      h1: '-0.03em',
      h2: '-0.025em',
      h3: '-0.015em',
      normal: '0em',
      label: '0.08em'
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
