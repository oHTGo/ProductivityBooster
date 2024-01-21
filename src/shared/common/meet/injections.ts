import common from '@shared/constants/common';
import { getLocalStorage } from '@shared/utils/storage';
import moment from 'moment';
import type { InjectedConfiguration } from '@shared/types/commons';
import type { IMeet } from '@shared/types/tools';

const checkMutedButton = (button: HTMLDivElement) => {
  return button?.getAttribute('data-is-muted') === 'true';
};

const injectedConfiguration: InjectedConfiguration = {
  domains: ['meet.google.com'],
  duration: moment.duration(0.3, 'second').asMilliseconds(),
  run: async () => {
    const configs = (await getLocalStorage<IMeet>(common.MEET)) ?? {
      turnOffMicro: true,
      turnOffCamera: true,
    };

    const microButton = document.querySelector<HTMLDivElement>('[jsname="Dg9Wp"] [data-is-muted]');
    const cameraButton = document.querySelector<HTMLDivElement>('[jsname="R3GXJb"] [data-is-muted]');

    if (!microButton || !cameraButton) {
      return false;
    }

    if (configs.turnOffMicro && !checkMutedButton(microButton)) {
      microButton.click();
    }
    if (configs.turnOffCamera && !checkMutedButton(cameraButton)) {
      cameraButton.click();
    }

    return true;
  },
};

export default injectedConfiguration;
