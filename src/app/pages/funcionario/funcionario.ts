import { Component, inject } from "@angular/core";
import { IsLoading } from "../../core/components/is-loading";
import { Title } from "../../core/components/title";
import FuncionarioCard from "./funcionario-card";
import { FuncionarioList } from "./funcionario-list";
import { FuncionarioStore } from "./shared/funcionario.store";

@Component({
  selector: 'app-funcionario',
  imports: [FuncionarioList, IsLoading, Title, FuncionarioCard],
  template: `
    <div class="grid grid-cols-6 gap-2 mt-4">
      <section class="hidden lg:flex lg:col-span-1 justify-center">
        <div class="flex items-start">
          <img src="imagens/cadastros/funcionario.png" alt="cadastros" class="object-contain" />
        </div>
      </section>

      <section class="col-span-6 lg:col-span-4">
        <div class="relative p-2">
          <app-is-loading [isLoading]="funcionarioStore.isLoading()" />
          <div class="flex flex-col gap-2">
            <app-title [icone]="'people'" [title]="title" />
            <app-funcionario-card />
            <app-funcionario-list />
          </div>
        </div>
      </section>
      <section class="hidden lg:flex lg:col-span-1 justify-center"></section>
    </div>
  `,
  styles: ``,
})
export default class Funcionario {
  title = 'funcionarios';
  funcionarioStore = inject(FuncionarioStore);
}
