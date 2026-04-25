import { Routes } from "@angular/router";
import { empresaGuard } from "./guard/empresa-guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'empresa',
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
    path: 'funcionario',
    canActivate: [empresaGuard],
    loadComponent: () => import('./pages/funcionario/funcionario'),
  },
  {
    path: 'prodes',
    loadComponent: () => import('./pages/prodes/prodes'),
  },
  {
    path: 'colors',
    loadComponent: () => import('./pages/colors/colors'),
  },
];
