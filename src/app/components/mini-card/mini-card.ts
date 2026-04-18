import { CurrencyPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [CurrencyPipe, MatIcon],
  template: `
    <div class="w-[200px]">
      <div class="flex justify-between items-center gap-10 bg-gray-100 rounded-2xl p-4 shadow shadow-gray-200">
        <span class="font-normal text-blue-900 text-shadow text-shadow-2xs text-shadow-gray-200">
          {{ valor() | currency: 'BRL' }}
        </span>
        <div class="flex items-center bg-blue-200 p-2 rounded-lg">
          <mat-icon class="!text-blue-900">{{ icon() }}</mat-icon>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class MiniCard {
  valor = input.required<number>();
  icon = input.required<string>();
}
