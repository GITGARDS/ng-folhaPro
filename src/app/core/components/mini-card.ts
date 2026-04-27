import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon],
  template: `
    <!-- 'outlined' | 'raised' | 'filled'; -->
    <div
      class="sm:max-w-[260px] w-full h-20 flex items-center justify-between p-2 gap-4 rounded-lg bg-[var(--var-fundo)] group hover:bg-[var(--var-fundo)]/80
      "
    >
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span
            class="text-md font-semibold capitalize text-[var(--var-texto)]"
            >{{ this.title() }}</span
          >
        </div>
        <div class="text-[var(--var-texto)] text-2xl font-bold text-shadow-lg">
          <ng-content #content />
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div
          class="h-10 w-10 flex items-center justify-center p-2 rounded-lg bg-[var(--var-fundo)] group-hover:bg-[var(--var-fundo)]/80"
        >
          <mat-icon
            class="!text-[var(--var-texto)]  group-hover:!text-[var(--var-texto)]/80"
            >{{ this.icone() }}</mat-icon
          >
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
  icone = input.required<string>();
  title = input.required<string>();
  appearance = input.required<any>();
}
