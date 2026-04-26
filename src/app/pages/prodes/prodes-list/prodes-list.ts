import { Component, ViewChild, effect, inject } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ProdesModel } from "../../../models/prodes";
import { ProdesStore } from "../../../store/prodes.store";
import { ProdesForm } from "../prodes-form/prodes-form";

@Component({
  selector: 'app-prodes-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatIconButton,
    MatMenuModule,
    MatButton,
    MatInputModule,
    MatInputModule,
    MatCard,
  ],
  template: `
    <div class="flex flex-col gap-2">
      <section>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div
            class="w-full sm:w-auto flex gap-2 px-2 rounded-lg bg-[var(--mat-sys-primary-container)]"
          >
            <div class="flex items-center">
              <mat-icon class="!text-[var(--mat-sys-primary)]">search</mat-icon>
            </div>
            <div>
              <input class="p-2 border-none outline-0 text-lg" (keyup)="applyFilter($event)" />
            </div>
          </div>
          <button matButton="filled" (click)="onCreate()" matTooltip="Adicionar um novo registro">
            <span>Novo</span>
          </button>
        </div>
      </section>

      <section>
        <mat-card appearance="raised" class="overflow-hidden" class="!rounded-lg !overflow-hidden">
          <div class="h-[500px] overflow-auto">
            <table mat-table [dataSource]="dataSource" matSort aria-label="Elements">
              <!-- Codigo Column -->
              <ng-container matColumnDef="codigo">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Codigo</th>
                <td mat-cell *matCellDef="let row">{{ row.codigo }}</td>
              </ng-container>
              <!-- descricao Column -->
              <ng-container matColumnDef="descricao">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Descricao</th>
                <td mat-cell *matCellDef="let row">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-lg text-white"
                      [style.background-color]="onGetColor(row.id.charAt(0))"
                    >
                      <p class="font-bold p-4">
                        {{ row.descricao.charAt(0) }}
                      </p>
                    </div>

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
                <th mat-header-cell *matHeaderCellDef>
                  <mat-icon>menu</mat-icon>
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
                    <button
                      mat-menu-item
                      (click)="onFindById(row.id)"
                    >
                      <mat-icon>search</mat-icon>
                      <span>Visualizar</span>
                    </button>
                    <button mat-menu-item (click)="onUpdateById(row)" matTooltip="Editar registro">
                      <mat-icon>edit</mat-icon>
                      <span>Editar</span>
                    </button>
                    <button
                      mat-menu-item
                      (click)="onDeleteById(row.id)"
                    >
                      <mat-icon>delete</mat-icon>
                      <span>Excluir</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>
        </mat-card>
      </section>
      <section>
        <mat-paginator
          #paginator
          [pageSize]="5"
          [pageSizeOptions]="[5, 10, 20]"
          aria-label="Select page"
        >
        </mat-paginator>
      </section>
    </div>
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
    this.prodesStore.carregaLista(null);
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
