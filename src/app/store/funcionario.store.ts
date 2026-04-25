import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { FuncionarioModel } from "../models/funcionario";
import { FuncionarioService } from "../services/funcionario.service";

type FuncionarioState = {
  list: FuncionarioModel[];
  objeto: FuncionarioModel;
  isLoading: boolean;
};

const initialState: FuncionarioState = {
  list: [],
  objeto: {} as FuncionarioModel,
  isLoading: false,
};

export const FuncionarioStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed(({ list }) => ({
    totalfuncionariosAtivos: computed(() => list().filter((f) => f.ativo === true)),
    totalSalarioBase: computed(() =>
      list().reduce(
        (acc, f) => (f.salarioBase && f.ativo ? acc + Number(f.salarioBase) : acc + 0),
        0,
      ),
    ),
    findById: computed(() => (params: { id: number }) => list().find((f) => f.id === params.id)),
  })),

  withMethods((store, funcionarioService = inject(FuncionarioService)) => ({

    async carregaLista(params: { empresa: string }) {
      if (store.list.length > 0) return;
      await new Promise((resolve) => setTimeout(resolve, 200));
      patchState(store, { isLoading: true });
      funcionarioService.findAll({ empresa: params.empresa }).subscribe({
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

    create: signalMethod(async (param: FuncionarioModel) => {
      patchState(store, { isLoading: true });
      const id = await funcionarioService.create(param);
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...param, id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async (params: { id: string; data: FuncionarioModel }) => {
      patchState(store, { isLoading: true });
      await funcionarioService.updateById(params.id, params.data);
      patchState(store, (state) => ({
        ...state,
        list: state.list.map((f) => (f.id === params.id ? { ...f, ...params.data } : f)),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (id: number) => {
      patchState(store, { isLoading: true });
      await funcionarioService.deleteById(id.toString());
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== id),
        isLoading: false,
      }));
    }),
  })),
);
