import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Observable, map, shareReplay } from "rxjs";
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: 'app-header-logo',
  imports: [AsyncPipe, MatIcon, MatIconButton],
  template: `
    <div class="flex items-center gap-2">
      <button
        type="button"
        aria-label="Toggle sidenav"
        matIconButton
        (click)="navigationService.menuShow.set(!navigationService.menuShow())"
      >
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
      <div class="flex items-center gap-1">
        <span
          class="font-bold bg-lime-500 text-lime-900 text-shadow-md text-shadow-lime-100 p-2 rounded-lg border-3 border-lime-800 shadow-lg shadow-mist-400"
          >FP</span
        >
        @if (isHandset$ | async) {
        } @else {
          <span class="font-bold text-blue-800 text-shadow-md text-shadow-blue-100">FolhaPro</span>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderLogo {
  navigationService = inject(NavigationService);

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}
