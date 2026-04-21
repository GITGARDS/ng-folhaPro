import { Component, ViewChild, effect, inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { FuncionarioModel } from "../../models/funcionario";
import { FuncionarioStore } from "../../store/funcionario.store";

@Component({
  selector: 'app-funcionario-list',
  imports: [
    MatTableModule,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    MatTooltip,
    MatPaginator,
    MatCard,
    MatSortModule,
  ],
  template: `
    <div>
      <section class="py-2">
        <mat-form-field>
          <mat-label>Filter</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Ex. ium" #input />
        </mat-form-field>

        <button
          matIconButton
          (click)="onCreate()"
          class="mx-4"
          matTooltip="Adicionar um novo registro"
        >
          <mat-icon>add</mat-icon>
        </button>
      </section>
      <section>
        <mat-card appearance="outlined" class="overflow-hidden">
          <div class="h-[500px] overflow-auto">
            <table mat-table matSort [dataSource]="dataSource">
              <!-- Id Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
                <td mat-cell *matCellDef="let row">{{ row.id }}</td>
              </ng-container>
              <!-- Nome Column -->
              <ng-container matColumnDef="nome">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
                <td mat-cell *matCellDef="let row">{{ row.nome }}</td>
              </ng-container>
              <!-- Salario Base Column -->
              <ng-container matColumnDef="salarioBase">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Salario Base</th>
                <td mat-cell *matCellDef="let row">{{ row.salarioBase }}</td>
              </ng-container>
              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let row">{{ row.ativo }}</td>
              </ng-container>
              <!-- Actions Column -->
              <ng-container matColumnDef="actions" stickyEnd>
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let row" class="!bg-gray-200 !max-w-[110px] !text-center">
                  <button
                    mat-icon-button
                    (click)="onFindById(row.id)"
                    matTooltip="Visualizar registro"
                  >
                    <mat-icon>search</mat-icon>
                  </button>
                  <button
                    mat-icon-button
                    (click)="onUpdateById(row.id, row)"
                    matTooltip="Editar registro"
                  >
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button
                    mat-icon-button
                    (click)="onDeleteById(row.id)"
                    matTooltip="Excluir registro"
                  >
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>
              <tr
                class="!bg-gray-200"
                mat-header-row
                *matHeaderRowDef="displayedColumns; sticky: true"
              ></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>
        </mat-card>
      </section>
      <section class="py-2">
        <mat-paginator
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 25, 100]"
          aria-label="Select page"
        >
        </mat-paginator>
      </section>
    </div>
  `,

  styles: `
    /* .mat-column-actions {
      background-color: gray !important;
    } */
  `,
})
export class FuncionarioList {
  funcionarioStore = inject(FuncionarioStore);
  dataSource: MatTableDataSource<FuncionarioModel> = new MatTableDataSource<FuncionarioModel>(
    this.funcionarioStore.funcionarios(),
  );
  displayedColumns: string[] = ['id', 'nome', 'salarioBase', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.funcionarioStore.carregaLista();
    effect(() => {
      this.dataSource = new MatTableDataSource(this.funcionarioStore.funcionarios());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onFindById(id: number) {
    console.log('onFindById', id);
  }

  onCreate() {
    if (confirm('Confirma criacao?')) {
      const id = this.funcionarioStore.funcionarios().length + 1;
      const funcionario: Partial<FuncionarioModel> = {
        id,
        nome: `Funcionario ${id}`,
      };
      const ret = this.funcionarioStore.create(funcionario as FuncionarioModel);
      console.log('onCreate', ret);
    }
  }

  onUpdateById(id: string, funcionario: FuncionarioModel) {
    if (confirm('Tem certeza?')) {
      const data = { ...funcionario, ativo: !funcionario.ativo, salarioBase: 1000 };
      this.funcionarioStore.updateById({ id, funcionario: data });
    }
  }

  onDeleteById(id: number) {
    if (confirm('Tem certeza?')) {
      this.funcionarioStore.deleteById(id);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
