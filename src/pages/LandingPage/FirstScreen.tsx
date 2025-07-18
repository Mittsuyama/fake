import { CircleArrowRight } from 'lucide-react';
import { WELCOME_MAX_WIDTH } from '@/constants/global';
import cls from 'classnames';
import styles from './landing-page.module.less';

interface FirstScreenProps {
  onStart: () => void;
}

export const FirstScreen = (props: FirstScreenProps) => {
  const { onStart } = props;

  return (
    <div data-id="screen-1" className="h-full relative z-30">
      <div
        style={{ width: `min(${WELCOME_MAX_WIDTH}px, 90%)` }}
        className="h-full mx-auto flex flex-col justify-center relative z-20"
      >
        <div>
          <div className="text-7xl mb-6 relative font-bold">
            <div className="mb-4">法克，</div>
            <div>专业 AI 律师团队</div>
          </div>
          <div className="text-2xl text-secondary mb-8 opacity-40 dark:opacity-100">
            让法律不再成为少数人的专属
          </div>
          <div className="flex gap-6">
            <div
              className={cls(styles['secondary-button'], styles['main-button'])}
              onClick={() =>
                (location.href = `//${location.hostname}${location.port ? `:${location.port}` : ''}/review`)
              }
            >
              开始使用
              <CircleArrowRight style={{ width: 22, height: 22 }} />
            </div>
            <div className={styles['secondary-button']} onClick={onStart}>
              查看示例
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
