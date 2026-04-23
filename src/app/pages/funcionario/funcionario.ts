import { CommonModule, CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { IsLoading } from "../../app/components/is-loading";
import { IsLoading } from "../../app/components/is-loading";
import { MiniCard } from "../../app/components/mini-card";
import { FuncionarioStore } from "../../store/funcionario.store";
import { FuncionarioList } from "./funcionario-list/funcionario-list";
@Component({
  selector: 'app-funcionario',
  imports: [
    TitleCasePipe,
    FuncionarioList,
    CommonModule,
    CurrencyPipe,
    MiniCard,
    MatProgressSpinnerModule,
    IsLoading,
  ],
  template: `
    <div class="grid grid-cols-6 gap-2">
      <section class="hidden sm:flex sm:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/funcionario.png" alt="cadastros" class="object-contain" />
        </div>
      </section>
      <section class="col-span-6 sm:col-span-4 flex justify-center">
        <div class="p-4 border rounded-2xl relative">
          <app-is-loading [isLoading]="funcionarioStore.isLoading()" />
          <div class="max-w-[1000px] mx-auto">
            <div class="py-2">
              <h1 class="text-lg lg:text-3xl">{{ title | titlecase }}</h1>
            </div>
            <div class="py-2">
              <div class="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <app-mini-card
                  title="Ativos"
                  icon="people"
                  styleBg="bg-yellow-500 border-3 border-yellow-500"
                  styleText="text-gray-700"
                >
                  <ng-container valor>{{
                    this.funcionarioStore.totalfuncionariosAtivos().length
                  }}</ng-container>
                </app-mini-card>

                <app-mini-card
                  title="Salario"
                  icon="outlet"
                  styleBg="bg-emerald-500 border-3 border-emerald-500"
                  styleText="text-gray-100"
                >
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
      </section>
      <section class="hidden sm:flex sm:col-span-1 justify-center"></section>
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
  funcionarioStore = inject(FuncionarioStore);
}
