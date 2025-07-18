import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useRef, useState, type ComponentType, type ReactNode } from 'react';
import cls from 'classnames';
import { useAtom, useSetAtom } from 'jotai';
import { useMemoizedFn } from 'ahooks';
import {
  Loader2Icon,
  ArrowRightToLine,
  ArrowLeftToLine,
  ScanText,
  MessageCircle,
  UsersRound,
  CircleArrowOutUpRight,
  House,
} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/AlertDialog';
import { useCheckAuth } from '@/utils/use-check-auth';
import { ContractReview } from '@/pages/ContractReview';
import { appMenuWiderAtom, tokenAtom, useTheme } from '@/models/global';
import { Button } from '@/components/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip';
import { BrandLogo, BrandName } from '@/components/BrandLogo';
import { ThemeIconButton } from '@/components/ThemeIconButton';

const MENU_ICON_SIZE = 20;

const MENUS: Array<{
  title: string;
  icon: ReactNode;
  pathname: string;
  component: ComponentType<any>;
}> = [
  {
    title: '合同审查',
    icon: (
      <ScanText style={{ width: MENU_ICON_SIZE, height: MENU_ICON_SIZE }} />
    ),
    pathname: 'review',
    component: ContractReview,
  },
  {
    title: '法律咨询',
    icon: (
      <MessageCircle
        style={{ width: MENU_ICON_SIZE, height: MENU_ICON_SIZE }}
      />
    ),
    pathname: 'consult',
    component: () => null,
  },
  {
    title: '顾问团',
    icon: (
      <UsersRound style={{ width: MENU_ICON_SIZE, height: MENU_ICON_SIZE }} />
    ),
    pathname: 'group',
    component: () => null,
  },
];

const genPathname = (path: string) => `/app/${path}`;

export const App = () => {
  const init = useCheckAuth();
  const history = useHistory();
  const { pathname } = useLocation();
  const [wider, setWider] = useAtom(appMenuWiderAtom);
  const [menuTextDisplay, setMenuTextDisplay] = useState(true);
  const [menuTextOpacity, setMenuTextOpacity] = useState(wider ? 1 : 0);
  const menuTextDisplayTimeoutRef = useRef(0);

  const onWiderToggle = useMemoizedFn(() => {
    const w = wider;
    setWider(!w);
    if (w) {
      setMenuTextOpacity(0);
      window.clearTimeout(menuTextDisplayTimeoutRef.current);
      menuTextDisplayTimeoutRef.current = window.setTimeout(() => {
        setMenuTextDisplay(false);
      }, 300);
    } else {
      window.clearTimeout(menuTextDisplayTimeoutRef.current);
      setMenuTextDisplay(true);
      menuTextDisplayTimeoutRef.current = window.setTimeout(() => {
        setMenuTextOpacity(1);
      }, 100);
    }
  });

  if (init) {
    return (
      <div className="w-full h-full flex items-center justify-center gap-4 bg-background">
        <div className="hidden">
          <ThemeIconButton />
        </div>
        <Loader2Icon
          className="animate-spin"
          style={{ width: 24, height: 24 }}
        />
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-x-auto">
      <div
        className="h-full flex bg-background p-4 pl-0 overflow-hidden"
        style={{ width: 'max(100%, 1440px)' }}
      >
        <div className="flex-none relative z-20">
          <div
            className="h-full duration-300 flex flex-col justify-between"
            style={{
              width: wider ? 160 : 64,
            }}
          >
            <div>
              <div className="flex justify-end px-4 mb-3 select-none">
                <Button size="icon" variant="ghost" onClick={onWiderToggle}>
                  {wider ? <ArrowLeftToLine /> : <ArrowRightToLine />}
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center overflow-x-hidden px-3">
                <div className="w-full flex items-center overflow-x-hidden p-2 mb-8 pointer-events-none select-none">
                  <BrandLogo className="flex-none" />
                  <div
                    style={{
                      opacity: menuTextOpacity,
                    }}
                    className={cls(
                      'flex-1 overflow-hidden text-nowrap duration-300 ml-4',
                      {
                        block: menuTextDisplay,
                        hidden: !menuTextDisplay,
                      },
                    )}
                  >
                    <BrandName />
                  </div>
                </div>
                {MENUS.map(({ title, icon, pathname: path }) => (
                  <div
                    key={path}
                    onClick={() => history.push(genPathname(path))}
                    className={cls(
                      'w-full flex items-center overflow-x-hidden rounded-md p-2 hover:bg-muted text-sm font-bold cursor-default',
                      {
                        'text-foreground': genPathname(path) !== pathname,
                        'text-primary-6': genPathname(path) === pathname,
                      },
                    )}
                  >
                    <div className="flex-none duration-300">{icon}</div>
                    <div
                      style={{
                        opacity: menuTextOpacity,
                      }}
                      className={cls(
                        'flex-1 overflow-hidden text-nowrap duration-300 ml-3',
                        {
                          block: menuTextDisplay,
                          hidden: !menuTextDisplay,
                        },
                      )}
                    >
                      {title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                width: menuTextOpacity ? 160 : 64,
              }}
              className={cls(
                'w-full flex flex-wrap items-center pb-2 gap-y-4 select-none',
                {
                  'justify-center': !menuTextOpacity,
                  'justify-around px-4': menuTextOpacity,
                },
              )}
            >
              <LogoutButton />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      (location.href = `//${location.hostname}${location.port ? `:${location.port}` : ''}/welcome`)
                    }
                  >
                    <House />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>首页</TooltipContent>
              </Tooltip>
              <ThemeIconButton />
            </div>
          </div>
        </div>
        <div className="relative z-20 flex-1 overflow-hidden rounded-3xl bg-muted dark:bg-muted/40">
          {/* <img
          src={theme === 'dark' ? mixDarkImgSrc : mixLightImgSrc}
          className="absolute w-full h-full top-0 left-0 opacity-35 dark:opacity-15 -z-30"
        /> */}
          <Switch>
            {MENUS.map((menu) => (
              <Route
                key={menu.pathname}
                exact
                path={genPathname(menu.pathname)}
                component={menu.component}
              />
            ))}
            <Route path="">
              <Redirect to={genPathname(MENUS[0].pathname)} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

const LogoutButton = () => {
  const setToken = useSetAtom(tokenAtom);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-8 h-8 flex justify-center items-center">
                <CircleArrowOutUpRight />
              </div>
            </TooltipTrigger>
            <TooltipContent>退出登录</TooltipContent>
          </Tooltip>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认退出</AlertDialogTitle>
          <AlertDialogDescription>
            你确定要退出吗？当前页面部分内容退出后不会保存，退出后若需继续使用需要重新登陆。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setToken('');
              location.href = `//${location.hostname}${location.port ? `:${location.port}` : ''}/login`;
            }}
          >
            确认
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
