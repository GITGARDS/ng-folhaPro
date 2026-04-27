import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Observable, map, shareReplay } from "rxjs";
import { NavigationService } from "../../navigation/navigation.service";

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
        <mat-icon aria-label="Side nav toggle icon" class="!text-[var(--var-texto)]">menu</mat-icon>
      </button>

      <div class="flex items-center gap-2">
        <div class="h-8 w-8 flex items-center justify-center rounded-full bg-[var(--var-fundo)]">
          <p class="font-bold text-lg text-[var(--var-texto)]">FP</p>
        </div>
        @if (isHandset$ | async) {
        } @else {
          <span class="font-bold text-[var(--var-texto)] text-sm">FolhaPro</span>
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
