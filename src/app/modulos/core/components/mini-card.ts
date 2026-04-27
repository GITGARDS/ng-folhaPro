import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon, MatCardModule],
  template: `
    <!-- 'outlined' | 'raised' | 'filled'; -->

    <mat-card
      class="sm:!max-w-[260px] !w-full !h-20 !bg-[var(--var-fundo)] group hover:!bg-[var(--var-fundo)]/80"
    >
      <mat-card-header>
        <div mat-card-avatar>
          <div
            class="h-10 w-10 flex items-center justify-center p-2 rounded-lg bg-[var(--var-fundo)] group-hover:bg-[var(--var-fundo)]/80"
          >
            <mat-icon class="!text-[var(--var-texto)]  group-hover:!text-[var(--var-texto)]/80">{{
              this.icone()
            }}</mat-icon>
          </div>
        </div>
        <div mat-card-title>
          <span class="capitalize text-[var(--var-texto)]">{{
            this.title()
          }}</span>
        </div>
        <div
          mat-card-subtitle
          class="!text-[var(--var-texto)]"
        >
          <ng-content #content />
        </div>
      </mat-card-header>
    </mat-card>
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
