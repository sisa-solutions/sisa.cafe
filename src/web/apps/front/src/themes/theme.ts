import {
  Public_Sans as BodyFont,
  Quicksand as DisplayFont,
  Source_Code_Pro as CodeFont,
} from 'next/font/google';

import { extendTheme } from '@mui/joy/styles';

const bodyFont = BodyFont({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const displayFont = DisplayFont({
  weight: ['500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const codeFont = CodeFont({
  weight: ['500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const theme = extendTheme({
  fontFamily: {
    body: bodyFont.style.fontFamily,
    display: displayFont.style.fontFamily,
    code: codeFont.style.fontFamily,
  },
});

export default theme;
