import { CurrencyPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IsLoading } from "../../app/components/is-loading";
import { MiniCard } from "../../app/components/mini-card";
import { Title } from "../../app/components/title";
import { FuncionarioStore } from "../../store/funcionario/funcionario.store";
import { FuncionarioList } from "./funcionario-list/funcionario-list";

@Component({
  selector: 'app-funcionario',
  imports: [FuncionarioList, IsLoading, MiniCard, CurrencyPipe, Title],
  template: `
    <div class="grid grid-cols-6 gap-2 mt-4">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/funcionario.png" alt="cadastros" class="object-contain" />
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4">
        <div class="relative p-2">
          @if (funcionarioStore.isLoading()) {
            <app-is-loading />
          }

          <div class="flex flex-col gap-2">
            <app-title [icone]="'people'" [title]="title" />
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
            <app-funcionario-list />
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg:col-span-1 justify-center"></section>
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
  funcionarioStore = inject(FuncionarioStore);
}
