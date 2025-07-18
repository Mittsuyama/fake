import { memo, useEffect, useRef, useState, type UIEventHandler } from 'react';
import cls from 'classnames';
import { useMemoizedFn } from 'ahooks';
import { Navigation } from '@/components/Navigation';
import firstScreenBgDarkSrc from '@/assets/landing-page/first-screen-bg-dark.png';
import mixLightImgSrc from '@/assets/landing-page/mix-light.png';
import mixDarkImgSrc from '@/assets/landing-page/mix-dark.png';
import { useTheme } from '@/models/global';
import {
  genKey,
  Meteorite,
  Planet,
  PLANET_LIST,
  FLOAT_ANIMATION_DURATION,
  FLOAT_TOP_OFFSET_LIST,
} from '@/components/Planet';
import { useMeteoriteList } from '@/components/Planet/helper';

import { FirstScreen } from './FirstScreen';
import { SecondScreen } from './SecondScreen';
import { ThirdScreen } from './ThirdScreen';

export const LandingPage = memo(() => {
  const theme = useTheme();
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [doorWrapEl, setDoorWrapEl] = useState<HTMLDivElement>();
  const [secondEl, setSecondEl] = useState<HTMLDivElement>();
  const [rawScrollRate, setRawSrollRate] = useState(0);
  const [totalScrollTop, setTotalScrollTop] = useState(0);
  const [roleSelectHeight, setRoleSelectHeight] = useState(0);

  const [floatAnimationTik, setFloatAnimationTik] = useState(false);
  const meteoriteList = useMeteoriteList();

  useEffect(() => {
    if (!secondEl) {
      return;
    }
    setTotalScrollTop(secondEl.offsetTop);
  }, [secondEl]);

  useEffect(() => {
    let timer: number;

    const tik = () => {
      setFloatAnimationTik((pre) => !pre);
      timer = window.setTimeout(() => {
        tik();
      }, FLOAT_ANIMATION_DURATION);
    };

    timer = window.setTimeout(() => {
      tik();
    }, 0);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const onStart = useMemoizedFn(() => {
    scrollWrapperRef.current?.scrollTo({
      top: totalScrollTop,
      behavior: 'smooth',
    });
  });

  const onScroll = useMemoizedFn<UIEventHandler<HTMLDivElement>>((e) => {
    const { scrollTop } = e.currentTarget;
    setRawSrollRate(scrollTop / totalScrollTop);
  });

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Navigation className="z-50" />
      <div
        className="w-full h-full relative overflow-y-auto overflow-x-hidden z-10"
        ref={scrollWrapperRef}
        onScroll={onScroll}
      >
        {PLANET_LIST.map((props, index) => (
          <Planet
            {...props}
            key={genKey(props)}
            style={{
              transitionDuration: `${FLOAT_ANIMATION_DURATION / 1000}s`,
              transform: `translate(-50%, ${floatAnimationTik ? FLOAT_TOP_OFFSET_LIST[index % FLOAT_TOP_OFFSET_LIST.length] : 0}px)`,
            }}
          />
        ))}
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
        <img
          className="absolute top-0 left-1/2 w-full -z-20 -translate-x-1/2"
          src={firstScreenBgDarkSrc}
        />
        <img
          src={theme === 'dark' ? mixDarkImgSrc : mixLightImgSrc}
          className="absolute w-full top-0 left-0 opacity-25 dark:opacity-10 -z-30"
        />

        <FirstScreen onStart={onStart} />

        <SecondScreen
          rawScrollRate={rawScrollRate}
          setSecondEl={setSecondEl}
          doorWrapEl={doorWrapEl}
          setDoorWrapEl={setDoorWrapEl}
          roleSelectHeight={roleSelectHeight}
          setRoleSelectHeight={setRoleSelectHeight}
          floatAnimationTik={floatAnimationTik}
        />

        <ThirdScreen floatAnimationTik={floatAnimationTik} />
      </div>
    </div>
  );
});
