import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [MatCardModule, MatIcon],
  template: `
    <!-- 'outlined' | 'raised' | 'filled'; -->
    <mat-card class="sm:max-w-[260px] w-full h-25" appearance="filled">
      <mat-card-header>
        <div mat-card-avatar>          
              <mat-icon class="">{{ this.icone() }}</mat-icon>
        </div>
        <mat-card-title>{{title()}}</mat-card-title>
        <mat-card-subtitle></mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ng-content #content />
      </mat-card-content>
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
