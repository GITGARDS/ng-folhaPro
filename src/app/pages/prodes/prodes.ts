import { CommonModule, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IsLoading } from "../../app/components/is-loading";
import { MiniCard } from "../../app/components/mini-card";
import { ProdesStore } from "../../store/prodes.store";
import { ProdesList } from "./prodes-list/prodes-list";

@Component({
  selector: 'app-prodes',
  imports: [TitleCasePipe, ProdesList, CommonModule, MiniCard, IsLoading],
  template: `
    <div class="grid grid-cols-6 gap-2">
      <section class="hidden sm:flex sm:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/prodes.png" alt="cadastros" class="object-contain" />
        </div>
      </section>
      <section class="col-span-6 sm:col-span-4 flex justify-center">
        <div class="p-4 border rounded-2xl relative">
          <app-is-loading [isLoading]="prodesStore.isLoading()" />
          <div class="max-w-[1000px] mx-auto">
            <div class="py-2">
              <h1 class="text-lg lg:text-3xl">{{ title | titlecase }}</h1>
            </div>
            <div class="py-2">
              <div class="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <app-mini-card
                  title="Ativos"
                  icon="people"
                  styleBg="bg-purple-500 border-3 border-purple-500"
                  styleText="text-white"
                >
                  <ng-container valor>{{
                    this.prodesStore.totalProdesAtivos().length
                  }}</ng-container>
                </app-mini-card>
              </div>
            </div>
            <div class="my-4">
              <app-prodes-list />
            </div>
          </div>
        </div>
      </section>
      <section class="hidden sm:flex sm:col-span-1 justify-center"></section>
    </div>
  `,
  styles: ``,
})
export default class Prodes {
  title = 'Provento/Desconto';
  prodesStore = inject(ProdesStore);
}
