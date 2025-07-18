import { memo, type ReactEventHandler } from 'react';
import cls from 'classnames';
import fLogoSvgSrc from '@/assets/global/f-logo.svg';
import fakeLogoSvgSrc from '@/assets/global/fake-logo.svg';

interface LogoProps {
  size?: 'large' | 'default';
  showName?: boolean;
  className?: string;
  onClick?: ReactEventHandler<HTMLDivElement>;
}

const FONT_SCALE = 0.7;

const sizeToPixel = (size: LogoProps['size']) => {
  return size === 'large' ? 36 : 24;
};

export const BrandName = memo<Omit<LogoProps, 'showName'>>((props) => {
  const { size = 'default', className } = props;
  return (
    <img
      className={className}
      style={{
        height: sizeToPixel(size) * FONT_SCALE,
      }}
      src={fakeLogoSvgSrc}
    />
  );
});

export const BrandLogo = memo<LogoProps>((props) => {
  const { size = 'default', showName, className, onClick } = props;

  return (
    <div
      className={cls(
        'inline-flex justify-center items-center text-foreground',
        {
          'gap-2': size === 'default',
          'gap-4': size === 'large',
          'cursor-pointer': !!onClick,
        },
        className,
      )}
      onClick={onClick}
    >
      <img
        style={{
          width: sizeToPixel(size),
          height: sizeToPixel(size),
        }}
        src={fLogoSvgSrc}
      />
      {showName && <BrandName size={size} />}
    </div>
  );
});
