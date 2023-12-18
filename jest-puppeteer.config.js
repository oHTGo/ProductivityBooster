import { join } from 'path';

const EXTENSION_PATH = join(process.cwd(), 'dist');

/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */
export default {
  launch: {
    dumpio: true,
    headless: 'new',
    ignoreHTTPSErrors: true,
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      `--load-extension=${EXTENSION_PATH}`,
      `--disable-extensions-except=${EXTENSION_PATH}`,
    ],
  },
};
