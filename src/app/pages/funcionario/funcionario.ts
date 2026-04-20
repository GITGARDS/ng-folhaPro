import { CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FuncionarioService } from "../../services/funcionario.service";
import { FuncionarioCard } from "./funcionario-card";
import { Funcionarios } from "./funcionarios/funcionarios";

@Component({
  selector: 'app-funcionario',
  imports: [TitleCasePipe, Funcionarios, FuncionarioCard, CurrencyPipe],
  template: `
    <h1 class="text-3xl py-3 mb-2 text-black">{{ title | titlecase }}</h1>
    <div class="flex flex-wrap items-center gap-4 mb-4">
      <app-funcionario-card title="Funcionarios Ativos" icon="people">
        <ng-container valor>{{ funcionarioService.getTotalFuncionariosAtivos() }}</ng-container>
      </app-funcionario-card>

      <app-funcionario-card title="Salario Base" icon="outlet">
        <ng-container valor>{{ funcionarioService.getTotalSalarioBase() | currency }}</ng-container>
      </app-funcionario-card>
    </div>

    <div class="max-w-[1000px]"
    >
      <app-funcionarios />
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
  funcionarioService = inject(FuncionarioService);
}
