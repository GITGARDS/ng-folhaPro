import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, inject, signal } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { Observable, map, shareReplay } from "rxjs";
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: 'app-header-auth',
  imports: [MatIcon, MatIconButton, MatMenuTrigger, MatMenu, MatMenuItem, MatDivider, MatButton],
  template: `
    <div class="flex items-center gap-2">
      <button
        type="button"
        aria-label="Toggle sidenav"
        matButton="tonal"
        [hidden]="login()"
        (click)="login.set(true)"
      >
        <span class="!text-[var(--mat-sys-primary)]">Login</span>
        <mat-icon class="!text-[var(--mat-sys-primary)]">login</mat-icon>
      </button>

      <div [hidden]="!login()">
        <button
          matIconButton
          [matMenuTriggerFor]="menu"
          aria-label="Example icon-button with a menu"
        >
          <mat-icon class="!text-[var(--mat-sys-primary)]">account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <div class="py-4">
            <div mat-menu-item>
              <div class="flex flex-col items-center">
                <span class="font-bold">Admin</span>
                <span class="font-light">John Doe</span>
              </div>
            </div>
            <mat-divider />
            <button mat-menu-item (click)="login.set(false)">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </div>
        </mat-menu>
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderAuth {
  navigationService = inject(NavigationService);
  private breakpointObserver = inject(BreakpointObserver);
  login = signal<boolean>(false);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}
