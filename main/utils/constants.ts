export type Resolution = '800×600' | '1024×768' | '1280×960' | '1920x1080';

export interface IConfig {
  name: string;
  version: string;
  windowMode: boolean;
  resolution: Resolution;
  host: string;
  port: number;
}

export const DEFAULT_RESOLUTIONS: Array<Resolution> = [
  '800×600',
  '1024×768',
  '1280×960',
  '1920x1080',
];

export const DEFAULT_CONFIG: IConfig = {
  name: 'Nyx MuOnline',
  version: '0.0.1',
  windowMode: true,
  resolution: '1920x1080',
  host: '127.0.0.1',
  port: 44405,
};
