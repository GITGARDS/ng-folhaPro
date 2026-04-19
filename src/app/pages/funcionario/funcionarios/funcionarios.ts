import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTable, MatTableModule } from "@angular/material/table";
import { FuncionarioModel } from "../../../models/funcionario";
import { FuncionariosDataSource } from "./funcionarios-ds";

@Component({
  selector: 'app-funcionarios',
  template: `
    <div class="mat-elevation-z2">
      <table mat-table class="full-width-table" matSort aria-label="Elements">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
          <td mat-cell *matCellDef="let row">{{ row.nome }}</td>
        </ng-container>

        <ng-container matColumnDef="salarioBase">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Salario</th>
          <td mat-cell *matCellDef="let row">{{ row.salarioBase }}</td>
        </ng-container>

        <ng-container matColumnDef="ativo">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Ativo</th>
          <td mat-cell *matCellDef="let row">{{ row.ativo }}</td>
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
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class Funcionarios implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FuncionarioModel>;
  dataSource = new FuncionariosDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'salarioBase', 'ativo'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
