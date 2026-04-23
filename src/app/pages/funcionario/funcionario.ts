import { CommonModule, CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MiniCard } from "../../app/components/mini-card";
import { FuncionarioStore } from "../../store/funcionario.store";
import { FuncionarioList } from "./funcionario-list/funcionario-list";

@Component({
  selector: 'app-funcionario',
  imports: [TitleCasePipe, FuncionarioList, CommonModule, CurrencyPipe, MiniCard],
  template: `
    <div class="p-4 border rounded-2xl">
      <div class="max-w-[1000px] mx-auto">
        <div class="py-2">
          <h1 class="text-lg lg:text-3xl">{{ title | titlecase }}</h1>
        </div>
        <div class="py-2">
          <div class="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <app-mini-card title="Ativos" icon="people" styleBg="bg-yellow-500 border-3 border-yellow-500" styleText="text-gray-700">
              <ng-container valor>{{
                this.funcionarioStore.totalfuncionariosAtivos().length
              }}</ng-container>
            </app-mini-card>

            <app-mini-card title="Salario" icon="outlet" styleBg="bg-emerald-500 border-3 border-emerald-500" styleText="text-gray-100">
              <ng-container valor>{{
                this.funcionarioStore.totalSalarioBase() | currency: 'BRL'
              }}</ng-container>
            </app-mini-card>
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
