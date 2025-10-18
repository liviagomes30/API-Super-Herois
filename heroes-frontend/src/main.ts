import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { App } from './app/app';

registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
