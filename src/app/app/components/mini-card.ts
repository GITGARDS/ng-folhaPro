import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-mini-card',
  imports: [MatIcon],
  template: `
    <div
      class="p-2 w-full sm:min-w-[250px] flex justify-between items-center gap-4 border bg-gray-50 rounded-full shadow-sm"
    >
      <div class="flex items-center p-2 rounded-full border">
        <mat-icon>
          {{ icon() }}
        </mat-icon>
      </div>

      <div class="flex-1 items-center gap-4">
        <p>
          {{ title() }}
        </p>

        <span>
          <ng-content select="[valor]" />
        </span>
      </div>
    </div>
  `,
  styles: ``,
})
export class MiniCard {
  title = input.required<string>();
  icon = input.required<string>();
}
