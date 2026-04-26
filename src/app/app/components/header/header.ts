import { Component } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { HeaderAuth } from "./header-auth";
import { HeaderAuthEmpresa } from "./header-auth-empresa";
import { HeaderLogo } from "./header-logo";
import { HeaderTheme } from "./header-theme";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderLogo, HeaderAuth, HeaderTheme, HeaderAuthEmpresa],
  template: `
    <mat-toolbar class="flex justify-between !bg-[var(--var-fundo)]">
      <app-header-logo />
      <div class="flex items-center gap-2">
        <app-header-auth-empresa />
        <app-header-theme />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {}
