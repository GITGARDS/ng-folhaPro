import { TitleCasePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-title',
  imports: [MatIcon, TitleCasePipe, MatCardModule],
  template: `
    <mat-card class="!bg-[var(--var-fundo)]">
      <mat-card-header>
        <div mat-card-avatar>
          <mat-icon class="!text-3xl !text-[var(--var-texto)] !flex !h-auto !w-auto">{{
            icone()
          }}</mat-icon>
        </div>
        <div mat-card-title>
          <span class="text-lg sm:text-2xl font-bold text-shadow-sm text-[var(--var-texto)]">
            {{ title() | titlecase }}
          </span>
        </div>
      </mat-card-header>
    </mat-card>

    <!-- <div class="flex items-center gap-2 rounded-lg bg-[var(--var-fundo)]">
      <div class="flex items-center p-2">
        <mat-icon class="!flex !h-auto !w-auto !text-3xl !text-[var(--var-texto)]">{{
          icone()
        }}</mat-icon>
      </div>
      <h2 class="text-lg sm:text-2xl font-bold text-shadow-sm text-[var(--var-texto)]">
        {{ title() | titlecase }}
      </h2>
    </div> -->
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
