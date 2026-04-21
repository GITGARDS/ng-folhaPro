import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, ViewChild, effect, inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { FuncionarioModel } from "../../../models/funcionario";
import { FuncionarioStore } from "../../../store/funcionario.store";
import { FuncionarioForm } from "../funcionario-form/funcionario-form";

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
    MatProgressSpinnerModule,
    CurrencyPipe,
    DatePipe
  ],
  template: `
    <div class="relative">
      @if (funcionarioStore.isLoading()) {
        <div
          class="absolute w-full h-full top-0 left-0 bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <mat-spinner></mat-spinner>
        </div>
      }

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
        <mat-card appearance="raised" class="overflow-hidden">
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
                <td mat-cell *matCellDef="let row">
                  <div class="flex gap-2">
                    <span
                      class="w-8 h-8 rounded-full flex items-center justify-center text-lg  text-white bg-em"
                      [style.background-color]="onGetColor(row.id.charAt(0))"
                    >
                      {{ row.nome.charAt(0) }}
                    </span>
                    <span class="flex items-center">
                      {{ row.nome }}
                    </span>
                  </div>
                </td>
              </ng-container>
              <!-- Salario Base Column -->
              <ng-container matColumnDef="salarioBase">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Salario</th>
                <td mat-cell *matCellDef="let row">{{ row.salarioBase | currency: 'BRL' }}</td>
              </ng-container>
              <!-- Data Admissao Column -->
              <ng-container matColumnDef="dataAdmissao">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Admissao</th>
                <td mat-cell *matCellDef="let row">{{ row.dataAdmissao | date: 'dd/MM/yyyy' }}</td>
              </ng-container>
              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let row">{{ row.ativo }}</td>
              </ng-container>
              <!-- Actions Column -->
              <ng-container matColumnDef="actions" stickyEnd>
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let row" class="!bg-gray-200 !max-w-[150px] !text-center">
                  <button
                    mat-icon-button
                    (click)="onFindById(row.id)"
                    matTooltip="Visualizar registro"
                  >
                    <mat-icon>search</mat-icon>
                  </button>
                  <button mat-icon-button (click)="onUpdateById(row)" matTooltip="Editar registro">
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
                class="!bg-gray-200 bg-gra"
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
  displayedColumns: string[] = ['id', 'nome', 'salarioBase', 'dataAdmissao', 'status', 'actions'];

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

  readonly dialog = inject(MatDialog);

  onCreate() {
    const dialogRef = this.dialog.open(FuncionarioForm, {
      data: { funcionario: {} as FuncionarioModel },
      minWidth: '700px',
      maxWidth: '700px',
      height: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.funcionarioStore.create(result as FuncionarioModel);
    });
  }

  onUpdateById(funcionario: FuncionarioModel) {
    const dialogRef = this.dialog.open(FuncionarioForm, {
      data: { funcionario: funcionario as FuncionarioModel },
      minWidth: '700px',
      maxWidth: '700px',
      height: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.funcionarioStore.updateById({
        id: funcionario.id as string,
        funcionario: result as FuncionarioModel,
      });
    });
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
  onGetColor(arg0: any) {
    switch (arg0) {
      case '1':
        return 'blue';
      case '2':
        return 'green';
      case '3':
        return 'yellow';
      case '4':
        return 'red';
      case '5':
        return 'black';
      case 'A':
        return 'gray';
      case 'B':
        return 'white';
      case 'C':
        return 'brown';
      case 'D':
        return 'orange';
      case 'E':
        return 'cyan';
      case 'F':
        return 'magenta';
      case 'G':
        return 'olive';
      default:
        return '#6a7282';
    }
  }
}
