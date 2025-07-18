import { CircleCheckBig } from 'lucide-react';
import { ROLE_LIST } from '@/assets/avatar';
import { Button } from '@/components/Button';
import { Cubic, CUBIC_LIST, genKey } from '@/components/Planet';
import curveLeftSrc from '@/assets/landing-page/curve-left.png';
import curveRightSrc from '@/assets/landing-page/curve-right.png';

import {
  DOOR_HEIGHT,
  DOOR_WIDTH,
  NAME_OPACITY_START,
  DOOR_TOP_OFFSET,
  FLOAT_ANIMATION_DURATION,
  FLOAT_TOP_OFFSET_LIST,
} from './common';
import styles from './landing-page.module.less';

interface SecondScreenProps {
  rawScrollRate: number;
  doorWrapEl?: HTMLDivElement;
  setDoorWrapEl: (el: HTMLDivElement) => void;
  setSecondEl: (el: HTMLDivElement) => void;
  roleListHeight?: number;
  roleSelectHeight: number;
  setRoleSelectHeight: (height: number) => void;
  floatAnimationTik?: boolean;
}

export const SecondScreen = (props: SecondScreenProps) => {
  const {
    rawScrollRate,
    doorWrapEl,
    setDoorWrapEl,
    setSecondEl,
    roleSelectHeight,
    setRoleSelectHeight,
    floatAnimationTik,
  } = props;

  const scrollRate = Math.min(1, rawScrollRate);

  const opacity =
    scrollRate < NAME_OPACITY_START
      ? 0
      : (scrollRate - NAME_OPACITY_START) / (1 - NAME_OPACITY_START);

  return (
    <div data-id="screen-2" className="relative z-20" ref={setSecondEl}>
      <div
        style={{ width: '100%' }}
        // style={{ width: `min(${WELCOME_MAX_WIDTH}px, 90%)` }}
        className="relative mx-auto z-20"
      >
        <div
          ref={setDoorWrapEl}
          style={{ height: roleSelectHeight + DOOR_TOP_OFFSET }}
          className="relative w-full pointer-events-none"
        >
          <div
            className={styles['avatar-door']}
            style={{
              position: scrollRate < 1 ? 'fixed' : 'absolute',
              width:
                scrollRate < 1
                  ? ((doorWrapEl?.clientWidth || window.innerWidth) -
                      DOOR_WIDTH) *
                      scrollRate +
                    DOOR_WIDTH
                  : '100%',
              height:
                scrollRate < 1
                  ? (roleSelectHeight - DOOR_HEIGHT) * scrollRate + DOOR_HEIGHT
                  : roleSelectHeight,
              top: `calc(${50 * (1 - scrollRate)}% + ${DOOR_TOP_OFFSET * scrollRate}px)`,
              left: scrollRate < 1 ? '50%' : 0,
              transform:
                scrollRate < 1
                  ? `translate(-${25 * scrollRate + 25}%, -${50 - scrollRate * 50}%)`
                  : 'unset',
              zIndex: 3,
            }}
          >
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 py-2"
              ref={(el) => {
                el && setRoleSelectHeight(el.clientHeight);
              }}
            >
              <div className="flex justify-center gap-12 flex-wrap w-[760px] pt-6 mb-12">
                {ROLE_LIST.map((role) => {
                  const {
                    name,
                    title,
                    avatar,
                    leftOffset,
                    topOffset,
                    scale,
                    selected,
                  } = role;
                  return (
                    <div
                      key={name}
                      style={{
                        top: topOffset * (1 - scrollRate),
                        left: leftOffset * (1 - scrollRate),
                        transform: `scale(${scale + (1 - scale) * scrollRate})`,
                      }}
                      className="flex-none flex flex-col items-center relative"
                    >
                      <div className="relative rounded-full w-36 h-36 overflow-hidden mb-4">
                        <div
                          style={{
                            // 直接 100% 会有点漏边
                            position: 'relative',
                            width: 'calc(100% - 2px)',
                            height: 'calc(100% - 2px)',
                            top: 1,
                            left: 1,
                            borderRadius: 100,
                            overflow: 'hidden',
                          }}
                        >
                          <img className="w-full h-full" src={avatar} />
                        </div>
                        {selected && scrollRate > NAME_OPACITY_START ? (
                          <div
                            style={{
                              opacity,
                            }}
                            className="absolute rounded-full top-0 left-0 w-full h-full bg-background/60 flex items-center justify-center text-primary-6 border-4 border-primary-6"
                          >
                            <CircleCheckBig className="w-12 h-8" />
                          </div>
                        ) : null}
                      </div>
                      <div
                        style={{
                          opacity,
                        }}
                        className="text-foreground text-lg"
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          opacity,
                        }}
                        className="text-secondary text-md"
                      >
                        {name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            style={{
              padding: 24,
              border:
                '1px solid color-mix(in oklab, var(--foreground) 20%, transparent)',
              backdropFilter: 'blur(15px)',
              background:
                'color-mix(in oklab, var(--foreground) 5%, transparent)',
              borderRadius: 24,
            }}
          >
            <div className="w-full text-2xl font-bold mb-12">
              即刻构建你的法律 AI 私人顾问团
            </div>
            <div className="w-full text-md flex items-center gap-8 mb-12">
              <div>
                当前选择的法律 AI 私人顾问团 (
                {ROLE_LIST.reduce(
                  (pre, cur) => pre + (cur.selected ? 1 : 0),
                  0,
                )}
                位)
              </div>
              <div className="flex gap-2">
                {ROLE_LIST.filter((item) => item.selected).map(({ avatar }) => (
                  <img
                    key={avatar}
                    src={avatar}
                    className="w-12 h-12 rounded-full overflow-hidden"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Button variant="outline" size="lg">
                  合同审查
                </Button>
                <Button variant="outline" size="lg">
                  法律咨询
                </Button>
                <Button variant="outline" size="lg">
                  构建我的私人顾问团
                </Button>
              </div>
              <Button size="lg" variant="primary">
                下一步
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <img
        className="absolute top-64 right-48 w-[220px]"
        src={cubicBlueGreenImgSrc}
      />
      <img
        className="absolute top-144 left-32 w-[220px]"
        src={cubicYellowGreenImgSrc}
      />
      <img
        className="absolute top-200 left-144 w-[300px]"
        src={cubicGreenImgSrc}
      />
      <img
        className="absolute -z-10 -right-64 -bottom-100 w-[1200px]"
        src={secondScreenBgSrc}
      /> */}
      <img
        style={{
          left: 'calc(50% - 660px)',
          top: 'calc(50% + 300px)',
        }}
        className="absolute w-[300px] -translate-x-1/12 -translate-y-1/2"
        src={curveLeftSrc}
      />
      <img
        style={{
          left: 'calc(50% + 460px)',
          top: 'calc(50% - 100px)',
        }}
        className="absolute w-[400px] -translate-x-1/12 -translate-y-1/2 top-[calc(50%)] left-[calc(50%)]"
        src={curveRightSrc}
      />
      {CUBIC_LIST.map((props, index) => (
        <Cubic
          {...props}
          key={genKey(props)}
          style={{
            transitionDuration: `${FLOAT_ANIMATION_DURATION / 1000}s`,
            transform: `translate(-50%, ${floatAnimationTik ? FLOAT_TOP_OFFSET_LIST[index % FLOAT_TOP_OFFSET_LIST.length] : 0}px) rotate(${props.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};
