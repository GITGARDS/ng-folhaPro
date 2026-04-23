import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { ProdesModel } from "../models/prodes";
import { ProdesService } from "../services/prodes.service";

type ProdesState = {
  listProdes: ProdesModel[];
  isLoading: boolean;
};

const initialState: ProdesState = {
  listProdes: [],
  isLoading: false,
};

export const ProdesStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed(({ listProdes }) => ({
    totalProdesAtivos: computed(() => listProdes().filter((f) => f.ativo)),
  })),

  withMethods((store, prodesService = inject(ProdesService)) => ({
    async carregaLista() {
      if (store.listProdes.length > 0 ) return;
      await new Promise((resolve) => setTimeout(resolve, 200));
      patchState(store, { isLoading: true });
      prodesService.findAll().subscribe({
        next: (listProdes) => {
          console.log('findall', listProdes);
          patchState(store, (state) => ({
            ...state,
            listProdes,
            isLoading: false,
          }));
        },
      });
    },

    create: signalMethod(async (param: ProdesModel) => {
      patchState(store, { isLoading: true });
      const id = await prodesService.create(param);
      patchState(store, (state) => ({
        ...state,
        prodess: [...state.listProdes, { ...param, id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async (params: { id: string; prodes: ProdesModel }) => {
      patchState(store, { isLoading: true });
      await prodesService.updateById(params.id, params.prodes);
      patchState(store, (state) => ({
        ...state,
        prodess: state.listProdes.map((f) =>
          f.id === params.id ? { ...f, ...params.prodes } : f,
        ),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (id: number) => {
      patchState(store, { isLoading: true });
      await prodesService.deleteById(id.toString());
      patchState(store, (state) => ({
        ...state,
        prodess: state.listProdes.filter((f) => f.id !== id),
        isLoading: false,
      }));
    }),
  })),
);
