import { CurrencyPipe } from "@angular/common";
import { AfterViewInit, Component, ViewChild, inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { FuncionarioModel } from "../../../models/funcionario";
import { FuncionarioService } from "../../../services/funcionario.service";
import { FuncionarioForm } from "../funcionario-form/funcionario-form";
import { FuncionariosDataSource } from "./funcionarios-ds";

@Component({
  selector: 'app-funcionarios',

  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCard,
    CurrencyPipe,
    MatTableModule,
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatFormField,
    MatLabel,
    MatInput,
  ],
  template: `
    <mat-card appearance="outlined" class="!shadow-sm !shadow-gray-400">
      <div class="flex items-center gap-5 m-4">
        <div class="w-[500px] mt-4">
          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Filter</mat-label>
            <input matInput (keyup)="applyFilter($event)" placeholder="Ex. ium" #input />
          </mat-form-field>
        </div>

        <button
          matIconButton
          class="!bg-blue-500 !text-white"
          (click)="onNovo()"
          matTooltip="Novo"
          matTooltipPosition="above"
        >
          <mat-icon>add</mat-icon>
        </button>
      </div>

      <table mat-table class="full-width-table" matSort aria-label="Elements">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
          <!-- <td mat-footer-cell *matFooterCellDef>Total</td> -->
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
          <td mat-cell *matCellDef="let row" class="py-6 px-6">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-emerald-500  flex items-center justify-center text-zinc-500 font-bold text-xs"
              >
                <span class="text-white font-bold text-xs">
                  {{ row.nome?.charAt(0) }}
                </span>
              </div>
              {{ row.nome }}
            </div>
          </td>
        </ng-container>

        <ng-container matColumnDef="salarioBase">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Salario</th>
          <td mat-cell *matCellDef="let row">{{ row.salarioBase | currency }}</td>
          <!-- <td mat-footer-cell *matFooterCellDef> {{ funcionarioService.getTotalSalarioBase() | currency }} </td> -->
        </ng-container>

        <ng-container matColumnDef="ativo">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Ativo</th>
          <td mat-cell *matCellDef="let row">{{ row.ativo }}</td>
        </ng-container>

        <ng-container matColumnDef="acoes">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Acoes</th>
          <td mat-cell *matCellDef="let row">
            <button matIconButton matTooltip="Editar" (click)="onEditar(row)">
              <mat-icon class="!text-blue-700">edit</mat-icon>
            </button>
            <button
              matIconButton
              matTooltip="Excluir"
              matTooltipPosition="above"
              (click)="onExcluir(row.id)"
            >
              <mat-icon class="!text-red-700">delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        <!-- <tr mat-footer-row *matFooterRowDef="displayedColumns; sticky: true"></tr> -->
      </table>

      <mat-paginator
        class="m-4"
        #paginator
        [length]="dataSource.data.length"
        [pageIndex]="0"
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 20]"
        aria-label="Select page"
      >
      </mat-paginator>
    </mat-card>
  `,
  styles: `
    .full-width-table {
      width: 100%;
    }
    .mat-mdc-row .mat-mdc-cell {
      border-bottom: 1px solid #e5e7eb;
      border-top: 1px solid #e5e7eb;
      cursor: pointer;
    }
    .mat-mdc-row:hover .mat-mdc-cell {
      background-color: #e5e7eb !important;
    }
  `,
})
export class Funcionarios implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FuncionarioModel>;
  dataSource = new FuncionariosDataSource();

  readonly dialog = inject(MatDialog);

  funcionarioService = inject(FuncionarioService);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'salarioBase', 'ativo', 'acoes'];

  constructor() {
    this.funcionarioService.findAll();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.data = this.funcionarioService.funcionarios();
      this.table.dataSource = this.dataSource;
    }, 50);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onNovo() {
    const dialogRef = this.dialog.open(FuncionarioForm, {
      data: { funcionario: null },
    });
  }
  onEditar(reg: any) {
    const dialogRef = this.dialog.open(FuncionarioForm, {
      data: { funcionario: reg },
    });
  }
  onExcluir(id: number) {
    console.log(id);
  }

  applyFilter($event: KeyboardEvent) {}
}
