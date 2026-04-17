import { Component, inject, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NavItens } from "./navigation";

@Component({
  selector: 'app-navigation-listitem',
  imports: [MatListModule, RouterLink, MatIcon, RouterLinkActive, RouterLink],
  template: `
    <mat-list-item
      [activated]="router.url === item().url ? true : false"
      [routerLink]="item().url"
      routerLinkActive="!bg-red-100"
    >
      <mat-icon matListItemIcon>{{ item().icon }}</mat-icon>
      <span matListItemTitle>
        {{ item().label }}
      </span>
    </mat-list-item>
  `,
  styles: ``,
})
export class NavigationListItem {
  item = input.required<NavItens>();
  router = inject(Router);
}
