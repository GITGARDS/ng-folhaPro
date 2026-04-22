import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-funcionario-card',
  imports: [MatIcon],
  template: `
    <div
      class="p-2 w-full sm:min-w-[250px] flex justify-between items-center gap-4 bg-gray-50 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-100 cursor-default"
    >
      <div class="flex items-center bg-purple-900  p-2 rounded-full">
        <mat-icon class="!text-white">
          {{ icon() }}
        </mat-icon>
      </div>

      <div class="flex-1 items-center gap-4">
        <p class="font-bold text-shadow tracking-wider">
          {{ title() }}
        </p>

        <span class="text-[12px] sm:text-sm font-light text-shadow tracking-wider">
          <ng-content select="[valor]" />
        </span>
      </div>
    </div>
  `,
  styles: ``,
})
export class FuncionarioCard {
  title = input.required<string>();
  icon = input.required<string>();
}
