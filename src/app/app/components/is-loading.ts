import { Component, input } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-is-loading',
  imports: [MatProgressSpinner],
  template: `
    @if (isLoading()) {
      <div
        class="absolute w-full h-full top-0 left-0 bg-white/30 backdrop-blur-lg rounded-2xl z-199 flex justify-center border-8 border-dashed border-gray-300"
      >
        <mat-spinner class="mt-50"></mat-spinner>
      </div>
    }
  `,
  styles: ``,
})
export class IsLoading {
  isLoading = input.required<boolean>();
}
