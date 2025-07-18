import { useEffect, useState } from 'react';
import {
  genKey,
  METEOROLITE_LIST,
  STREAK_ACROSS_GAP,
  STREAK_ACROSS_GROUP_LENGTH,
  type FloatObjectProps,
} from './Planet';

export const useMeteoriteList = () => {
  const [meteoriteList, setMeteoriteList] = useState<FloatObjectProps[]>([]);

  useEffect(() => {
    let timer: number;

    const tik = () => {
      setMeteoriteList((pre) => {
        let cur = -1;
        if (pre.length) {
          cur = METEOROLITE_LIST.findIndex(
            (item) => genKey(item) === genKey(pre[pre.length - 1]),
          );
        }
        return [
          ...(cur + 1 + STREAK_ACROSS_GROUP_LENGTH > METEOROLITE_LIST.length
            ? METEOROLITE_LIST.slice(
                0,
                cur + 1 + STREAK_ACROSS_GROUP_LENGTH - METEOROLITE_LIST.length,
              )
            : []),
          ...METEOROLITE_LIST.slice(
            cur + 1,
            cur + 1 + STREAK_ACROSS_GROUP_LENGTH,
          ),
        ];
      });
      timer = window.setTimeout(() => {
        tik();
      }, STREAK_ACROSS_GAP);
    };

    timer = window.setTimeout(() => {
      tik();
    }, 0);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  return meteoriteList;
};
