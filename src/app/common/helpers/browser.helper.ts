import { getParser } from 'bowser';

import { IDeviceInformation } from '@common/interfaces';

export class BrowserHelper {
  public static getDeviceAndBrowserInformation(): Partial<IDeviceInformation> {
    const device = getParser(navigator.userAgent);
    return {
      browserName: device.getBrowser().name,
      browserVersion: device.getBrowser().version,
      osName: device.getOSName(),
    };
  }
}
