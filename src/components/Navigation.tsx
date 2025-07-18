import cls from 'classnames';
import { memo, type PropsWithChildren, type ReactEventHandler } from 'react';

import { WELCOME_MAX_WIDTH } from '@/constants/global';
import { BrandLogo } from '@/components/BrandLogo';
import { ThemeIconButton } from './ThemeIconButton';
import { Button } from './Button';
import { jumpInMpa } from '@/utils/jump';

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
      </div>

      <div className="flex items-center">
        <ThemeIconButton />
        <Button
          onClick={() => {
            jumpInMpa('/login');
          }}
          variant="link"
        >
          登录/注册
        </Button>
      </div>
    </div>
  );
});
