import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IsLoading } from "../../app/components/is-loading";
import { MiniCard } from "../../app/components/mini-card";
import { Title } from "../../app/components/title";
import { EmpresaStore } from "../../store/empresa.store";
import { FuncionarioStore } from "../../store/funcionario.store";
import { EmpresaList } from "./empresa-list/empresa-list";

@Component({
  selector: 'app-empresa',
  imports: [EmpresaList, CommonModule, MiniCard, Title, IsLoading],
  template: `
    <div class="grid grid-cols-6 gap-2">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/empresa.png" alt="cadastros" class="object-contain" />
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4 relative">
        <div class="p-2">
          <app-is-loading [isLoading]="empresaStore.isLoading()" [quantosCards]="[1]" />
          <div class="flex flex-col gap-2">
            <app-title [icone]="'business'" [title]="title" />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
              <app-mini-card
                [icone]="'person_add'"
                [title]="'funcionarios ativos'"
                [appearance]="'filled'"
              >
                <ng-container>
                  <span>
                    {{ this.funcionarioStore.totalfuncionariosAtivos().length }}
                  </span>
                </ng-container>
              </app-mini-card>
            </div>
            <app-empresa-list />
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg:col-span-1 justify-center"></section>
    </div>
  `,

  styles: ``,
})
export default class Empresa {
  title = 'empresa';
  empresaStore = inject(EmpresaStore);
  funcionarioStore = inject(FuncionarioStore);
}
