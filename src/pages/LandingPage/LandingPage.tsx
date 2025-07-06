import { memo, useEffect, useRef, useState, type UIEventHandler } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Navigation } from '@/components/Navigation';
import { WELCOME_MAX_WIDTH } from '@/constants/global';
import firstScreenBgDarkSrc from '@/assets/landing-page/first-screen-bg-dark.png';
import { useTheme } from '@/models/global';
import {
  Meteorolite,
  METEOROLITE_LIST,
  Planet,
  PLANET_LIST,
} from '@/components/Planet';

import { FirstScreen } from './FirstScreen';
import { SecondScreen } from './SecondScreen';
import { ThirdScreen } from './thirdScreen';

export const LandingPage = memo(() => {
  const theme = useTheme();
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [doorWrapEl, setDoorWrapEl] = useState<HTMLDivElement>();
  const [secondEl, setSecondEl] = useState<HTMLDivElement>();
  const [scrollRate, setSrollRate] = useState(0);
  const [totalScrollTop, setTotalScrollTop] = useState(0);
  const [roleSelectHeight, setRoleSelectHeight] = useState(0);
  console.log(totalScrollTop);

  useEffect(() => {
    if (!secondEl) {
      return;
    }
    setTotalScrollTop(secondEl.offsetTop);
  }, [secondEl]);

  const onStart = useMemoizedFn(() => {
    scrollWrapperRef.current?.scrollTo({
      top: totalScrollTop,
      behavior: 'smooth',
    });
  });

  const onScroll = useMemoizedFn<UIEventHandler<HTMLDivElement>>((e) => {
    const { scrollTop } = e.currentTarget;
    setSrollRate(Math.min(scrollTop / totalScrollTop, 1));
  });

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Navigation className="z-50" />
      <div
        className="w-full h-full relative overflow-y-auto overflow-x-hidden z-10"
        ref={scrollWrapperRef}
        onScroll={onScroll}
      >
        <div
          style={{
            opacity: theme === 'light' ? 0.15 : 0.1,
          }}
          className="absolute w-full h-[2800px] bg-linear-150 from-primary-6 via-transparent to-transparent"
        />
        {PLANET_LIST.map((props) => (
          <Planet
            {...props}
            key={`${props.size}/${props.type}${props.left}/${props.top}`}
            left={props.left * (1 + scrollRate * 1)}
          />
        ))}
        {METEOROLITE_LIST.map((props) => (
          <Meteorolite
            {...props}
            key={`${props.size}/${props.type}/${props.left}/${props.top}`}
            left={
              props.left +
              Math.cos(Math.PI * 1.3) *
                scrollRate *
                (props.style?.zIndex ? 1500 : 2000)
            }
            top={
              props.top -
              Math.sin(Math.PI * 1.3) *
                scrollRate *
                (props.style?.zIndex ? 1500 : 2000)
            }
            opacity={Math.max((Number(props.opacity) || 1) - scrollRate, 0)}
          />
        ))}
        <img
          className="absolute top-0 left-1/2 w-full -z-20 -translate-x-1/2"
          src={firstScreenBgDarkSrc}
        />

        <FirstScreen onStart={onStart} />

        <SecondScreen
          scrollRate={scrollRate}
          setSecondEl={setSecondEl}
          doorWrapEl={doorWrapEl}
          setDoorWrapEl={setDoorWrapEl}
          roleSelectHeight={roleSelectHeight}
          setRoleSelectHeight={setRoleSelectHeight}
        />

        <ThirdScreen />
      </div>
    </div>
  );
});
