import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';

import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const BR_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  // lista os serviços e configurações disponíveis para toda a aplicação
  providers: [
    provideBrowserGlobalErrorListeners(), // capturar erros não tratados durante a execução da aplicação
    provideZoneChangeDetection({ eventCoalescing: true }), // "observa" eventos assíncronos (como cliques, timers, requisições HTTP) e notifica o Angular quando algo pode ter mudado, para que ele atualize a interface.
    provideRouter(routes), // recebe o array 'routes' (importado de ./app.routes.ts) que define quais componentes devem ser exibidos para cada URL
    provideHttpClient(), // usa a classe HttpClient do Angular

    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },

    // Adaptador de data customizado para formato brasileiro
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
};
