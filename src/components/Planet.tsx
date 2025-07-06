import { memo, type CSSProperties } from 'react';

interface Props {
  size: number;
  type: 'primary' | 'secondary' | 'tertiary';
  left: number;
  top: number;
  className?: string;
  style?: CSSProperties;
  opacity?: number;
}

interface Gradient {
  light: string;
  middle: string;
  heavy: string;
}

const gradient: Record<Props['type'], Gradient> = {
  primary: {
    light: 'rgba(245, 255, 247, 1)',
    middle: 'rgba(86, 246, 121, 0.84)',
    heavy: 'rgba(90, 242, 90, 0.77)',
  },
  secondary: {
    light: 'rgba(193, 255, 77, 1)',
    middle: 'rgba(218, 255, 160, 0.84)',
    heavy: 'rgba(197, 255, 153, 0.72)',
  },
  tertiary: {
    light: 'rgba(77, 255, 202, 1)',
    middle: 'rgba(86, 246, 238, 0.84)',
    heavy: 'rgba(90, 234, 242, 0.77)',
  },
};

export const Planet = memo<Props>((props) => {
  const { size, type, left, top, opacity, style, className } = props;

  return (
    <div
      style={{
        ...style,
        pointerEvents: 'none',
        position: 'absolute',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        width: size,
        height: size,
        borderRadius: size,
        background: `linear-gradient(30deg, ${gradient[type].light}, ${gradient[type].middle}, ${gradient[type].heavy})`,
        boxShadow: `0 0 12px 1px ${gradient[type].heavy}`,
        transform: 'translate(-50%, -50%)',
        zIndex: -10,
        opacity,
      }}
      className={className}
    />
  );
});

export const Ring = memo<Props>((props) => {
  const { size, type, left, top, opacity, style, className } = props;

  return (
    <div
      style={{
        ...style,
        pointerEvents: 'none',
        position: 'absolute',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        width: size,
        height: size,
        borderRadius: size,
        border: `3px solid ${gradient[type].heavy}`,
        boxShadow: `0 0 12px 4px ${gradient[type].heavy}, inset 0 0 12px 4px ${gradient[type].heavy}`,
        transform: 'translate(-50%, -50%)',
        zIndex: -10,
        opacity,
      }}
      className={className}
    />
  );
});

interface CubicProps extends Props {
  rotate?: number;
}

export const Cubic = memo<CubicProps>((props) => {
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
        ...style,
        pointerEvents: 'none',
        position: 'absolute',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        width: size,
        height: size,
        borderRadius: 12,
        background: `linear-gradient(30deg, ${gradient[type].light}, ${gradient[type].middle}, ${gradient[type].heavy})`,
        boxShadow: `0 0 12px 1px ${gradient[type].heavy}`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        zIndex: -10,
        opacity,
      }}
      className={className}
    />
  );
});

export const Meteorolite = memo<Props>((props) => {
  const { size, left, type, top, opacity, style, className } = props;

  return (
    <div
      style={{
        pointerEvents: 'none',
        left: `calc(50% + ${left}px)`,
        top: `calc(50% + ${top}px)`,
        transform: 'translate(-50%, -50%) rotate(35deg)',
        position: 'absolute',
        width: 1.5,
        height: size,
        background: `linear-gradient(to top, ${gradient[type].light}, ${gradient[type].middle}, ${gradient[type].heavy}, transparent)`,
        borderRadius: 100,
        opacity,
        ...style,
      }}
      className={className}
    />
  );
});

export const CUBIC_LIST: CubicProps[] = [
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
    type: 'primary',
    size: 54,
    top: 680,
    left: -840,
    rotate: 70,
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
    top: 720,
    left: -370,
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

export const PLANET_LIST: Props[] = [
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
    type: 'tertiary',
    size: 84,
    top: -150,
    left: -400,
  },
  {
    type: 'primary',
    size: 94,
    top: 300,
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

export const METEOROLITE_LIST: Props[] = [
  // top
  // the left up of the door
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
    type: 'tertiary',
    size: 200,
    top: -300,
    left: -400,
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
  // under the door
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
  // bottom
  {
    type: 'primary',
    size: 120,
    top: -400,
    left: 200,
  },
  {
    type: 'secondary',
    size: 200,
    top: -100,
    left: 300,
  },
  {
    type: 'primary',
    size: 220,
    top: 400,
    left: -700,
    opacity: 0.2,
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
    left: 500,
    opacity: 0.5,
  },
  {
    type: 'secondary',
    size: 250,
    top: 0,
    left: 600,
    opacity: 0.2,
  },

  // more right
  {
    type: 'primary',
    size: 120,
    top: -400,
    left: 700,
  },
  {
    type: 'secondary',
    size: 200,
    top: -100,
    left: 1000,
  },
  {
    type: 'primary',
    size: 220,
    top: 400,
    left: 800,
  },
  {
    type: 'primary',
    size: 220,
    top: 400,
    left: 1000,
    opacity: 0.2,
  },
  {
    type: 'primary',
    size: 100,
    top: -100,
    left: 900,
  },
  {
    type: 'secondary',
    size: 250,
    top: 0,
    left: 900,
    opacity: 0.2,
  },
];
