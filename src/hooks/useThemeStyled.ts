import {ColorTokens, Theme} from '~theme/model/theme.interface';
import useTheme from './useTheme';

const useThemedStyled = <LocalStyle>(
  styles: (theme: Theme, colors: ColorTokens) => LocalStyle,
): LocalStyle => {
  const [theme, colors] = useTheme();
  return styles(theme, colors);
};

export default useThemedStyled;
