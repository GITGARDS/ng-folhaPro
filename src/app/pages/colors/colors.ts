import { Component, signal } from "@angular/core";

@Component({
  selector: 'app-colors',
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col flex-wrap gap-2 border border-gray-300 p-4 rounded-2xl ">
        <span>Paleta</span>
        @for (item of paleta(); track $index) {
          <p style="background-color: var({{ item }});" class="p-2">{{ item }}</p>
        }
      </div>

      <div class="flex flex-col flex-wrap gap-2 border border-gray-300 p-4 rounded-2xl ">
        <span>Cores (Fundo/Superfície)</span>
        @for (item of fundosSuperficies(); track $index) {
          <p style="background-color: var({{ item }});" class="p-2">{{ item }}</p>
        }
      </div>
      <div class="flex flex-col flex-wrap gap-2 border border-gray-300 p-4 rounded-2xl ">
        <span>Cores (Destaque)</span>
        @for (item of coresDestaque(); track $index) {
          <p style="background-color: var({{ item }});" class="p-2">{{ item }}</p>
        }
      </div>
      <div class="flex flex-col flex-wrap gap-2 border border-gray-300 p-4 rounded-2xl ">
        <span>Tipografia</span>
        @for (item of tipografia(); track $index) {
          <p style="font: var({{ item }});" class="p-2">{{ item }}</p>
        }
      </div>
    </div>
  `,
  styles: `
    teste {
      background-color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium-font);
    }
  `,
})
export default class Colors {
  paleta = signal<any>([
    '--mat-sys-primary',
    '--mat-sys-on-primary',
    '--mat-sys-primary-container',
    '--mat-sys-on-primary-container',
  ]);
  fundosSuperficies = signal<any>([
    '--mat-sys-surface',
    '--mat-sys-on-surface',
    '--mat-sys-surface-variant',
    '--mat-sys-on-surface-variant',
  ]);
  coresDestaque = signal<any>(['--mat-sys-secondary', '--mat-sys-tertiary', '--mat-sys-error']);
  tipografia = signal<any>([
    '--mat-sys-body-large-font',
    '--mat-sys-title-medium-font',
    '--mat-sys-label-small-font',
  ]);
}
