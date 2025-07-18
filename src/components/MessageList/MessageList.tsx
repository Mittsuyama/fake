import { memo, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import cls from 'classnames';
import { v4 as makeUuid } from 'uuid';
import { type MessageItem } from '@/types/message';
import { ROLE_LIST } from '@/assets/avatar';
import { ReactMarkdown } from '@/components/ReactMarkdown';
import { useMemoizedFn } from 'ahooks';

const LIST: MessageItem[] = [
  {
    id: makeUuid(),
    type: 'user-action',
    time: 0,
    users: ROLE_LIST.filter((item) => item.selected),
    userActionType: 'join',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content:
      '各位专家好！本次签约对方是xxx，我已经过核实，该公司xxx，可以签约。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content:
      '我们现在开始逐条评审这份《独家全约直播经纪协议》。我会按照合同条款顺序推进，请各位专家在涉及自己专业领域的部分发表意见。我们从"一、定义"部分开始。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content: '"全约直播事务"定义部分没有问题，涵盖范围全面，表述清晰。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content: '好的，接下来是"二、合作内容"部分。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '业务专家',
    content:
      '关于2.1.4条，建议在"使用、授权许可或转让"前加上"在直播业务相关范围内"，避免权利范围过宽。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content:
      '同意业务专家的意见。另外2.3条关于"乙方不享有单方任意解除权"的表述需要谨慎，建议改为"除法定解除权外，乙方不享有单方任意解除权"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content: '记录下来了。接下来是"三、合作期限"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content: '3.1条自动续约机制需要调整。建议：',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content: '将收入达标自动续约改为"双方协商后续约"',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content: '明确续约通知期从1个月延长到3个月',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: 'HR专家',
    content:
      '建议在3.2条增加"如乙方继续履行未完成工作，甲方应支付相应报酬"的条款。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content: '好的，我们进入"四、乙方承诺与保证"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content:
      '4.4条关于"不得发表敏感性言论"的表述过于宽泛，建议列举具体禁止事项，如"不得发表涉及政治、宗教、民族等可能引发争议的言论"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '业务专家',
    content: '4.5条需要补充"甲方应确保第三方合约内容不超出本协议约定范围"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content: '接下来是"五、独家性和排他性"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content: '5.1条需要增加例外情形，比如"经甲方书面同意的公益性活动"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '业务专家',
    content: '建议在5.2条后补充"但不得损害乙方既有权益"。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content: '我们继续"六、甲方权利义务"部分。',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '技术专家',
    content: '6.9条关于账号管理需要重点讨论：',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '技术专家',
    content:
      '平台合规性问题：抖音、快手等平台明确禁止账号买卖或强制变更主体，建议改为"账号由乙方注册，甲方享有管理权"',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '技术专家',
    content:
      '平台合规性问题：抖音、快手等平台明确禁止账号买卖或强制变更主体，建议改为"账号由乙方注册，甲方享有管理权"',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content: '补充6.9条法律风险：',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content:
      '若账号实际由乙方注册，但合同约定"管理权归甲方"，可能被认定为"变相买卖账号"',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '法务专家',
    content:
      '建议明确"管理权"范围（如仅限直播业务相关操作），并增加"乙方不得擅自修改账号信息或收回权限"',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '财务专家',
    content: '6.2条需要明确：',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '财务专家',
    content: '"相关成本和费用"的具体范围',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '财务专家',
    content: '结算周期和核算方式',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '财务专家',
    content: '收入确认标准',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: 'HR专家',
    content: '6.8条建议补充：',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: 'HR专家',
    content: '商业保险的具体险种',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: 'HR专家',
    content: '工伤认定的标准流程',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: 'HR专家',
    content: '非工作原因伤害的处理方式',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content:
      '感谢各位专家的深入讨论。现汇总本次合同评审的整体评价及关键修改建议如下：',
  },
  {
    id: makeUuid(),
    type: 'user',
    time: 0,
    title: '合同运营',
    content: `#### **一、合同整体评价**
1. **合规性**：
   - **法务专家**：合同框架基本合规，但需重点调整账号权属、知识产权等条款，避免与《个人信息保护法》及平台规则冲突。
   - **技术专家**：账号管理条款需与主流平台（如抖音、快手）规则对齐，避免因权属争议导致账号封禁风险。

2. **商业合理性**：
   - **业务专家**：合作内容、独家性条款需进一步细化边界，平衡双方权益，避免过度限制乙方合理活动空间。
   - **财务专家**：成本分摊、违约金计算等条款需补充具体执行标准，确保财务可操作性。

3. **风险控制**：
   - **HR专家**：补充竞业限制、工伤处理等条款，降低用工风险。
   - **法务专家**：自动续约、违约责任等条款需优化，减少法律争议可能性。

---

#### **二、必须修改的核心条款**
1. **账号权属与管理（第6.9、6.10条）**
   - 删除“永久归属甲方”表述，改为“合作期内使用权+终止后迁移义务”。
   - 明确账号管理范围（仅限直播业务），并补充乙方配合义务。

2. **知识产权与数据归属（第8.1条）**
   - 调整“永久独家”为“合作期间及合理后续期间授权使用”。
   - 增加粉丝数据使用的合规性限制（如符合《个人信息保护法》）。

3. **自动续约机制（第3.1条）**
   - 将“收入达标自动续约”改为“双方协商续约”，延长通知期至3个月。

4. **违约责任（第13.3条）**
   - 删除“10倍违约金”等模糊表述，以实际损失为计算基础。

---

#### **三、其他优化建议**
1. **操作细化**：
   - 补充账号交接、数据迁移的具体流程（技术专家）。
   - 明确“敏感性言论”的具体范围（法务专家）。

2. **例外情形**：
   - 在独家性条款中增加公益性活动例外（业务专家）。
   - 保密条款补充“依法披露”的例外情形（法务专家）。

---

本次修订将重点解决账号权属、数据使用、续约机制等核心条款的合规问题，同时提升合同的可执行性。合同修订版如附件所示，请各位专家复核专业领域相关内容。
附件：XXXX`,
  },
];

export const MessageList = memo(() => {
  const [list, setList] = useState<Array<MessageItem>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  const pollPushMessage = useMemoizedFn(() => {
    if (list.length >= LIST.length) {
      return;
    }
    timer.current = window.setTimeout(() => {
      setList((pre) => {
        const item = LIST.slice(pre.length, pre.length + 1)[0];
        return [
          ...pre,
          {
            ...item,
            time: Date.now(),
          },
        ];
      });
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 0);
      pollPushMessage();
    }, 1000);
  });

  useEffect(() => {
    pollPushMessage();
    return () => {
      window.clearTimeout(timer.current);
    };
  }, [pollPushMessage]);

  const messageRender = (message: MessageItem, index: number) => {
    if (message.type === 'system') {
      return (
        <div
          key={message.id}
          className="w-full flex justify-center items-center relative box-border overflow-hidden my-4 text-sm animate-system-message-jump-in"
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-muted z-10"></div>
          <div className="relative z-20 bg-background px-4">
            {message.content}
          </div>
        </div>
      );
    }
    if (message.type === 'user-action') {
      return (
        <div
          key={message.id}
          className="w-full flex justify-center items-center relative box-border overflow-hidden my-4 text-sm animate-system-message-jump-in"
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-muted z-10"></div>
          <div className="relative z-20 w-2/3 bg-background px-4 flex justify-center items-center gap-2 flex-wrap">
            {message.users.map((user) => (
              <div key={user.title} className="text-primary-6 flex gap-1">
                <div>{user.name}</div>
                <div>({user.title}),</div>
              </div>
            ))}
            <div>加入群聊</div>
          </div>
        </div>
      );
    }
    // user bubble
    if (message.type === 'user') {
      const pre = list[index - 1];
      const next = list[index + 1];
      const { title, content, time } = message;
      const position = title === '合同运营' ? 'left' : 'right';
      const current = ROLE_LIST.find((item) => item.title === title);
      const preSamePerson = pre?.type === 'user' && pre.title === title;
      const nextSamePerson = next?.type === 'user' && next.title === title;
      const smallTimeGap =
        nextSamePerson && next
          ? dayjs(next.time).unix() - dayjs(time).unix() < 5
          : false;
      const avatar = (
        <div>
          {preSamePerson ? (
            <div className="w-10 h-10" />
          ) : (
            <img
              src={current?.avatar}
              className="w-10 h-10 mt-1 rounded-full overflow-hidden animate-system-message-jump-in"
            />
          )}
        </div>
      );
      return (
        <div
          key={message.id}
          className={cls(
            'w-full flex relative box-border overflow-hidden my-4 gap-4',
            {
              'justify-start': position === 'left',
              'justify-end': !position || position === 'right',
            },
          )}
        >
          {position === 'left' ? avatar : null}
          <div
            className={cls('max-w-4/6 flex flex-col', {
              'items-end': position !== 'left',
            })}
          >
            {!preSamePerson ? (
              <div className="text-xs animate-system-message-jump-in flex gap-1">
                <div>{current?.name}</div>
                <div>({current?.title})</div>
              </div>
            ) : null}
            <div
              className={cls('px-4 py-3', {
                'mt-2': !preSamePerson,
                'bg-primary-6/70 rounded-b-lg text-white rounded-tr-lg animate-user-message-left-jump-in':
                  position === 'left',
                'bg-zinc-200 dark:bg-zinc-800 rounded-b-lg rounded-tl-lg animate-user-message-jump-in':
                  position !== 'left',
              })}
            >
              <ReactMarkdown content={content} />
            </div>
            {smallTimeGap ? null : (
              <div className="text-xs text-muted-foreground/35 animate-system-message-jump-in mt-2">
                {dayjs(time).format('MM-DD HH:mm:ss')}
              </div>
            )}
          </div>
          {position !== 'left' ? avatar : null}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="w-full h-full overflow-y-auto overflow-x-hidden px-4"
      ref={containerRef}
    >
      {list.map(messageRender)}
    </div>
  );
});
