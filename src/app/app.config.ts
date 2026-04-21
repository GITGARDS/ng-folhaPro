import { ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideRouter, withViewTransitions } from "@angular/router";
import { routes } from "./app.routes";

const firebaseConfig = {
  apiKey: 'AIzaSyDl0SF8APmDbCotEM5jSZ8huRZ0b_hPJMM',
  authDomain: 'portifolio-2362e.firebaseapp.com',
  projectId: 'portifolio-2362e',
  storageBucket: 'portifolio-2362e.firebasestorage.app',
  messagingSenderId: '169087849079',
  appId: '1:169087849079:web:9b52fa6054a73455122c72',
  measurementId: 'G-ZGVQ74B8Y6',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
