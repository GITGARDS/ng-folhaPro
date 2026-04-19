import { Component, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-funcionario-card',
  imports: [MatIcon],
  template: `
    <div
      class="w-[256px] h-[128px] flex justify-between items-center gap-10 bg-gray-100 rounded-3xl px-8 group hover:bg-gray-200 transition-colors duration-100 border-2 border-dashed border-gray-300"
    >
      <div>
        <p class="block-12 text-sm text-gray-500 text-shadow tracking-wider">
          {{ title() }}
        </p>
        <span class="text-lg font-bold text-gray-500 text-shadow tracking-wider">
          <ng-content select="[valor]" />
        </span>
      </div>
      <div
        class="flex items-center bg-[#c2e7ff] p-2 group-hover:bg-blue-900 rounded-lg transition-colors duration-100"
      >
        <mat-icon class="!text-blue-900 group-hover:!text-[#c2e7ff] transition-colors duration-100">
          {{ icon() }}
        </mat-icon>
      </div>
    </div>
  `,
  styles: ``,
})
export class FuncionarioCard {
  title = input.required<string>();
  icon = input.required<string>();
}
