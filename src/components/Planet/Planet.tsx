import { memo, type CSSProperties } from 'react';
import cls from 'classnames';

export interface FloatObjectProps {
  size: number;
  type: 'primary' | 'secondary' | 'tertiary';
  left: number;
  top: number;
  className?: string;
  style?: CSSProperties;
  opacity?: number;
  floatOffset?: number;
}

export const Planet = memo<FloatObjectProps>((props) => {
  const { size, type, left, top, opacity, style, className } = props;

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        width: size,
        height: size,
        borderRadius: size,
        background: `linear-gradient(30deg, var(--float-object-${type}-light), var(--float-object-${type}-middle), var(--float-object-${type}-heavy))`,
        boxShadow: `0 0 12px 1px var(--float-object-${type}-middle)`,
        zIndex: -10,
        opacity,
        ...style,
      }}
      className={className}
    />
  );
});

export const Ring = memo<FloatObjectProps>((props) => {
  const { size, type, left, top, opacity, style, className } = props;

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        width: size,
        height: size,
        borderRadius: size,
        border: `3px solid var(--float-object-${type}-heavy)`,
        boxShadow: `0 0 12px 4px var(--float-object-${type}-heavy), inset 0 0 12px 4px var(--float-object-${type}-heavy)`,
        transform: 'translate(-50%, -50%)',
        zIndex: -10,
        opacity,
        ...style,
      }}
      className={className}
    />
  );
});

interface CubicFloatObjectProps extends FloatObjectProps {
  rotate?: number;
}

export const Cubic = memo<CubicFloatObjectProps>((props) => {
  const {
    size,
    type,
    left,
    top,
    opacity,
    style,
    className,
    rotate = 0,
  } = props;

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        width: size,
        height: size,
        borderRadius: 12,
        background: `linear-gradient(30deg, var(--float-object-${type}-light), var(--float-object-${type}-middle), var(--float-object-${type}-heavy))`,
        boxShadow: `0 0 12px 1px var(--float-object-${type}-heavy)`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        zIndex: -10,
        opacity,
        ...style,
      }}
      className={className}
    />
  );
});

export const Meteorite = memo<FloatObjectProps>((props) => {
  const { size, left, type, top, style, className } = props;

  return (
    <div
      style={{
        pointerEvents: 'none',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        position: 'absolute',
        width: 1.5,
        height: size,
        background: `linear-gradient(to top, var(--float-object-${type}-light), var(--float-object-${type}-middle), var(--float-object-${type}-heavy), transparent)`,
        borderRadius: 100,
        transform: 'rotate(35deg)',
        opacity: 0,
        ...style,
      }}
      className={cls('w-1 dark:w-0.5', className)}
    />
  );
});

export const CUBIC_LIST: CubicFloatObjectProps[] = [
  {
    type: 'primary',
    size: 84,
    top: 0,
    left: -300,
    rotate: -30,
  },
  {
    type: 'primary',
    size: 120,
    top: 500,
    left: 0,
    rotate: -80,
  },
  {
    type: 'primary',
    size: 64,
    top: 480,
    left: 840,
    rotate: 20,
  },
  {
    type: 'secondary',
    size: 64,
    top: 0,
    left: -800,
    rotate: 60,
  },
  {
    type: 'secondary',
    size: 84,
    top: -160,
    left: 880,
    rotate: 20,
  },
  {
    type: 'secondary',
    size: 84,
    top: 580,
    left: -420,
    rotate: 70,
  },
  {
    type: 'secondary',
    size: 54,
    top: 680,
    left: 640,
    rotate: 70,
  },
  {
    type: 'tertiary',
    size: 84,
    top: 180,
    left: 120,
    rotate: 100,
  },
  {
    type: 'tertiary',
    size: 104,
    top: 280,
    left: 620,
    rotate: 120,
  },
  {
    type: 'tertiary',
    size: 64,
    top: 360,
    left: -720,
    rotate: 200,
  },
];

export const PLANET_LIST: FloatObjectProps[] = [
  {
    type: 'primary',
    size: 84,
    top: -500,
    left: -300,
  },
  {
    type: 'secondary',
    size: 104,
    top: -400,
    left: -800,
  },
  // under button
  {
    type: 'secondary',
    size: 84,
    top: 120,
    left: -620,
  },
  {
    type: 'tertiary',
    size: 64,
    top: -200,
    left: 500,
  },
  {
    type: 'primary',
    size: 94,
    top: 300,
    left: -400,
  },
  // next to FAKE
  {
    type: 'tertiary',
    size: 84,
    top: -150,
    left: -400,
  },
  {
    type: 'primary',
    size: 94,
    top: 100,
    left: 300,
  },
  {
    type: 'tertiary',
    size: 64,
    top: 100,
    left: 800,
  },
  {
    type: 'secondary',
    size: 44,
    top: 30,
    left: 750,
  },
  {
    type: 'primary',
    size: 104,
    top: 500,
    left: 550,
  },
  {
    type: 'tertiary',
    size: 104,
    top: 550,
    left: -150,
  },
];

export const METEOROLITE_LIST: FloatObjectProps[] = [
  {
    type: 'primary',
    size: 220,
    top: 400,
    left: 1000,
    opacity: 0.2,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'secondary',
    size: 120,
    top: 200,
    left: -600,
    opacity: 0.8,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'secondary',
    size: 250,
    top: 0,
    left: 900,
    opacity: 0.2,
  },
  {
    type: 'tertiary',
    size: 200,
    top: 300,
    left: 0,
    opacity: 0.5,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'primary',
    size: 200,
    top: -200,
    left: -100,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'primary',
    size: 220,
    top: 400,
    left: -700,
    opacity: 0.2,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'secondary',
    size: 200,
    top: -100,
    left: 300,
  },
  {
    type: 'tertiary',
    size: 200,
    top: -300,
    left: -400,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'primary',
    size: 220,
    top: 400,
    left: 700,
    opacity: 0.2,
  },
  {
    type: 'primary',
    size: 100,
    top: -100,
    left: 900,
  },
  {
    type: 'primary',
    size: 100,
    top: -100,
    left: -500,
    opacity: 0.5,
  },
  {
    type: 'tertiary',
    size: 120,
    top: -400,
    left: 200,
  },
  {
    type: 'primary',
    size: 120,
    top: -400,
    left: -800,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'secondary',
    size: 250,
    top: 0,
    left: -600,
    opacity: 0.2,
  },
  {
    type: 'secondary',
    size: 250,
    top: 0,
    left: 600,
    opacity: 0.2,
  },
  {
    type: 'primary',
    size: 120,
    top: -400,
    left: -700,
    style: {
      zIndex: 999,
    },
  },
  {
    type: 'secondary',
    size: 200,
    top: -100,
    left: 1000,
  },
];

export const genKey = (props: FloatObjectProps) =>
  `${props.size}/${props.type}${props.left}/${props.top}`;

export const STREAK_ACROSS_GAP = 1250;
export const STREAK_ACROSS_GROUP_LENGTH = 3;
export const FLOAT_ANIMATION_DURATION = 2000;

export const FLOAT_TOP_OFFSET_LIST = [
  10, 20, -10, 15, -15, 12, -12, 8, -8, 20, -20,
];
