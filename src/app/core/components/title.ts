import { TitleCasePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-title',
  imports: [MatIcon, TitleCasePipe, MatCardModule],
  template: `
  <mat-card appearance="filled">
    <mat-card-header>
      <div mat-card-avatar>
        <mat-icon class="!flex !h-auto !w-auto !text-3xl">{{ icone() }}</mat-icon>
      </div>
      <mat-card-title>{{title() | titlecase}}</mat-card-title>
    </mat-card-header>
  </mat-card>
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
