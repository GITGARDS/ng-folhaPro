import { CommonModule, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";
import { IsLoading } from "../../app/components/is-loading";
import { ProdesStore } from "../../store/prodes.store";
import { ProdesList } from "./prodes-list/prodes-list";

@Component({
  selector: 'app-prodes',
  imports: [TitleCasePipe, ProdesList, CommonModule, IsLoading, MatChipsModule, MatIcon],
  template: `
    <div class="grid grid-cols-6 gap-2">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/prodes.png" alt="cadastros" class="object-contain" />
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4">
        <div class="p-2 border-2 border-gray-300 rounded-2xl relative">
          <app-is-loading [isLoading]="prodesStore.isLoading()" />

          <div class="flex flex-col gap-2">
            <h1 class="text-2xl">{{ title | titlecase }}</h1>

            <mat-chip-set>
              <mat-chip class="!bg-[var(--mat-sys-primary)]">
                <div class="flex items-center gap-2">
                  <mat-icon class="!text-[var(--mat-sys-primary-container)]">people</mat-icon>
                  <span class="!text-[var(--mat-sys-primary-container)]">
                    {{ this.prodesStore.totalProdesAtivos().length }} Ativos
                  </span>
                </div>
              </mat-chip>
            </mat-chip-set>
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
