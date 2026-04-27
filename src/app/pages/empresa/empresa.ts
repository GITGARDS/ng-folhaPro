import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IsLoading } from "../../core/components/is-loading";
import { Title } from "../../core/components/title";
import FuncionarioCard from "../funcionario/funcionario-card";
import { FuncionarioStore } from "../funcionario/shared/funcionario.store";
import { EmpresaList } from "./empresa-list";
import { EmpresaStore } from "./shared/empresa.store";

@Component({
  selector: 'app-empresa',
  imports: [EmpresaList, CommonModule, Title, IsLoading, FuncionarioCard],
  template: `
    <div class="grid grid-cols-6 gap-2 mt-4">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/empresa.png" alt="cadastros" class="object-contain" />
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4 relative">
        <div class="p-2">
          <app-is-loading [isLoading]="empresaStore.isLoading()" />
          <div class="flex flex-col gap-2">
            <app-title [icone]="'business'" [title]="title" />
            <app-funcionario-card />
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
