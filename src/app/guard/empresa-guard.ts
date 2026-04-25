import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { EmpresaStore } from "../store/empresa.store";

export const empresaGuard: CanActivateFn = (route, state) => {
  const empresaStore = inject(EmpresaStore);  
  const empresaLogada = empresaStore.empresaLogada();

  const router = inject(Router);
  console.log('empresaGuard', empresaLogada?.id);
  if (!empresaLogada?.id) {
    window.alert('Empresa não selecionada');
    router.navigate(['empresa']);
    return false;
  }
  return true;
};
