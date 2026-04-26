import { Component } from "@angular/core";

@Component({
  selector: 'app-is-loading',
  imports: [],
  template: `
    @let bgEl = 'bg-indigo-200';
    @let animate = 'animate-pulse';

    <div class="absolute w-full h-full rounded-lg inset-0 z-10 p-2 bg-white">
      <div [class]="animate">
        <div class="flex flex-col gap-8">
          @for (item of [1, 2]; track $index) {
            <div>
              <div class="h-10 w-1/2 rounded-lg mb-2" [class]="bgEl"></div>
              <div class="h-25 rounded-lg mb-8" [class]="bgEl"></div>

              <div class="flex flex-col gap-2">
                @for (item of [1, 2]; track $index) {
                  <div class="flex space-x-2">
                    <div class="size-8 rounded-full" [class]="bgEl"></div>
                    <div class="flex-1 space-y-6 py-1">
                      <div class="h-2 rounded" [class]="bgEl"></div>
                      <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                          <div class="col-span-2 h-2 rounded" [class]="bgEl"></div>
                          <div class="col-span-1 h-2 rounded" [class]="bgEl"></div>
                        </div>
                        <div class="h-2 rounded" [class]="bgEl"></div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class IsLoading {}
