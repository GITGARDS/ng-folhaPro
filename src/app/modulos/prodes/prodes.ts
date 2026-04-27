import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IsLoading } from "../core/components/is-loading";
import { Title } from "../core/components/title";
import ProdesCard from "./prodes-card";
import { ProdesList } from "./prodes-list";
import { ProdesStore } from "./shared/prodes.store";

@Component({
  selector: 'app-prodes',
  imports: [ProdesList, CommonModule, IsLoading, Title, ProdesCard],
  template: `
    <div class="grid grid-cols-6 gap-2 mt-4">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/prodes.png" alt="cadastros" class="object-contain" />
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4">
        <div class="relative p-2">
          <app-is-loading [isLoading]="prodesStore.isLoading()" />
          <div class="flex flex-col gap-2">
            <app-title [icone]="'compare_arrows'" [title]="title" />
            <app-prodes-card />
            <app-prodes-list />
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg:col-span-1 justify-center"></section>
    </div>
  `,
  styles: ``,
})
export default class Prodes {
  title = 'Provento/Desconto';
  prodesStore = inject(ProdesStore);
}
