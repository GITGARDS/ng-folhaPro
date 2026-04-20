import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { FuncionarioModel } from "../models/funcionario";
import { FuncionarioService } from "../services/funcionario.service";

type FuncionarioState = {
  funcionarios: FuncionarioModel[];
  isLoading: boolean;
};

const initialState: FuncionarioState = {
  funcionarios: [],
  isLoading: false,
};

export const FuncionarioStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed(({ funcionarios }) => ({
    totalfuncionariosAtivos: computed(() => funcionarios().filter((f) => f.ativo)),
    totalSalarioBase: computed(() =>
      funcionarios().reduce(
        (acc, f) => (f.salarioBase && f.ativo ? acc + f.salarioBase : acc + 0),
        0,
      ),
    ),
  })),

  withMethods((store, funcionarioService = inject(FuncionarioService)) => ({
    findall() {
      if (store.funcionarios.length > 0) return;
      patchState(store, { isLoading: true });
      funcionarioService.findAll().subscribe({
        next: (funcionarios) => {
          console.log('findall', funcionarios);
          patchState(store, (state) => ({
            ...state,
            funcionarios,
            isLoading: false,
          }));
        },
      });
    },

    create: signalMethod(async (funcionario: FuncionarioModel) => {
      patchState(store, { isLoading: true });
      const id = await funcionarioService.create(funcionario);      
      patchState(store, (state) => ({
        ...state,
        funcionarios: [...state.funcionarios, { ...funcionario, id }],
        isLoading: false,
      }));
    }),

    updateById: signalMethod(async (params: { id: string; funcionario: FuncionarioModel }) => {
      patchState(store, { isLoading: true });
      await funcionarioService.updateById(params.id, params.funcionario);
      patchState(store, (state) => ({
        ...state,
        funcionarios: state.funcionarios.map((f) =>
          f.id === params.id ? { ...f, ...params.funcionario } : f,
        ),
        isLoading: false,
      }));
    }),

    deleteById: signalMethod(async (id: number) => {
      patchState(store, { isLoading: true });
      await funcionarioService.deleteById(id.toString());
      patchState(store, (state) => ({
        ...state,
        funcionarios: state.funcionarios.filter((f) => f.id !== id),
        isLoading: false,
      }));
    }),
  })),
);
