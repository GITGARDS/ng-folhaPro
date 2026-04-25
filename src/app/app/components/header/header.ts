import { Component } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { HeaderAuth } from "./header-auth";
import { HeaderEmpresa } from "./header-empresa";
import { HeaderLogo } from "./header-logo";
import { HeaderTheme } from "./header-theme";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderLogo, HeaderAuth, HeaderTheme, HeaderEmpresa],
  template: `
    <mat-toolbar class="flex justify-between !bg-[#d7e3ff]">
      <app-header-logo />
      <app-header-empresa />
      <div class="flex items-center gap-2">
        <app-header-auth />
        <app-header-theme />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {}
