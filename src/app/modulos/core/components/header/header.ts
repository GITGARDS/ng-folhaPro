import { Component } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { HeaderAuthEmpresa } from "./header-auth-empresa";
import { HeaderLogo } from "./header-logo";
import { HeaderTheme } from "./header-theme";
import { HeaderVersao } from "./header-versao";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderLogo, HeaderTheme, HeaderAuthEmpresa, HeaderVersao],
  template: `
    <mat-toolbar class="flex justify-between !bg-[var(--var-fundo)]">
      <div class="flex items-center gap-2">
        <app-header-logo />
        <app-header-versao />
      </div>

      <div class="flex items-center gap-2">
        <app-header-auth-empresa />
        <app-header-theme />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {}
