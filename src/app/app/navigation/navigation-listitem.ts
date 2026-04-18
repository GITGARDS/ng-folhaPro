import { Component, inject, input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NavigationService } from "../../services/navigation";
import { NavItens } from "./navigation";

@Component({
  selector: 'app-navigation-listitem',
  imports: [MatListModule, RouterLink, MatIcon, RouterLink, RouterLinkActive],
  template: `
    <mat-list-item
      [activated]="router.url === item().url ? true : false"
      [routerLink]="item().url"
      routerLinkActive="!bg-[#d8d7db]"
      (click)="navigationservice.menuShow.set(false)"
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
  navigationservice = inject(NavigationService);
  item = input.required<NavItens>();
  router = inject(Router);
}
