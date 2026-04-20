import { AfterViewInit, Component, ViewChild, inject } from "@angular/core";
import { MatIconButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSpinner } from "@angular/material/progress-spinner";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FuncionarioModel } from "../../../models/funcionario";
import { FuncionarioStore } from "../../../store/funcionario.store";

@Component({
  selector: 'app-funcionario-lista',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconButton,
    MatIcon,
    MatMiniFabButton,
    MatSpinner,
  ],
  template: `
    <div class="relative">
      @if (funcionarioStore.isLoading()) {
        <div
          class="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.15)] backdrop-blur-sm  z-10 flex items-center justify-center"
        >
          <mat-spinner></mat-spinner>
        </div>
      }

      <div class="p-4">
        <button matMiniFab (click)="onCreate()">
          <mat-icon>add</mat-icon>
        </button>
      </div>

      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>#</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>
        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef>Nome</th>
          <td mat-cell *matCellDef="let row">{{ row.nome }}</td>
        </ng-container>
        <ng-container matColumnDef="salarioBase">
          <th mat-header-cell *matHeaderCellDef>Salario Base</th>
          <td mat-cell *matCellDef="let row">{{ row.salarioBase }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let row">{{ row.ativo }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let row">
            <button mat-icon-button (click)="onFindById(row.id)">
              <mat-icon>search</mat-icon>
            </button>
            <button mat-icon-button (click)="onUpdateById(row.id, row)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button (click)="onDeleteById(row.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
      <div class="p-4">
        <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" aria-label="Select page">
        </mat-paginator>
      </div>
    </div>
  `,
  styles: `
    .full-width-table {
      width: 100%;
    }
  `,
})
export class FuncionarioLista implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<FuncionarioModel>;

  funcionarioStore = inject(FuncionarioStore);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id', 'nome', 'salarioBase', 'status', 'actions'];

  constructor() {
    this.funcionarioStore.findall();
  }

  ngAfterViewInit(): void {
    this.onAtualiza();
  }

  onAtualiza() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.funcionarioStore.funcionarios());
      this.dataSource.data = this.funcionarioStore.funcionarios();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 400);
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
      this.onAtualiza();
    }
  }

  onUpdateById(id: string, funcionario: FuncionarioModel) {
    if (confirm('Tem certeza?')) {
      const funcionario2 = { ...funcionario, ativo: !funcionario.ativo, salarioBase: 1000 };
      this.funcionarioStore.updateById({ id, funcionario: funcionario2 });
      this.onAtualiza();
    }
  }

  onDeleteById(id: number) {
    if (confirm('Tem certeza?')) {
      this.funcionarioStore.deleteById(id);
      this.onAtualiza();
    }
  }
}
