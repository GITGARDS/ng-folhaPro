import { CommonModule, CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FuncionarioStore } from "../../store/funcionario.store";
import { FuncionarioCard } from "./funcionario-card";
import { FuncionarioList } from "./funcionario-list/funcionario-list";

@Component({
  selector: 'app-funcionario',
  imports: [TitleCasePipe, FuncionarioCard, FuncionarioList, CommonModule, CurrencyPipe],
  template: `
    <div class="p-4 bg-cyan-100 border border-gray-300">
      <div class="max-w-[1000px] mx-auto">
        <div class="py-2">
          <h1 class="text-3xl text-black dark:text-white">{{ title | titlecase }}</h1>
        </div>
        <div class="py-2">
          <div class="flex flex-wrap items-center gap-4">
            <app-funcionario-card title="Funcionarios Ativos" icon="people">
              <ng-container valor>{{
                this.funcionarioStore.totalfuncionariosAtivos().length
              }}</ng-container>
            </app-funcionario-card>

            <app-funcionario-card title="Salario Base" icon="outlet">
              <ng-container valor>{{
                this.funcionarioStore.totalSalarioBase() | currency: 'BRL'
              }}</ng-container>
            </app-funcionario-card>
          </div>
        </div>
        <div class="my-4">
          <app-funcionario-list />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
  funcionarioStore = inject(FuncionarioStore);
}
