import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-funcionario-card',
  imports: [MatIcon],
  template: `
    <div
      class="min-w-[250px] p-2 flex justify-between items-center gap-4 bg-[#e8f0fe] rounded-full hover:bg-gray-200 transition-colors duration-100 cursor-default"
    >
      <div class="flex items-center bg-purple-900  p-2 rounded-full">
        <mat-icon class="!text-white">
          {{ icon() }}
        </mat-icon>
      </div>

      <div class="flex-1 items-center gap-4">
        <p class="font-bold text-shadow tracking-wider ">
          {{ title() }}
        </p>

        <span class="font-light text-shadow tracking-wider">
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
