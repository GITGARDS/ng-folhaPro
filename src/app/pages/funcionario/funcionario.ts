import { TitleCasePipe } from "@angular/common";
import { Component } from "@angular/core";
import { MiniCard } from "../../components/mini-card/mini-card";
import { FuncionarioTable } from "./funcionarios/funcionarios";

@Component({
  selector: 'app-funcionario',
  imports: [TitleCasePipe, FuncionarioTable, MiniCard],
  template: `
    <div>
      <h1 class="text-3xl py-3 mb-2 text-shadow-md">{{ title | titlecase }}</h1>
      <div class="flex flex-wrap items-center gap-4">
        <app-mini-card class="mb-4" [valor]="500" [icon]="'attach_money'" />
        <app-mini-card class="mb-4" [valor]="500" [icon]="'emoji_people'" />
        <app-mini-card class="mb-4" [valor]="500" [icon]="'domain'" />
      </div>

      <app-funcionario-table />
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
}
