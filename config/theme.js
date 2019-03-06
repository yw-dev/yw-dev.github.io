export const colors = {
  white: {
    base: '#fff',
    light: '#FFFFFF',
    grey: '#cecece',
    dark: '#a0afd7',
    backlight: '#F8FAFC',
    backgrey: '#EEEEEE',
  },
  black: {
    base: '#333438',
    light: '#4b4e57',
    blue: '#2e3246',
  },
  label:{
    green: '#00a67c',
    yellow: '#ffa94d',
    orange: '#FF7256',
    blue: '#037EE2',
  },
  primary: {
    base: '#3498db',
    light: '#3e5fbc',
    dark: '#284187',
  },
  background: {
    light: '#3e5fbc',
    dark: '#284187',
  },
  card: {
    base: '#1D2936',
    tint: '#232F3B',
    light: '#3E4853',
    dark: '#20232A',
  },
  hot:{
    red: '#EE4000',
    light: '#D9534F',
    green: '#71C671',
    yellow: '#ffa94d',
    blue: '#7EC0EE',
    orange: '#FF7256',
  },
  linearColor:{
    navbarbg: 'linear-gradient(to bottom,#1D2936,#20232A)',
    bodybg: 'linear-gradient(to right,#3E4853, #3E4853)',
    lightbg: 'linear-gradient(to right,#B3B7BB,#B3B7BB)',
    lighyellow: 'linear-gradient(to right,#DCDCDC,#DCDCDC)',
  },
};

export const shadow = {
  card: '0 20px 30px rgba(0, 0, 0, 0.1)',
  image: '0 15px 25px rgba(0, 0, 0, 0.1)',
  suggestion: '0 -5px 30px rgba(0,0,0,0.2)',
  footer: '0 -3px 16px rgba(0,0,0,0.5)',
  feature: {
    big: {
      default: '0 40px 40px rgba(0, 0, 0, 0.25)',
      hover: '0 50px 50px rgba(0, 0, 0, 0.1)',
    },
    small: {
      default: '0 10px 15px rgba(0, 0, 0, 0.25)',
      hover: '0 40px 45px rgba(0, 0, 0, 0.1)',
      little: '0 0 5px rgba(0,0,0, 0.1), 0 5px 20px -8px rgba(0,0,0, 0.1)',
      l_little: '0 0 5px rgba(0,0,0, 0.06), 0 1px 5px -5px rgba(0,0,0, 0.06)',
    },
    title: {
      bottom: '0 1px 0 0 rgba(0,0,0, 0.05)',
      top: '-5px -10px 5px -10px rgba(0,0,0, 0.1)',
      left: '-5px -10px 5px -10px rgba(0,0,0, 0.1)',
      right: '1px 0 0 0 rgba(0,0,0, 0.05)',
    }
  },
  text: {
    small: '0 5px 10px rgba(0, 0, 0, 0.25)',
    big: '0 15px 20px rgba(0, 0, 0, 0.13)',
  },
};

export const border = {
  lowlight: 'solid 1px rgba(89,98,107, 0.5)',
  posts: 'solid 1px rgba(255,255,255, 0.2)',
  color: '#727980',
};

export const backgroundImage = {
  image: {
    normal: 'url(' + 'static/logo/header.png' + ')',
  },
}

export const gradient = {
  // eslint-disable-next-line
  leftToRight: `linear-gradient(-45deg, ${colors.background.light} 0%, ${colors.background.dark} 100%)`,
  // eslint-disable-next-line
  rightToLeft: `linear-gradient(45deg, ${colors.background.light} 0%, ${colors.background.dark} 100%)`,
};

export const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
};

export const theme = {
  colors,
  gradient,
  backgroundImage,
  shadow,
  border,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    hd: '1080px',
    l: '1200px',
    vl: '1366px',
  },
  fontFamily: {
    // eslint-disable-next-line
    body: `Open Sans,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    // eslint-disable-next-line
    heading: `Candal, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  layout: {
    article: '46rem',
    base: '70rem',
    big: '83.33333rem',
  },
  borderRadius: {
    default: '0.4rem',
    round: '100rem',
  },
  transitions: {
    default: {
      duration: transition.duration,
      timing: transition.easeInOutCubic,
      transition: `all ${transition.duration} ${transition.easeInOutCubic}`,
    },
    boom: {
      duration: transition.duration,
      timing: transition.easeOutBack,
      transition: `all ${transition.duration} ${transition.easeOutBack}`,
    },
    headroom: {
      transition: 'all 0.25s ease-in-out',
    },
  },
};

export default theme;
