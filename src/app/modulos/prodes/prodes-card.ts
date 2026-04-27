import { Component, inject } from "@angular/core";
import { MiniCard } from "../core/components/mini-card";
import { ProdesStore } from "./shared/prodes.store";

@Component({
  selector: 'app-prodes-card',
  imports: [MiniCard],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
      <app-mini-card [icone]="'person_add'" [title]="'ativos'" [appearance]="'filled'">
        <ng-container>
          <span>
            {{ this.prodesStore.totalProdesAtivos().length }}
          </span>
        </ng-container>
      </app-mini-card>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class ProdesCard {
  prodesStore = inject(ProdesStore);
}
