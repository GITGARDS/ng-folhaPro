import { TitleCasePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-title',
  imports: [MatIcon, TitleCasePipe],
  template: `
    <div class="flex items-center gap-2 rounded-lg bg-[var(--mat-sys-on-primary-container)]">
      <div class="flex items-center p-2">
        <mat-icon class="!flex !h-auto !w-auto !text-3xl !text-[var(--mat-sys-on-primary)]">{{ icone() }}</mat-icon>
      </div>
      <h2 class="text-lg sm:text-2xl font-bold text-shadow-sm text-[var(--mat-sys-on-primary)]">{{ title() | titlecase }}</h2>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Title {
  icone = input.required<string>();
  title = input.required<string>();
}
