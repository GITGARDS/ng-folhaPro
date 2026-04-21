import { ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideRouter, withViewTransitions } from "@angular/router";
import { provideEnvironmentNgxMask } from "ngx-mask";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),

    provideEnvironmentNgxMask(),
  ],
};
