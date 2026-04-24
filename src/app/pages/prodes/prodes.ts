import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IsLoading } from "../../app/components/is-loading";
import { MiniCard } from "../../app/components/mini-card";
import { Title } from "../../app/components/title";
import { ProdesStore } from "../../store/prodes.store";
import { ProdesList } from "./prodes-list/prodes-list";

@Component({
  selector: 'app-prodes',
  imports: [ProdesList, CommonModule, IsLoading, MiniCard, Title],
  template: `
    <div class="grid grid-cols-6 gap-2">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/prodes.png" alt="cadastros" class="object-contain" />
          <!-- <img src="imagens/cadastros/prodes.png" alt="cadastros" class="object-contain contrast-50" /> -->
          <!-- <img src="imagens/cadastros/prodes.png" alt="cadastros" class="object-contain blur-sm" /> -->
          <!-- <img src="imagens/cadastros/prodes.png" alt="cadastros" class="object-contain brightness-125" /> -->
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4">
        <div class="relative p-2">
          <app-is-loading [isLoading]="prodesStore.isLoading()" />

          <div class="flex flex-col gap-2">
            <app-title [icone]="'compare_arrows'" [title]="title"/>
            <div class="flex flex-wrap gap-2 py-2">
              <app-mini-card [icone]="'person_add'" [title]="'ativos'" [appearance]="'filled'">
                <ng-container>
                  <span>
                    {{ this.prodesStore.totalProdesAtivos().length }}
                  </span>
                </ng-container>
              </app-mini-card>
            </div>

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
