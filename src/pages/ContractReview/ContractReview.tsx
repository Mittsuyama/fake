import cls from 'classnames';
import { useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { ROLE_LIST } from '@/assets/avatar';
import { Button } from '@/components/Button';
import { MessageList } from '@/components/MessageList';
import { CircleCheckBig, Loader2Icon } from 'lucide-react';
import { Contract } from '@/components/Contract';

export const ContractReview = () => {
  const [roleList, setRoleList] = useState(
    ROLE_LIST.filter((role) => role.selected),
  );
  const [roleSelectExpand, setRoleSelectExpand] = useState(false);
  const [roleSelectHeight, setRoleSelectHeight] = useState(0);
  const [changeRoleListLoading, setChangeRoleListLoading] = useState(false);

  const onRoleListChangeConfirm = useMemoizedFn(async () => {
    try {
      setChangeRoleListLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 750);
      });
    } finally {
      setChangeRoleListLoading(false);
    }
  });

  return (
    <div className="w-full h-full p-6 flex gap-6">
      <div className="flex-1 overflow-hidden bg-background rounded-3xl relative">
        <div className="relative p-4 h-full">
          <MessageList />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="mb-6 flex-none py-4 px-4 flex justify-between items-center flex-wrap gap-5">
          <div className="flex items-center gap-6">
            <div className="text-lg font-bold text-muted-foregroundd">
              AI 顾问团
            </div>
            <div
              className="relative flex-none"
              style={{
                width: (roleList.length - 1) * 48 + 56,
              }}
            >
              {roleList.map(({ avatar }, index) => (
                <img
                  key={avatar}
                  src={avatar}
                  className={cls(
                    'w-14 h-14 rounded-full overflow-hidden top-0 border-2 border-background',
                    {
                      relative: !index,
                      absolute: !!index,
                    },
                  )}
                  style={{
                    left: index ? index * 48 : 0,
                  }}
                />
              ))}
            </div>
          </div>
          <Button
            style={{
              padding: 16,
            }}
            className="rounded-full p-4"
            variant="primary"
            onClick={async () => {
              if (roleSelectExpand) {
                await onRoleListChangeConfirm();
                setRoleSelectExpand(false);
              } else {
                setRoleSelectExpand(true);
              }
            }}
          >
            {roleSelectExpand && changeRoleListLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : null}
            {roleSelectExpand ? '确认阵容' : '调整阵容'}
          </Button>
        </div>
        <div
          className="overflow-hidden duration-300"
          style={{ height: roleSelectExpand ? roleSelectHeight : 0 }}
        >
          <div
            ref={(e) => {
              e && setRoleSelectHeight(e?.getBoundingClientRect().height);
            }}
          >
            <div className="px-3 mb-6 text-lg font-bold">
              构建您的 AI 顾问团阵容
            </div>
            <div className="flex gap-6 flex-wrap px-2 pb-6">
              {ROLE_LIST.map((role) => {
                const { name, title, avatar } = role;
                return (
                  <div
                    key={name}
                    className="flex-none flex flex-col items-center relative"
                  >
                    <div
                      onClick={() =>
                        setRoleList((pre) =>
                          pre.some((item) => item.name === name)
                            ? pre.filter((item) => item.name !== name)
                            : [...pre, role],
                        )
                      }
                      className="relative rounded-full w-22 h-22 overflow-hidden mb-4 cursor-pointer hover:opacity-80 dark:hover:opacity-90"
                    >
                      <div
                        style={{
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
                      {roleList.some((item) => item.name === name) ? (
                        <div className="absolute rounded-full top-0 left-0 w-full h-full bg-background/60 flex items-center justify-center text-primary-6 border-3 border-primary-6">
                          <CircleCheckBig className="w-12 h-8" />
                        </div>
                      ) : null}
                    </div>
                    <div className="text-foreground text-md">{title}</div>
                    <div className="text-secondary text-sm">{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-background rounded-2xl p-2">
          <Contract />
        </div>
      </div>
    </div>
  );
};
