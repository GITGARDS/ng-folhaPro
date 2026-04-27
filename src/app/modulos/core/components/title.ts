import { TitleCasePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-title',
  imports: [MatIcon, TitleCasePipe, MatCardModule, MatDivider],
  template: `
    <div class="flex items-center gap-2 mb-2">
      <div>
        <mat-icon class="!text-lg !text-[var(--var-fundo)] !flex !items-center !h-auto !w-auto">{{
          icone()
        }}</mat-icon>
      </div>
      <span class="text-lg sm:text-5xl font-bold text-shadow-sm text-[var(--var-fundo)]">
        {{ title() | titlecase }}
      </span>
    </div>
    <mat-divider class="!mb-2" />
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
