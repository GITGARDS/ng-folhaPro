import { CommonModule, CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FuncionarioStore } from "../../store/funcionario.store";
import { FuncionarioCard } from "./funcionario-card";
import { FuncionarioList } from "./funcionario-list/funcionario-list";

@Component({
  selector: 'app-funcionario',
  imports: [TitleCasePipe, FuncionarioCard, FuncionarioList, CommonModule, CurrencyPipe],
  template: `
    <div class="p-4 border rounded-2xl">
      <div class="max-w-[1000px] mx-auto">
        <div class="py-2">
          <h1 class="text-3xl">{{ title | titlecase }}</h1>
        </div>
        <div class="py-2">
          <div class="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <app-funcionario-card title="Ativos" icon="people">
              <ng-container valor>{{
                this.funcionarioStore.totalfuncionariosAtivos().length
              }}</ng-container>
            </app-funcionario-card>

            <app-funcionario-card title="Salario" icon="outlet">
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
