import { memo } from 'react';
import fLogoSvgSrc from '@/assets/global/f-logo.svg';
import fakeLogoSvgSrc from '@/assets/global/fake-logo.svg';

interface LogoProps {
  size?: number;
  showName?: boolean;
}

const LOGO_SCALE = 0.6;
const FONT_SCALE = 0.7;

export const BrandLogo = memo<LogoProps>((props) => {
  const { size = 24, showName } = props;

  return (
    <div className="inline-flex justify-center items-center gap-2 text-foreground">
      <img
        style={{
          width: size,
          height: size,
        }}
        src={fLogoSvgSrc}
      />
      {showName && (
        <img
          style={{
            height: size * FONT_SCALE,
          }}
          src={fakeLogoSvgSrc}
        />
      )}
    </div>
  );
});

interface IconBranchLogoGhostProps {
  size?: number;
}

export const IconBranchLogoGhost = memo<IconBranchLogoGhostProps>((props) => {
  const { size = 20 } = props;

  return (
    <img
      style={{
        width: size,
        height: size,
      }}
      src={fLogoSvgSrc}
    />
  );
});
