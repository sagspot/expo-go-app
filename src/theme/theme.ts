import { extendTheme } from 'native-base';
import components from './components';
import foundations from './foundations';

const theme = extendTheme({
  ...foundations,
  components,
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default theme;
