import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // lista os serviços e configurações disponíveis para toda a aplicação
  providers: [
    provideBrowserGlobalErrorListeners(), // capturar erros não tratados durante a execução da aplicação
    provideZoneChangeDetection({ eventCoalescing: true }), // "observa" eventos assíncronos (como cliques, timers, requisições HTTP) e notifica o Angular quando algo pode ter mudado, para que ele atualize a interface.
    provideRouter(routes), // recebe o array 'routes' (importado de ./app.routes.ts) que define quais componentes devem ser exibidos para cada URL
    provideHttpClient(), // usa a classe HttpClient do Angular
  ],
};
