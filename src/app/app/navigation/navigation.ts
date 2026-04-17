import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterOutlet } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NavigationListItem } from "./navigation-listitem";

export type NavItens = {
  label: string;
  url: string;
  icon: string;
};

@Component({
  selector: 'app-navigation',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    NavigationListItem,
  ],

  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          @for (item of navItens(); track item.label) {
            <app-navigation-listitem [item]="item" />
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          @if (isHandset$ | async) {
            <button
              type="button"
              aria-label="Toggle sidenav"
              matIconButton
              (click)="drawer.toggle()"
            >
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
          }
          <div class="flex items-center gap-1">
            <span
              class="font-bold bg-blue-700 text-blue-100 text-shadow-md text-shadow-gray-400 p-2 rounded-lg border-3 border-gray-400"
              >FP</span
            >
            @if (isHandset$ | async) {
            } @else {
              <span class="font-bold text-blue-800 text-shadow-md text-shadow-blue-100"
                >FolhaPro</span
              >
            }
          </div>
        </mat-toolbar>
        <div class="p-10">
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 200px;
    }

    .sidenav .mat-toolbar {
      background: inherit;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `,
})
export class Navigation {
  router = inject(Router);

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  navItens = signal<NavItens[]>([
    {
      label: 'Dashboard',
      url: 'dashboard',
      icon: 'dashboard',
    },
    {
      label: 'Funcionários',
      url: 'funcionarios',
      icon: 'people',
    },
  ]);
}
