import { Component, signal } from "@angular/core";
import { Navigation } from "./modulos/core/navigation/navigation";

@Component({
  selector: 'app-root',
  imports: [Navigation],
  template: ` <app-navigation /> `,
  styles: [],
})
export class App {
  protected readonly title = signal('ng-folhaPro');
  constructor() {}
}
