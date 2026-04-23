import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterOutlet } from "@angular/router";
import { NavigationService } from "../../services/navigation.service";
import { Header } from "../components/header/header";
import { HeaderLogo } from "../components/header/header-logo";
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
    RouterOutlet,
    NavigationListItem,
    Header,
    HeaderLogo,
  ],

  template: `
    <!-- fixedInViewport -->
    <!-- [mode]="(isHandset$ | async) ? 'over' : 'side'" -->
    <!-- [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'" -->
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedTopGap
        mode="over"
        [opened]="navigationService.menuShow()"
        (openedChange)="navigationService.menuShow.set($event)"
      >
        <!-- <mat-toolbar>Menu</mat-toolbar> -->
        <mat-toolbar>
          <app-header-logo />
        </mat-toolbar>

        <mat-nav-list>
          @for (item of navItens(); track item.label) {
            <app-navigation-listitem [item]="item" />
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header />
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
      width: 250px;
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
  navigationService = inject(NavigationService);
  router = inject(Router);

  navItens = signal<NavItens[]>([
    {
      label: 'Dashboard',
      url: 'dashboard',
      icon: 'dashboard',
    },
    {
      label: 'Empresa',
      url: 'empresa',
      icon: 'business',
    },
    {
      label: 'Funcionários',
      url: 'funcionarios',
      icon: 'people',
    },
    {
      label: 'Proventos/Descontos',
      url: 'prodes',
      icon: 'compare_arrows',
    },
  ]);
}
