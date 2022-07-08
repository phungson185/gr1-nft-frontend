import { LocalizationProvider } from '@mui/lab';
import { default as DateAdapter } from '@mui/lab/AdapterLuxon';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';

export const appTheme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        size: 'medium',
        disableElevation: true,
      },
      styleOverrides: {
        sizeLarge: { minHeight: 48, minWidth: 48, fontSize: 18 },
        sizeMedium: { minHeight: 40, minWidth: 40, paddingTop: 8 },
        sizeSmall: { minHeight: 32, minWidth: 32 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#F14D5D15',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderWidth: 1,
            boxShadow: '0px 0px 4px 0px #2755FF',
            borderColor: '#2755FFA0',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          borderRadius: 16,
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 40,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Josefin Sans',
    button: { fontWeight: 600, textTransform: 'none' },
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontSize: 20, fontWeight: 400 },
    subtitle2: { fontSize: 18, fontWeight: 400 },
  },
  palette: {
    primary: {
      main: '#F30106',
    },
    secondary: {
      main: '#2755FF',
    },
    info: {
      dark: '#0A1831',
      main: '#162D55',
    },
  },
});

const Theme = ({ children }: any) => {
  return (
    <ThemeProvider theme={responsiveFontSizes(appTheme)}>
      <LocalizationProvider dateAdapter={DateAdapter}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
};

export default Theme;
