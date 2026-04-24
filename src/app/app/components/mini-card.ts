import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [MatCardModule, MatIcon],
  template: `
    <div class="flex">
      <!-- 'outlined' | 'raised' | 'filled'; -->

      <mat-card [appearance]="this.appearance()">
        <mat-card-header>
          <mat-card-title>
            <div class="flex items-center gap-2">
              <mat-icon>{{ this.icone() }}</mat-icon>
              <span class="text-sm">{{ this.title() }}</span>
            </div>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-content #content />
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: ``,
})
export class MiniCard {
  icone = input.required<string>();
  title = input.required<string>();
  appearance = input.required<any>();
}
