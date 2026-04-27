import { Component } from "@angular/core";
import { version } from "../../../../../../package.json";

@Component({
  selector: 'app-header-versao',
  imports: [],
  template: ` <div class="font-bold text-[var(--var-texto)] text-xs">v:{{versao}}</div> `,
  styles: ``,
})
export class HeaderVersao {
  readonly versao = version;
}
