import { join } from 'path';
import fs from 'fs';

import { App } from 'electron';
import {
  DEFAULT_CONFIG,
  DEFAULT_RESOLUTIONS,
  IConfig,
  Resolution,
} from './constants';

export const createConfigFile = (app: App) => {
  const configPath = join(app.getAppPath(), 'nyx.json');
  fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), {
    encoding: 'utf8',
  });
};

export const readConfigFile = (app: App) => {
  const configPath = join(app.getAppPath(), 'nyx.json');
  let config: IConfig;

  try {
    const fileContents = fs.readFileSync(configPath, { encoding: 'utf8' });
    config = JSON.parse(fileContents);

    if (!validateConfig(config)) throw new Error('Invalid Config File');

    return config;
  } catch (error) {
    createConfigFile(app);
  }

  return false;
};

// HELPERS

const validateConfig = (config: IConfig) =>
  isValidName(config.name) &&
  isVersion(config.version) &&
  typeof config.windowMode === 'boolean' &&
  isResolution(config.resolution) &&
  isValidIP(config.host) &&
  isValidPort(config.port);

const isValidName = (name: string) =>
  typeof name === 'string' && name.length >= 3 && name.length <= 15;

const isVersion = (version: string) =>
  /^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(version);

const isResolution = (resolution: Resolution) =>
  DEFAULT_RESOLUTIONS.includes(resolution);

const isValidIP = (ip: string) =>
  /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);

const isValidPort = (port: number) => port > 0 && port < 65000;
