import { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';
import type { RoleInfo } from './role';

export type MessageType = 'user' | 'system' | 'user-action';

export type UserActionType = 'join' | 'leave';

interface BaseMessageItem<T extends MessageType> {
  id: string;
  type: T;
  time: string | number | Dayjs | Date;
}

export interface UserMessageItem extends BaseMessageItem<'user'> {
  content: string;
  title: string;
  position?: 'left' | 'right';
}

export interface UserActionMessageItem extends BaseMessageItem<'user-action'> {
  userActionType: UserActionType;
  users: RoleInfo[];
}

export interface SystemMessageItem extends BaseMessageItem<'system'> {
  content: ReactNode;
}

export type MessageItem =
  | UserMessageItem
  | SystemMessageItem
  | UserActionMessageItem;
