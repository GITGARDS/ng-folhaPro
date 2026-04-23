import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'funcionarios',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./app/dashboard'),
  },
  {
    path: 'empresa',
    loadComponent: () => import('./pages/empresa/empresa'),
  },
  {
    path: 'funcionarios',
    loadComponent: () => import('./pages/funcionario/funcionario'),
  },
  {
    path: 'prodes',
    loadComponent: () => import('./pages/prodes/prodes'),
  },
];
