import { useAtom, useAtomValue } from 'jotai';
import { themeAtom, themeModeAtom } from '@/models/global';
import { useEffect } from 'react';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  return {
    themeMode,
    setThemeMode,
  };
};
