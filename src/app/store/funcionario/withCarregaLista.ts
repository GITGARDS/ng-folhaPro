import { inject } from "@angular/core";
import { patchState, signalMethod, signalStoreFeature, withHooks, withMethods, withState } from "@ngrx/signals";
import { delay } from "rxjs";
import { FuncionarioService } from "../../services/funcionario.service";
import { EmpresaStore } from "../empresa.store";

export function WithCarregaLista(  ) {
  return signalStoreFeature(
    withState({
      list: [],
      isLoading: false,
    }),

    withMethods((store, funcionarioService = inject(FuncionarioService)) => ({
      carregaLista: signalMethod((params: { empresa: string }) => {
        if (store.list.length > 0) return;
        patchState(store, { isLoading: true });
        funcionarioService
          .findAll({ empresa: params.empresa })
          .pipe(delay(200))
          .subscribe({
            next: (list) => {
              patchState(store, (state) => ({
                ...state as any,
                list,
                isLoading: false,
              }));
            },
          });
      }),
    })),

    withHooks((store, empresaStore = inject(EmpresaStore)) => ({
      onInit: () => {
        store.carregaLista({ empresa: empresaStore.empresaLogada().empresa.id as string });
      },
    })),
  );
}
