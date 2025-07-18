import { useAtomValue } from 'jotai';
import { tokenAtom } from '@/models/global';
import { useMount } from 'ahooks';
import { fetchCheckIsCodeUsable } from '@/api/auth';
import { useState } from 'react';

export const checkToken = async (token?: string) => {
  if (!token) {
    return 'no-token';
  }

  const [code, date, insist] = token.split('-');

  if (Date.now() - Number(date) > 86400 * Number(insist) * 1000) {
    return 'timeout';
  }

  const res = await fetchCheckIsCodeUsable(code);

  if (!res) {
    return 'invalid-token';
  }

  return undefined;
};

export const useCheckAuth = () => {
  const token = useAtomValue(tokenAtom);
  const [init, setInit] = useState(true);

  useMount(async () => {
    const jump = (reason?: string) => {
      location.href = `//${location.hostname}${location.port ? `:${location.port}` : ''}/login${reason ? `?reason=${reason}` : ''}`;
    };

    try {
      setInit(true);
      const reason = await checkToken(token);
      if (reason) {
        jump(reason);
      } else {
        setInit(false);
      }
    } catch {
      jump();
    }
  });

  return init;
};
