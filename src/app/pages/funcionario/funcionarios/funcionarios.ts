import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTable, MatTableModule } from "@angular/material/table";
import { FuncionarioTableItem, FuncionarioTableds } from "./funcionarios-ds";

@Component({
  selector: 'app-funcionario-table',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem],

  template: `
    <div class="mat-elevation-z2">
      <table mat-table class="full-width-table" matSort aria-label="Elements">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="px-6 py-4 text-xs font-bold uppercase text-zinc-400 tracking-wider"
          >
            Id
          </th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="px-6 py-4 text-xs font-bold uppercase text-zinc-400 tracking-wider"
          >
            Name
          </th>
          <td mat-cell *matCellDef="let row">
            <!-- {{ row.name }} -->

            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-blue-50 font-bold text-xs"
              >
                {{ row.name?.charAt(0) }}
              </div>
              <div>
                <p class="font-medium text-zinc-900">{{ row.name }}</p>
              </div>
            </div>
          </td>
        </ng-container>

        <ng-container matColumnDef="acoes">
          <th mat-header-cell *matHeaderCellDef>
            <mat-icon>bolt</mat-icon>
          </th>
          <td mat-cell *matCellDef="let row">
            <button
              matIconButton
              [matMenuTriggerFor]="menu"
              aria-label="Example icon-button with a menu"
            >
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item>
                <span>Visualizar</span>
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-menu-item>
                <span>Editar</span>
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-menu-item>
                <span>Deletar</span>
                <mat-icon>delete</mat-icon>
              </button>
            </mat-menu>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        #paginator
        [length]="dataSource.data.length"
        [pageIndex]="0"
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 20]"
        aria-label="Select page"
      >
      </mat-paginator>
    </div>
  `,
  styles: `
    .full-width-table {
      width: 100%;
    }
  `,
})
export class FuncionarioTable implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FuncionarioTableItem>;
  dataSource = new FuncionarioTableds();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'acoes'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
