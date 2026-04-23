import { Component, ViewChild, effect, inject } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { ProdesModel } from "../../../models/prodes";
import { ProdesStore } from "../../../store/prodes.store";
import { ProdesForm } from "../prodes-form/prodes-form";

@Component({
  selector: 'app-prodes-list',
  imports: [
    MatTableModule,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatTooltip,
    MatPaginator,
    MatCard,
    MatSortModule,
    MatButton,
  ],
  template: `
    <section class="py-2 grid grid-cols-6 gap-2">
      <mat-form-field class="col-span-6 md:col-span-3">
        <mat-label>Filtro</mat-label>
        <mat-icon matPrefix>filter_alt</mat-icon>
        <input matInput (keyup)="applyFilter($event)" placeholder="Ex. ium" #input />
      </mat-form-field>
    </section>

    <section class="py-2">
      <button matButton="filled" (click)="onCreate()" matTooltip="Adicionar um novo registro">
        <mat-icon>add</mat-icon>
        <span class="ml-2">Novo</span>
      </button>
    </section>

    <section>
      <mat-card appearance="raised" class="overflow-hidden">
        <div class="h-[500px] overflow-auto">
          <table mat-table matSort [dataSource]="dataSource">
            <!-- Id Column -->
            <!-- <ng-container matColumnDef="id" >
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
              <td mat-cell *matCellDef="let row">{{ row.id }}</td>
            </ng-container> -->
            <!-- Codigo Column -->
            <ng-container matColumnDef="codigo">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Codigo</th>
              <td mat-cell *matCellDef="let row">{{ row.codigo }}</td>
            </ng-container>
            <!-- Descricao Column -->
            <ng-container matColumnDef="descricao">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Descricao</th>
              <td mat-cell *matCellDef="let row">
                <div class="flex gap-2">
                  <span
                    class="w-8 h-8 rounded-full flex items-center justify-center text-lg  text-white bg-em"
                    [style.background-color]="onGetColor(row.id.charAt(0))"
                  >
                    {{ row.descricao.charAt(0) }}
                  </span>
                  <span class="flex items-center">
                    {{ row.descricao }}
                  </span>
                </div>
              </td>
            </ng-container>
            <!-- Tipo Column -->
            <ng-container matColumnDef="tipo">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Tipo</th>
              <td mat-cell *matCellDef="let row">{{ row.tipo }}</td>
            </ng-container>
            <!-- Incidencias Column -->
            <ng-container matColumnDef="incidencias">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Incidencias</th>
              <td mat-cell *matCellDef="let row">{{ row.incidencias }}</td>
            </ng-container>

            <!-- Automatico Column -->
            <ng-container matColumnDef="automatico">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Automatico</th>
              <td mat-cell *matCellDef="let row">
                <div
                  [style.color]="row.automatico == false ? 'red' : 'black'"
                  class="h-8 w-8 flex items-center justify-center"
                >
                  <mat-icon class="!font-bold !text-md ">{{
                    row.automatico ? 'check' : 'close'
                  }}</mat-icon>
                </div>
              </td>
            </ng-container>
            <!-- Status Column -->
            <ng-container matColumnDef="ativo">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Ativo</th>
              <td mat-cell *matCellDef="let row">
                <div
                  [style.color]="row.ativo == false ? 'red' : 'black'"
                  class="h-8 w-8 flex items-center justify-center"
                >
                  <mat-icon class="!font-bold !text-md ">{{
                    row.ativo ? 'check' : 'close'
                  }}</mat-icon>
                </div>
              </td>
            </ng-container>
            <!-- Actions Column -->
            <ng-container matColumnDef="actions" stickyEnd>
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let row">
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
              class="!bg-gray-200 flex flex-col !h-auto md:table-row md:!h-10"
              mat-header-row
              *matHeaderRowDef="displayedColumns; sticky: true"
            ></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              class="hover:!bg-gray-100 flex flex-col !h-auto md:table-row"
            >
              >
            </tr>
          </table>
        </div>
      </mat-card>
    </section>
    <section class="py-2">
      <mat-paginator
        class="py-2 rounded-2xl shadow-sm"
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 25, 100]"
        aria-label="Select page"
      >
      </mat-paginator>
    </section>
  `,

  styles: ``,
})
export class ProdesList {
  prodesStore = inject(ProdesStore);
  dataSource: MatTableDataSource<ProdesModel> = new MatTableDataSource<ProdesModel>(
    this.prodesStore.list(),
  );
  displayedColumns: string[] = [
    // 'id',
    'codigo',
    'descricao',
    'tipo',
    'incidencias',
    'automatico',
    'ativo',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.prodesStore.carregaLista();
    effect(() => {
      this.dataSource = new MatTableDataSource(this.prodesStore.list());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onFindById(id: number) {
    console.log('onFindById', id);
  }

  readonly dialog = inject(MatDialog);

  onCreate() {
    const ultimoProdes = this.prodesStore.list().length + 1;

    const novo: Partial<ProdesModel> = {
      codigo: `P${ultimoProdes}`,
      descricao: `Descricao ${ultimoProdes}`,
      tipo: 'provento',
      incidencias: ['INSS', 'FGTS', 'IRRF'],
      automatico: true,
      ativo: true,
    };
    this.openDialog('new', novo as ProdesModel);
  }

  onUpdateById(params: ProdesModel) {
    this.openDialog('update', params);
  }

  openDialog(opcao: string, data: ProdesModel) {
    const dialogRef = this.dialog.open(ProdesForm, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { opcao, data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      switch (opcao) {
        case 'new':
          this.prodesStore.create(result as ProdesModel);
          break;
        case 'update':
          this.prodesStore.updateById({
            id: data.id as string,
            data: result as ProdesModel,
          });
          break;
      }
    });
  }

  onDeleteById(id: number) {
    if (confirm('Tem certeza?')) {
      this.prodesStore.deleteById(id);
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
