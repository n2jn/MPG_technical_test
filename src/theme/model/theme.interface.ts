export interface ThemeTypography {
  fontFamily: string;
  fontSize: number;
}

export interface Theme {
  palette: {
    mode: string;
    primary: string;
    secondary: string;
    neutral: {
      dark: string;
      main: string;
      light: string;
    };
    background: string;
    card: string;
    text: string;
  };

  typography: {
    fontFamily: string;
    fontSize: number;
    h1: ThemeTypography;
    h2: ThemeTypography;
    h3: ThemeTypography;
    h4: ThemeTypography;
    h5: ThemeTypography;
    h6: ThemeTypography;
  };
}

export interface ColorShades {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ColorTokens {
  grey: ColorShades;
  primary: ColorShades;
  greenAccent: ColorShades;
  redAccent: ColorShades;
  blueAccent: ColorShades;
}
