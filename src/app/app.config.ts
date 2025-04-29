import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // or wherever your routes are defined

export const appConfig = {
  providers: [
    provideRouter(routes),
    // ... any other providers
  ]
};
