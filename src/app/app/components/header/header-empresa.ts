import { Component, inject } from "@angular/core";
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { EmpresaStore } from "../../../store/empresa.store";

@Component({
  selector: 'app-header-empresa',
  imports: [MatIcon, MatAnchor, MatTooltip],
  template: `
    <div>
      @if (empresaStore.empresaLogada().isLogada) {
        <button matButton="filled" (click)="empresaStore.logout()" matTooltip="Logout">
          {{ empresaStore.empresaLogada().empresa.nomeEmpresaRazaoSocial }}
          <mat-icon>logout</mat-icon>
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class HeaderEmpresa {
  empresaStore = inject(EmpresaStore);
}
