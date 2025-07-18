import cls from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import { useMemoizedFn, useMount } from 'ahooks';
import { toast } from 'sonner';
import haloImgSrc from '@/assets/landing-page/halo.png';
import { Toaster } from '@/components/Sonner';
import { BrandLogo } from '@/components/BrandLogo';
import { ThemeIconButton } from '@/components/ThemeIconButton';
import {
  Meteorite,
  genKey,
  FLOAT_ANIMATION_DURATION,
} from '@/components/Planet';
import { useMeteoriteList } from '@/components/Planet/helper';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/InputOpt';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Label } from '@/components/Label';
import { tokenAtom } from '@/models/global';
import { fetchCheckIsCodeUsable } from '@/api/auth';
import { checkToken } from '@/utils/use-check-auth';
import { useHistory } from 'react-router-dom';
import { jumpInMpa } from '@/utils/jump';

const Seperator = () => (
  <div className="mx-2 bg-muted-foreground/25 w-2 h-0.5" />
);

interface ThirdScreenProps {
  floatAnimationTik?: boolean;
}

const TOKEN_LENGTH = 6;
const HALO_TOP_OFFSET = 284;
const HALO_LEFT_OFFSET = 216;

export const Login = (_props: ThirdScreenProps) => {
  const meteoriteList = useMeteoriteList();
  const [token, setToken] = useAtom(tokenAtom);

  const [insist, setInsist] = useState(true);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [errorTwinkle, setErrorTwinkle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenChecking, setTokenChecking] = useState(false);
  const hasReadReasonRef = useRef(false);
  const errorTwinkleTimeoutRef = useRef(0);

  const onConfirm = useMemoizedFn(async () => {
    try {
      setLoading(true);

      if (!value) {
        setError('请输入邀请码');
      } else if (value.length !== TOKEN_LENGTH) {
        setError(`邀请码为${TOKEN_LENGTH}位`);
      } else {
        const res = await fetchCheckIsCodeUsable(value);
        if (!res) {
          setError('邀请码错误');
        } else {
          setToken(`${value}-${Date.now()}-${insist ? 14 : 1}`);
          location.href = `//${location.hostname}${location.port ? `:${location.port}` : ''}/app`;
        }
      }

      if (errorTwinkleTimeoutRef.current) {
        window.clearTimeout(errorTwinkleTimeoutRef.current);
      }
      setErrorTwinkle(true);
      errorTwinkleTimeoutRef.current = window.setTimeout(() => {
        setErrorTwinkle(false);
      }, 1500);
    } finally {
      setLoading(false);
    }
  });

  useMount(() => {
    if (hasReadReasonRef.current) {
      return;
    }
    hasReadReasonRef.current = true;
    const search = new URLSearchParams(location.search);
    const reason = search.get('reason');
    if (!reason) {
      return;
    }
    switch (reason) {
      case 'invalid-token':
        toast.error('登录异常', { description: '邀请码错误，请重新输入' });
        break;
      case 'timeout':
        toast.error('登录异常', { description: '登录态已过期，请重新登录' });
        break;
      case 'no-token':
        toast.error('登录异常', { description: '未登录，请输入邀请码' });
        break;
    }
  });

  useMount(async () => {
    if (!token) {
      return;
    }
    setTokenChecking(true);
    try {
      const reason = await checkToken(token);
      if (!reason) {
        location.href = `//${location.hostname}${location.port ? `:${location.port}` : ''}/app`;
      } else {
        setTokenChecking(false);
      }
    } catch {
      setTokenChecking(false);
    }
  });

  return (
    <>
      {tokenChecking ? (
        <div className="fixed w-full h-full z-50 bg-background/60 flex justify-center items-center gap-4">
          <Loader2Icon className="animate-spin" />
          Loading...
        </div>
      ) : null}
      <div className="w-full h-full relative flex justify-center items-center overflow-hidden bg-muted dark:bg-background">
        {meteoriteList.map((props, index) => (
          <Meteorite
            {...props}
            key={genKey(props)}
            className={cls({
              'animate-streak-across-1': index % 3 === 0,
              'animate-streak-across-2': index % 3 === 1,
              'animate-streak-across-3': index % 3 === 2,
            })}
          />
        ))}
        <div
          style={{
            width: 800,
            height: 600,
          }}
          className="relative"
        >
          <div
            className="absolute z-10"
            style={{
              width: `calc(100% + ${HALO_LEFT_OFFSET * 2}px)`,
              height: `calc(100% + ${HALO_TOP_OFFSET * 2}px)`,
              top: `-${HALO_TOP_OFFSET}px`,
              left: `-${HALO_LEFT_OFFSET}px`,
            }}
          >
            <img
              src={haloImgSrc}
              className="w-full h-full pointer-events-none select-none opacity-90 dark:opacity-80"
            />
          </div>
          <div className="relative z-30 bg-muted dark:bg-background w-full h-full rounded-3xl p-12">
            <div className="flex justify-between mb-18 select-none">
              <BrandLogo
                onClick={() => jumpInMpa('/welcome')}
                size="large"
                showName
              />
              <ThemeIconButton />
            </div>
            <div className="select-auto flex flex-col">
              <div className="text-3xl mb-2 text-foreground font-qualy">
                START WITH INVITATION CODE
              </div>
              <div className="text-md mb-12 text-muted-foreground">
                通过邀请码开始
              </div>
              <div className="mb-12">
                <div className="flex justify-center">
                  <InputOTP
                    ref={(e) => e?.focus()}
                    maxLength={TOKEN_LENGTH}
                    value={value}
                    onChange={(value) => setValue(value?.toLocaleUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onConfirm();
                      }
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <Seperator />
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <Seperator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <Seperator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <Seperator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <Seperator />
                    <InputOTPGroup>
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {error ? (
                  <div
                    className={cls('mt-3 text-red-500 text-sm tracking-wider', {
                      'animate-twinkle': errorTwinkle,
                    })}
                  >
                    {error}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-2 mb-12">
                <Checkbox
                  checked={insist}
                  onCheckedChange={(e) => setInsist(!!e)}
                  id="save-invitatation-code"
                />
                <Label
                  className="text-muted-foreground text-sm"
                  htmlFor="save-invitatation-code"
                >
                  保持登录状态 (14 天)
                </Label>
              </div>
              <Button className="mb-4" variant="primary" onClick={onConfirm}>
                {loading ? <Loader2Icon className="animate-spin" /> : null}
                开始使用
              </Button>
              <Button variant="outline">没有邀请码？</Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
