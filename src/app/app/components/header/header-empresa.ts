import { Component, inject } from "@angular/core";
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { EmpresaStore } from "../../../store/empresa.store";

@Component({
  selector: 'app-header-empresa',
  imports: [MatIcon, MatAnchor, MatTooltip],
  template: `
    <div>
      @if (empresaStore.empresaLogada()?.id) {
        <button matButton="filled" (click)="deslogar()" matTooltip="Logout">
          {{ empresaStore.empresaLogada()?.nomeEmpresaRazaoSocial }}
          <mat-icon>logout</mat-icon>
        </button>
      } @else {
        <mat-icon matTooltip="Fazer Login">block</mat-icon>
      }
    </div>
  `,
  styles: ``,
})
export class HeaderEmpresa {
  empresaStore = inject(EmpresaStore);
  router = inject(Router);
  deslogar() {
    this.empresaStore.deslogar();
    if (this.router.url === '/funcionarios') {
      this.router.navigate(['/empresa']);
      return;
    }
    this.router.navigate(['/funcionarios']);
  }
}
