import type { RoleInfo } from '@/types/role';
import employee from './employee.png';
import host from './host.png';
import lawyer from './lawyer.png';
import manager from './manager.png';
import musician from './musician.png';
import photographer from './photographer.png';
import programmer from './programmer.png';

export const avatarPngSrcList = [
  employee,
  host,
  lawyer,
  manager,
  musician,
  photographer,
  programmer,
];

export const ROLE_LIST: RoleInfo[] = [
  {
    title: '高级法律顾问',
    name: '李兴伟',
    avatar: lawyer,
    description: '',
    topOffset: -30,
    leftOffset: 170,
    scale: 1.6,
    selected: true,
  },
  {
    title: '谈判专家',
    name: '陈嘉豪',
    avatar: manager,
    description: '',
    topOffset: -120,
    leftOffset: 220,
    scale: 0.9,
    selected: true,
  },
  {
    title: '达人',
    name: '郑思媛',
    avatar: photographer,
    description: '',
    topOffset: 120,
    leftOffset: -80,
    scale: 0.8,
  },
  {
    title: '资深MCN顾问',
    name: '周雨彤',
    avatar: host,
    description: '',
    topOffset: 80,
    leftOffset: -80,
    scale: 1.3,
    selected: true,
  },
  {
    title: '头部自媒体',
    name: 'Sophia Zhang',
    avatar: musician,
    description: '',
    topOffset: -40,
    leftOffset: 40,
    scale: 1.1,
    selected: true,
  },
  {
    title: '高级工程师',
    name: 'Alex Wang',
    avatar: programmer,
    description: '',
    topOffset: 60,
    leftOffset: -20,
    scale: 0.7,
    selected: true,
  },
  {
    title: '助理',
    name: '孙雅婷',
    avatar: employee,
    description: '',
    topOffset: 0,
    leftOffset: -60,
    scale: 0.8,
  },
];
