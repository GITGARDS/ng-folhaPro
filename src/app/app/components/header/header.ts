import { Component } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { HeaderAuth } from "./header-auth";
import { HeaderLogo } from "./header-logo";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderLogo, HeaderAuth],
  template: `
    <mat-toolbar class="flex justify-between">
      <app-header-logo />
      <app-header-auth />
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {}
