import { CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { FuncionarioStore } from "../../store/funcionario.store";
import { FuncionarioCard } from "./funcionario-card";
import { FuncionarioList } from "./funcionario-lista/funcionario-list";

@Component({
  selector: 'app-funcionario',
  imports: [TitleCasePipe, FuncionarioCard, CurrencyPipe, FuncionarioList, MatCard],
  template: `
    <div class="max-w-[1000px] mx-auto">
      <mat-card appearance="outlined">
        <div class="p-4">
          <h1 class="text-3xl py-3 mb-2 text-black dark:text-white">{{ title | titlecase }}</h1>
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <app-funcionario-card title="Funcionarios Ativos" icon="people">
              <ng-container valor>{{
                this.funcionarioStore.totalfuncionariosAtivos().length
              }}</ng-container>
            </app-funcionario-card>

            <app-funcionario-card title="Salario Base" icon="outlet">
              <ng-container valor>{{
                funcionarioStore.totalSalarioBase() | currency
              }}</ng-container>
            </app-funcionario-card>
          </div>
        </div>

        <div class="max-w-[1000px]">
          <app-funcionario-list />
        </div>
      </mat-card>
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
  funcionarioStore = inject(FuncionarioStore);
}
