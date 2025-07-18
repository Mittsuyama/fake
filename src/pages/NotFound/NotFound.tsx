import { useThemeUtils } from '@/utils/theme';

export const NotFound = () => {
  useThemeUtils();

  return (
    <div className="w-full h-full flex justify-center items-center text-4xl">
      404 NOT FOUND
    </div>
  );
};
