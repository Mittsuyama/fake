import { ROLE_LIST } from '@/assets/avatar';
import { WELCOME_MAX_WIDTH } from '@/constants/global';
import { useTheme } from '@/models/global';
import mixLightImgSrc from '@/assets/landing-page/mix-light.png';
import mixDarkImgSrc from '@/assets/landing-page/mix-dark.png';

interface ThirdScreenProps {
  floatAnimationTik?: boolean;
}

export const ThirdScreen = (_props: ThirdScreenProps) => {
  const theme = useTheme();

  return (
    <div data-id="screen-3" className="w-full relative z-30 my-96">
      <img
        src={theme === 'dark' ? mixDarkImgSrc : mixLightImgSrc}
        className="absolute w-full top-0 left-0 -z-10 opacity-50 dark:opacity-20"
      />
      <div className="text-3xl text-foreground mb-8 text-center">
        AI 法律顾问团多角度审核，让风险无处遁寻
      </div>
      <div
        style={{
          width: `min(${WELCOME_MAX_WIDTH}px, 90%)`,
          height: 800,
        }}
        className="mx-auto relative"
      >
        <div className="absolute -translate-y-1/2 top-1/2 left-[-120px] rounded-full bg-foreground/5 backdrop-blur-lg border-2 border-white/20 flex flex-col gap-4 px-4 py-6">
          {ROLE_LIST.filter((item) => item.selected).map(({ avatar }) => (
            <img
              key={avatar}
              src={avatar}
              className="w-12 h-12 rounded-full overflow-hidden"
            />
          ))}
        </div>
        <div className="bg-foreground/10 w-full h-full rounded-2xl p-12 border border-foreground/20 backdrop-blur-lg">
          test
        </div>
      </div>
      {/* {PLANET_LIST.map((props, index) => (
        <Ring
          key={`${props.size}/${props.type}${props.left}/${props.top}`}
          {...props}
          top={props.top + 250}
          left={props.left + 100}
          style={{
            transitionDuration: `${FLOAT_ANIMATION_DURATION / 1000}s`,
            transform: `translate(-50%, ${floatAnimationTik ? FLOAT_TOP_OFFSET_LIST[index % FLOAT_TOP_OFFSET_LIST.length] : 0}px)`,
          }}
        />
      ))} */}
    </div>
  );
};
