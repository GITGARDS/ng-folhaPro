import { CommonModule, TitleCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MiniCard } from "../../app/components/mini-card";
import { EmpresaStore } from "../../store/empresa.store";
import { EmpresaList } from "./empresa-list/empresa-list";

@Component({
  selector: 'app-empresa',
  imports: [TitleCasePipe, EmpresaList, CommonModule, MiniCard, MatProgressSpinnerModule],
  template: `
    <div class="p-4 border rounded-2xl relative">
      @if (empresaStore.isLoading()) {
        <div
          class="absolute w-full h-full top-0 left-0 bg-white/30 backdrop-blur-sm rounded-2xl z-199 flex items-center justify-center"
        >
          <mat-spinner></mat-spinner>
        </div>
      }
      <div class="max-w-[1000px] mx-auto">
        <div class="py-2">
          <h1 class="text-lg lg:text-3xl">{{ title | titlecase }}</h1>
        </div>
        <div class="py-2">
          <div class="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <app-mini-card
              title="Funcionarios"
              icon="group"
              styleBg="bg-slate-500 border-3 border-slate-500"
              styleText="text-white"
            >
              <ng-container valor>{{ 12 }}</ng-container>
            </app-mini-card>
          </div>
        </div>
        <div class="my-4">
          <app-empresa-list />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Empresa {
  title = 'empresa';
  empresaStore = inject(EmpresaStore);
}
