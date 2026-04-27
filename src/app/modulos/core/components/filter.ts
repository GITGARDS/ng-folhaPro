import { Component, output } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-filter',
  imports: [MatIcon, MatCardModule],
  template: `
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="sm:max-w-[260px] w-full flex gap-2 px-2 rounded-lg border-2">
        <div class="flex items-center">
          <mat-icon class="!text-[var(--var-fundo]">search</mat-icon>
        </div>
        <div>
          <input class="p-2 border-none outline-0 text-lg" (keyup)="applyFilter($event)" />
        </div>
      </div>
      <button matButton="filled" (click)="onCreate.emit()" matTooltip="Adicionar um novo registro">
        <span>Novo</span>
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Filter {
  onCreate = output();
  filtro = output<string>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtro.emit(filterValue.trim().toLowerCase());
  }
}
