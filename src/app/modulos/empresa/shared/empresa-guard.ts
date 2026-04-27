import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { EmpresaStore } from "./empresa.store";

export const empresaGuard: CanActivateFn = (route, state) => {
  const empresaStore = inject(EmpresaStore);
  const empresaLogada = empresaStore.empresaLogada();
  console.log('empresaLogada', empresaLogada.isLogada);
  if (!empresaLogada.isLogada) {
    window.alert('Empresa não selecionada');
    return false;
  }
  return true;
};
