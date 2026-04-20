import { computed, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { FuncionarioModel } from "../models/funcionario";
import { FuncionarioService } from "../services/funcionario.service";

type FuncionarioState = {
  funcionarios: FuncionarioModel[];
  isLoading: boolean;
};

const initialState: FuncionarioState = {
  funcionarios: [] as FuncionarioModel[],
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

    create: signalMethod((funcionario: FuncionarioModel) => {
      patchState(store, { isLoading: true });

      return funcionarioService.create(funcionario).subscribe({
        next: (funcionario) => {
          console.log('create', funcionario);
          patchState(store, (state) => ({
            ...state,
            funcionarios: [...state.funcionarios, funcionario],
            isLoading: false,
          }));
        },
      });
    }),

    updateById: signalMethod((funcionario: FuncionarioModel) => {
      patchState(store, { isLoading: true });
      return funcionarioService.updateById(funcionario).subscribe({
        next: (funcionario) => {
          console.log('updateById', funcionario);
          patchState(store, (state) => ({
            ...state,
            funcionarios: state.funcionarios.map((f) =>
              f.id === funcionario.id ? funcionario : f,
            ),
            isLoading: false,
          }));
        },
      });
    }),

    deleteById: signalMethod((id: number) => {
      patchState(store, { isLoading: true });
      funcionarioService.deleteById(id).subscribe({
        next: () => {
          patchState(store, (state) => ({
            ...state,
            funcionarios: state.funcionarios.filter((f) => f.id !== id),
            isLoading: false,
          }));
        },
      });
    }),
  })),
);
