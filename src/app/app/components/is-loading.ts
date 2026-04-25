import { Component, input } from "@angular/core";

@Component({
  selector: 'app-is-loading',
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="absolute w-full inset-0 z-30">
        <div class="bg-[var(--mat-sys-on-primary)]">
          <div class="animate-pulse">
            <div class="rounded-md border border-gray-200 p-2">
              <div class="flex flex-col gap-4">
                <!-- titulo -->
                <div class="flex items-center gap-2 rounded-lg p-6" [class]="bg"></div>
                <!-- card -->
                <div class="w-[230px] h-[100px] rounded-3xl" [class]="bg"></div>
                <!-- filter -->
                <div class="w-full h-[47px] rounded-3xl overflow-hidden">
                  <div class="flex justify-between h-full">
                    <div class="w-[260px] rounded-3xl" [class]="bg"></div>
                    <div class="w-[100px] rounded-3xl" [class]="bg"></div>
                  </div>
                </div>
                <!-- table -->
                <div class="w-full h-[490px] rounded-2xl" [class]="bg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class IsLoading {
  isLoading = input.required<boolean>();
  bg = 'bg-[var(--mat-sys-surface-variant)]';
}
