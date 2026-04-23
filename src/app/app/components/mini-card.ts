import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon],
  template: `
    <div
      class="p-2 w-full sm:min-w-[250px] flex justify-between items-center gap-4 rounded-full shadow-md"
      [class]="styleBg()"
    >
      <div class="flex items-center p-2 rounded-full border">
        <mat-icon>
          <div [class]="styleText()">
            {{ icon() }}
          </div>
        </mat-icon>
      </div>

      <div class="flex-1 items-center gap-4">
        <p [class]="styleText()">
          {{ title() }}
        </p>

        <span [class]="styleText()">
          <ng-content select="[valor]" />
        </span>
      </div>
    </div>
  `,
  styles: ``,
})
export class MiniCard {
  title = input.required<string>();
  styleBg = input.required<string>();
  styleText = input.required<string>();
  icon = input.required<string>();
}
