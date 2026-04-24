import { CommonModule, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { IsLoading } from "../../app/components/is-loading";
import { EmpresaStore } from "../../store/empresa.store";
import { EmpresaList } from "./empresa-list/empresa-list";

@Component({
  selector: 'app-empresa',
  imports: [
    TitleCasePipe,
    EmpresaList,
    CommonModule,
    MatProgressSpinnerModule,
    IsLoading,
    MatIcon,
    MatChipsModule,
  ],
  template: `
    <div class="grid grid-cols-6 gap-2">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/empresa.png" alt="cadastros" class="object-contain" />
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4">
        <div class="p-2 border-2 border-gray-300 rounded-2xl relative">
          <app-is-loading [isLoading]="empresaStore.isLoading()" />
          <div class="flex flex-col gap-2">
            <h1 class="text-2xl">{{ title | titlecase }}</h1>
            <mat-chip-set>
              <mat-chip class="!bg-[var(--mat-sys-primary)]">
                <div class="flex items-center gap-2">
                  <mat-icon class="!text-[var(--mat-sys-primary-container)]">people</mat-icon>
                  <span class="!text-[var(--mat-sys-primary-container)]"> {{ 50 }} Funcionarios </span>
                </div>
              </mat-chip>
            </mat-chip-set>
            <app-empresa-list />
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg:col-span-1 justify-center"></section>
    </div>
  `,
  styles: ``,
})
export default class Empresa {
  title = 'empresa';
  empresaStore = inject(EmpresaStore);
}
