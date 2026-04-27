import { Routes } from "@angular/router";
import { empresaGuard } from "./modulos/empresa/shared/empresa-guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'empresa',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modulos/core/dashboard'),
  },
  {
    path: 'empresa',
    loadComponent: () => import('./modulos/empresa/empresa'),
  },
  {
    path: 'funcionario',
    canActivate: [empresaGuard],
    loadComponent: () => import('./modulos/funcionario/funcionario'),
  },
  {
    path: 'prodes',
    loadComponent: () => import('./modulos/prodes/prodes'),
  },
  {
    path: 'colors',
    loadComponent: () => import('./modulos/colors/colors'),
  },
];
