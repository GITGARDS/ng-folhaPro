import { Component, inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltip } from "@angular/material/tooltip";
import { EmpresaStore } from "../../../store/empresa.store";

@Component({
  selector: 'app-header-auth-empresa',
  imports: [MatIcon, MatTooltip, MatMenuModule, MatDivider, MatIconButton],
  template: `
    <div>
      <!-- type TooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after'; -->
      @if (empresaStore.empresaLogada().isLogada) {
        <div>
          <button
            matIconButton
            [matMenuTriggerFor]="menu"
            aria-label="Example icon-button with a menu"
            [matTooltip]="empresaStore.empresaLogada().empresa.nomeEmpresaRazaoSocial"
            matTooltipPosition="above"
          >
            <mat-icon class="!text-[var(--var-texto)]">account_circle</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <div class="flex flex-col p-2 gap-2">
              <h3 class="">{{ empresaStore.empresaLogada().empresa.nomeEmpresaRazaoSocial }}</h3>
              <p class="text-[10px]">{{ empresaStore.empresaLogada().empresa.email }}</p>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="empresaStore.logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class HeaderAuthEmpresa {
  empresaStore = inject(EmpresaStore);
}
