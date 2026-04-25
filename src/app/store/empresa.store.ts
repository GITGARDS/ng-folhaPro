import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { EmpresaLogadaModel, EmpresaModel } from "../models/empresa";
import { EmpresaService } from "../services/empresa.service";

type EmpresaState = {
  list: EmpresaModel[];
  empresaLogada: EmpresaLogadaModel;
  isLoading: boolean;
};

const initialState: EmpresaState = {
  list: [],
  empresaLogada: {} as EmpresaLogadaModel,
  isLoading: false,
};

export const EmpresaStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed(({ list }) => ({})),

  withMethods((store, empresaService = inject(EmpresaService), router = inject(Router)) => ({
    async carregaLista() {
      if (store.list.length > 0) return;
      await new Promise((resolve) => setTimeout(resolve, 200));
      patchState(store, { isLoading: true });
      empresaService.findAll().subscribe({
        next: (list) => {
          console.log('findall', list);
          patchState(store, (state) => ({
            ...state,
            list,
            isLoading: false,
          }));
        },
      });
    },

    create: signalMethod(async (param: EmpresaModel) => {
      patchState(store, { isLoading: true });
      const id = await empresaService.create(param);
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...param, id }],
        isLoading: false,
      }));
    }),

    login: signalMethod(async (param: { empresa: EmpresaModel }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 200));
      patchState(store, (state) => ({
        ...state,
        empresaLogada: {
          empresa: param.empresa,
          isLogada: true,
        },
        isLoading: false,
      }));
      console.log('login', router.url);
    }),

    logout: async () => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 200));
      patchState(store, (state) => ({
        ...state,
        empresaLogada: {} as EmpresaLogadaModel,
        isLoading: false,
      }));
      console.log('logout', router.url);
      switch (router.url) {
        case '/funcionario': {
          router.navigate(['empresa']);
          break;
        }
      }
    },

    updateById: signalMethod(async (params: { id: string; data: EmpresaModel }) => {
      patchState(store, { isLoading: true });
      await empresaService.updateById(params.id, params.data);
      patchState(store, (state) => ({
        ...state,
        list: state.list.map((f) => (f.id === params.id ? { ...f, ...params.data } : f)),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (id: number) => {
      patchState(store, { isLoading: true });
      await empresaService.deleteById(id.toString());
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== id),
        isLoading: false,
      }));
    }),
  })),
);
