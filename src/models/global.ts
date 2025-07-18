import { atom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { ThemeMode, ThemeType } from '@/types/global';

export const themeModeAtom = atomWithStorage<ThemeMode>(
  'fake-theme-mode',
  'dark',
  undefined,
  {
    getOnInit: true,
  },
);

export const themeAtom = atom((get) => {
  const mode = get(themeModeAtom);
  if (mode === 'auto') {
    const systemTheme: ThemeType = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
      ? 'dark'
      : 'light';
    return systemTheme;
  }
  return mode;
});

export const useTheme = () => useAtomValue(themeAtom);

export const tokenAtom = atomWithStorage<string | undefined>(
  'token',
  undefined,
  undefined,
  { getOnInit: true },
);

export const appMenuWiderAtom = atomWithStorage<boolean>(
  'app-menu-wider',
  false,
  undefined,
  { getOnInit: true },
);
