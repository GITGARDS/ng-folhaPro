import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },
  {
    path: "dashboard",
    loadComponent: () => import("./app/dashboard"),
  },
  {
    path: "funcionarios",
    loadComponent: () => import("./pages/funcionario/funcionario"),
  },
];
