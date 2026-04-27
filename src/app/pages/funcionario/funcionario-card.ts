import { CurrencyPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MiniCard } from "../../core/components/mini-card";
import { FuncionarioStore } from "./shared/funcionario.store";

@Component({
  selector: 'app-funcionario-card',
  imports: [MiniCard, CurrencyPipe],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
      <app-mini-card [icone]="'person_add'" [title]="'ativos'" [appearance]="'filled'">
        <ng-container>
          <span>
            {{ funcionarioStore.totalfuncionariosAtivos().length }}
          </span>
        </ng-container>
      </app-mini-card>
      <app-mini-card [icone]="'attach_money'" [title]="'salarios'" [appearance]="'filled'">
        <ng-container>
          <span>
            {{ funcionarioStore.totalSalarioBase() | currency }}
          </span>
        </ng-container>
      </app-mini-card>
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
}
