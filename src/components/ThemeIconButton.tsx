import { memo } from 'react';
import { Sun, SunMoon, Moon } from 'lucide-react';
import { useThemeUtils } from '@/utils/theme';
import type { ThemeMode } from '@/types/global';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/DropdownMenu';
import { Button } from '@/components/Button';

interface ThemeIconButtonProps {
  size?: 'default' | 'large';
}

export const ThemeIconButton = memo<ThemeIconButtonProps>((props) => {
  const { size = 'default' } = props;
  const { themeMode, setThemeMode } = useThemeUtils();

  const getThemeIcon = () => {
    const pixel = size === 'large' ? 22 : 20;
    if (themeMode === 'auto') {
      return <SunMoon style={{ width: pixel, height: pixel }} />;
    }
    if (themeMode === 'light') {
      return <Sun style={{ width: pixel, height: pixel }} />;
    }
    return <Moon style={{ width: pixel, height: pixel }} />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={themeMode}
          onValueChange={(value) => setThemeMode(value as ThemeMode)}
        >
          <DropdownMenuRadioItem value="light">浅色</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">深色</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="auto">跟随系统</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
