import { TitleCasePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FuncionarioTable } from "./funcionarios/funcionarios";

@Component({
  selector: 'app-funcionario',
  imports: [TitleCasePipe, FuncionarioTable],
  template: `
    <div>
      <h1 class="text-3xl p-3 mb-2 text-shadow-md">{{ title | titlecase }}</h1>

      <div class="border border-gray-300 pt-3 pb-3 rounded-2xl">
        <app-funcionario-table />
      </div>
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
}
