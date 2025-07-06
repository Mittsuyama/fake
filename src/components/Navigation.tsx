import { useAtom } from 'jotai';
import cls from 'classnames';
import { memo, type PropsWithChildren, type ReactEventHandler } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useTheme } from '@/utils/theme';
import { WELCOME_MAX_WIDTH } from '@/constants/global';
import { BrandLogo } from '@/components/BrandLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/DropdownMenu';
import type { ThemeMode } from '@/types/global';

interface NavItemButtonProps {
  onClick?: ReactEventHandler<HTMLDivElement>;
}

const NavItemButton = (props: PropsWithChildren<NavItemButtonProps>) => {
  const { onClick, children, ...rest } = props;
  return (
    <div
      {...rest}
      className="text-sm hover:bg-muted-foreground/10 py-2 px-4 rounded-full cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface NavigationProps {
  className?: string;
}

export const Navigation = memo<NavigationProps>((props) => {
  const { className } = props;
  const history = useHistory();
  const { pathname } = useLocation();
  const { themeMode, setThemeMode } = useTheme();

  return (
    <div
      style={{
        width: `min(${WELCOME_MAX_WIDTH}px, 90%)`,
        left: '50%',
        transform: 'translateX(-50%)',
        backdropFilter: 'blur(20px)',
      }}
      className={cls(
        'absolute top-3 flex items-center justify-between px-6 py-2 rounded-full bg-muted-foreground/5 border border-border',
        className,
      )}
    >
      {/* FAKE LOGO */}
      <BrandLogo showName />

      {/* NAVIGATION */}
      <div className="flex items-center">
        <NavItemButton>法律 AI 顾问团</NavItemButton>

        <NavItemButton>法律咨询</NavItemButton>
        <NavItemButton>合同审查</NavItemButton>
        <NavItemButton>关于我们</NavItemButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <NavItemButton>切换主题</NavItemButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={themeMode}
              onValueChange={(value) => setThemeMode(value as ThemeMode)}
            >
              <DropdownMenuRadioItem value="light">浅色</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">深色</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="auto">
                跟随系统
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ACTION BUTTON */}
      <div>登录/注册</div>
    </div>
  );
});
