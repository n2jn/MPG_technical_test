import {useContext, useMemo} from 'react';
import {ThemeContext} from '~theme/ThemeProvider';
import {tokens} from '~theme/theme';

const useTheme = () => {
  const {theme, changeTheme} = useContext(ThemeContext);
  const colors = useMemo(() => tokens(theme.palette.mode), [theme]);

  return [theme, colors, changeTheme] as const;
};

export default useTheme;
