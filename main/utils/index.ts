import createWindow from './create-window';
import { commandCenter } from './commands';

export interface IConfig {
  version: string;
  windowMode: boolean;
  resolution: string;
}

const resolutions = ['800×600', '1024×768', '1280×960', '1920x1080'];

const isVersion = (version: string) =>
  /^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(version);

export const validateConfig = (config: IConfig) => {
  try {
    if (
      isVersion(config.version) &&
      resolutions.includes(config.resolution) &&
      (config.windowMode === false || config.windowMode === true)
    ) {
      return true;
    }
  } catch (error) {}

  return false;
};

export { createWindow, commandCenter };
