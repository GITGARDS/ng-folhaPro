import { CurrencyPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [CurrencyPipe, MatIcon],
  template: `
    <div
      class="w-[256px] h-[128px] flex justify-between items-center gap-10 bg-gray-100 rounded-3xl px-8 group hover:bg-gray-200 transition-colors duration-100"
    >
      <div>
        <p class="text-lg font-bold text-gray-500 text-shadow tracking-wider">Saldo</p>
        <span class="text-sm font-normal text-gray-500 text-shadow tracking-wider">
          {{ valor() | currency: 'BRL' }}
        </span>
      </div>
      <div
        class="flex items-center bg-[#c2e7ff] p-2 group-hover:bg-blue-900 rounded-lg transition-colors duration-100"
      >
        <mat-icon
          class="!text-blue-900 group-hover:!text-[#c2e7ff] transition-colors duration-100"
          >{{ icon() }}</mat-icon
        >
      </div>
    </div>
  `,
  styles: `
  `,
})
export class MiniCard {
  valor = input.required<number>();
  icon = input.required<string>();
}
