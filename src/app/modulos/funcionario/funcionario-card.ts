import { Component, effect, inject, signal } from "@angular/core";
import { MiniCard } from "../core/components/mini-card";
import { FuncionarioStore } from "./shared/funcionario.store";

@Component({
  selector: 'app-funcionario-card',
  imports: [MiniCard],
  template: `
    <div class="flex flex-wrap gap-4">
      <app-mini-card
        [icone]="'person_add'"
        title="ativos"
        [valor]="funcionarioStore.totalfuncionariosAtivos().length"
      >
      </app-mini-card>
      <app-mini-card icone="attach_money" title="salarios" [valor]="totalSalarioBase() " />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class FuncionarioCard {
  funcionarioStore = inject(FuncionarioStore);
  totalSalarioBase = signal<string | number>('');

  constructor() {
    effect(() => {
      this.totalSalarioBase.set(`R$ ${this.funcionarioStore.totalSalarioBase()}`);
    });
  }
}
