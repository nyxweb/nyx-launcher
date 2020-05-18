export type Resolution =
  | '640x480'
  | '800x600'
  | '1024x768'
  | '1280x1024'
  | '1920x1080';

export type Volume = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface IConfig {
  name: string;
  version: string;
  userId: string;
  windowMode: boolean;
  resolution: Resolution;
  sound: boolean;
  music: boolean;
  volume: Volume;
  host: string;
  port: number;
}

export const DEFAULT_RESOLUTIONS: Array<Resolution> = [
  '640x480',
  '800x600',
  '1024x768',
  '1280x1024',
  '1920x1080',
];

export const DEFAULT_VOLUMES: Array<Volume> = [0, 1, 2, 3, 4, 5, 6];

export const DEFAULT_CONFIG: IConfig = {
  name: 'Nyx MuOnline',
  version: '0.0.1',
  userId: '',
  windowMode: true,
  resolution: '1024x768',
  sound: true,
  music: false,
  volume: 3,
  host: '127.0.0.1',
  port: 44405,
};

export const MAPPED_REGISTRY_KEYS = [
  [
    { configName: 'userId', regName: 'UserId', type: 'REG_SZ' },
    { configName: 'userId', regName: 'ID', type: 'REG_SZ' },
  ],
  [{ configName: 'windowMode', regName: 'WindowMode', type: 'REG_DWORD' }],
  [{ configName: 'sound', regName: 'SoundOn', type: 'REG_DWORD' }],
  [{ configName: 'music', regName: 'SoundOnOff', type: 'REG_DWORD' }],
];
