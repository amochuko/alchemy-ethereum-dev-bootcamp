import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  colors: {
    // customize brand color
    brand: {
      primary: '#0f2d63',
      100: '#f7fafc',
      900: '#1a202c',
    },
  },
  fonts: {
    body: 'Roboto, system-ui, sanss-serif',
    heading: 'Georgia, serif',
    mono: 'menlo, monospace',
  },
  textStyles: {
    h1: {
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
  layerStyles: {
    base: {
      bg: 'gray.50',
      border: '2px solid',
      boderColor: 'gray.500',
    },
    selected: {
      bg: 'teal.500',
      color: 'teal.700',
      height: '200px',
      borderColor: 'orange.500',
    },
  },
  config,
});
