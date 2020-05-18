import { join } from 'path';
import fs from 'fs';
import Registry from 'winreg';

import {
  IConfig,
  DEFAULT_CONFIG,
  Resolution,
  DEFAULT_RESOLUTIONS,
  Volume,
  DEFAULT_VOLUMES,
  MAPPED_REGISTRY_KEYS,
} from './constants';

const configPath = join(
  process.env.PORTABLE_EXECUTABLE_DIR || './',
  'nyx.json'
);

export const createConfigFile = (config: IConfig | false = false) => {
  fs.writeFileSync(
    configPath,
    JSON.stringify(
      config && validateConfig(config) ? config : DEFAULT_CONFIG,
      null,
      2
    ),
    {
      encoding: 'utf8',
    }
  );
};

export const readConfigFile = () => {
  let config: IConfig | false = false;

  try {
    const configContents = fs.readFileSync(configPath, { encoding: 'utf8' });
    config = validateConfig(JSON.parse(configContents))
      ? JSON.parse(configContents)
      : false;
  } catch (err) {
    createConfigFile();
  }

  return config;
};

export const updateConfigFile = (data: IConfig) => {
  try {
    setConfigRegistry(data);

    const configContents = fs.readFileSync(configPath, { encoding: 'utf8' });
    const config = validateConfig(JSON.parse(configContents))
      ? JSON.parse(configContents)
      : false;

    if (!config) throw new Error();

    createConfigFile({ ...config, ...data });
  } catch (err) {
    createConfigFile(data);
  }
};

const setConfigRegistry = (config: any) => {
  const registry = new Registry({
    hive: Registry.HKCU,
    key: '\\Software\\WebZen\\Mu\\Config',
  });

  MAPPED_REGISTRY_KEYS.forEach((obj) =>
    obj.forEach((reg) => {
      const value =
        reg.type === 'REG_SZ'
          ? config[reg.configName]
          : config[reg.configName]
          ? 0x000001
          : 0x000000;

      registry.set(reg.regName, reg.type, value, (err) => {
        if (err) console.log(err.message);
      });
    })
  );
};

// HELPERS

const isValidName = (name: string) =>
  typeof name === 'string' && name.length >= 3 && name.length <= 15;

const isVersion = (version: string) =>
  /^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(version);

const isValidUserId = (user: string) => /^[a-z0-9_.-@]$/.test(user);

const isResolution = (resolution: Resolution) =>
  DEFAULT_RESOLUTIONS.includes(resolution);

const isValidVolume = (volume: Volume) => DEFAULT_VOLUMES.includes(volume);

const isValidIP = (ip: string) =>
  /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);

const isValidPort = (port: number) => port > 0 && port < 65000;

const validateConfig = (config: IConfig) =>
  isValidName(config.name) &&
  isVersion(config.version) &&
  isValidUserId(config.userId) &&
  typeof config.windowMode === 'boolean' &&
  isResolution(config.resolution) &&
  typeof config.sound === 'boolean' &&
  typeof config.music === 'boolean' &&
  isValidVolume(config.volume) &&
  isValidIP(config.host) &&
  isValidPort(config.port);
