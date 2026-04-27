import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { delay } from "rxjs";
import { ProdesModel } from "./prodes-model";
import { ProdesService } from "./prodes.service";

type ProdesState = {
  list: ProdesModel[];
  isLoading: boolean;
};

const initialState: ProdesState = {
  list: [],
  isLoading: false,
};

export const ProdesStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed(({ list }) => ({
    totalProdesAtivos: computed(() => list().filter((f) => f.ativo)),
  })),

  withMethods((store, prodesService = inject(ProdesService)) => ({
    carregaLista: signalMethod(() => {
      if (store.list.length > 0) return;
      patchState(store, { isLoading: true });
      prodesService
        .findAll()
        .pipe(delay(200))
        .subscribe({
          next: (list) => {
            console.log('findall', list);
            patchState(store, (state) => ({
              ...state,
              list,
              isLoading: false,
            }));
          },
        });
    }),

    create: signalMethod(async (param: ProdesModel) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 200));
      const id = await prodesService.create(param);
      patchState(store, (state) => ({
        ...state,
        list: [...state.list, { ...param, id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async (params: { id: string; data: ProdesModel }) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 200));
      await prodesService.updateById(params.id, params.data);
      patchState(store, (state) => ({
        ...state,
        list: state.list.map((f) => (f.id === params.id ? { ...f, ...params.data } : f)),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (id: number) => {
      patchState(store, { isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 200));
      await prodesService.deleteById(id.toString());
      patchState(store, (state) => ({
        ...state,
        list: state.list.filter((f) => f.id !== id),
        isLoading: false,
      }));
    }),
  })),
  withHooks((store) => ({
    onInit: () => {
      store.carregaLista(null);
    }
  })),
);
