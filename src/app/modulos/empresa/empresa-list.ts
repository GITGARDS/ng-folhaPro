import { DatePipe } from "@angular/common";
import { Component, effect, inject, viewChild } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { EmpresaForm } from "./empresa-form";
import { EmpresaModel } from "./shared/empresa-model";
import { EmpresaService } from "./shared/empresa.service";
import { EmpresaStore } from "./shared/empresa.store";

@Component({
  selector: 'app-empresa-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatIconButton,
    MatMenuModule,
    DatePipe,
    MatButton,
    MatInputModule,
    MatInputModule,
    MatCard,
    MatDivider,
  ],
  template: `  
    <div class="flex flex-col gap-2">
      <section>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div
            class="sm:max-w-[260px] w-full flex gap-2 px-2 rounded-lg bg-[var(--var-fundo)]"
          >
            <div class="flex items-center">
              <mat-icon class="!text-[var(--var-texto)]">search</mat-icon>
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
              <!-- Id Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
                <td mat-cell *matCellDef="let row">{{ row.id }}</td>
              </ng-container>
              <!-- tipoInscricao Column -->
              <ng-container matColumnDef="tipoInscricao">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Tipo</th>
                <td mat-cell *matCellDef="let row">
                  <div class="flex gap-2">
                    <span>
                      {{ row.tipoInscricao }}
                    </span>
                    <span class="flex items-center justify-center">
                      @if (row.id === empresaService.idEmpresaLogada()) {                        
                        <span class="size-3 animate-ping rounded-lg bg-blue-500"></span>
                      }
                    </span>
                  </div>
                </td>
              </ng-container>
              <!-- Inscricao Column -->
              <ng-container matColumnDef="inscricao">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Inscricao</th>
                <td mat-cell *matCellDef="let row">{{ row.inscricao }}</td>
              </ng-container>
              <!-- nomeEmpresaRazaoSocial Column -->
              <ng-container matColumnDef="nomeEmpresaRazaoSocial">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Nome da Empresa/Razao Social
                </th>
                <td mat-cell *matCellDef="let row">
                  <div class="flex items-center gap-7">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-lg text-[var(--var-texto)]"
                      [style.background-color]="onGetColor(row.nomeEmpresaRazaoSocial.charAt(0))"
                    >
                      <p class="font-bold p-4">
                        {{ row.nomeEmpresaRazaoSocial.charAt(0) }}
                      </p>
                    </div>

                    <span class="flex items-center relative">
                      {{ row.nomeEmpresaRazaoSocial }}
                    </span>
                  </div>
                </td>
              </ng-container>
              <!-- dataAbertura Column -->
              <ng-container matColumnDef="dataAbertura">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Data da Abertura</th>
                <td mat-cell *matCellDef="let row">{{ row.dataAbertura | date: 'dd/MM/yyyy' }}</td>
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
                    <button mat-menu-item (click)="onFindById(row.id)">
                      <mat-icon>search</mat-icon>
                      <span>Visualizar</span>
                    </button>
                    <button mat-menu-item (click)="onUpdateById(row)" matTooltip="Editar registro">
                      <mat-icon>edit</mat-icon>
                      <span>Editar</span>
                    </button>
                    <button mat-menu-item (click)="onDeleteById(row.id)">
                      <mat-icon>delete</mat-icon>
                      <span>Excluir</span>
                    </button>
                    @if (empresaStore.empresaLogada().isLogada) {
                      @if (empresaService.idEmpresaLogada() === row.id) {
                        <mat-divider />
                        <button mat-menu-item (click)="empresaStore.logout()">
                          <mat-icon>logout</mat-icon>
                          <span>Logout</span>
                        </button>
                      }
                    } @else {
                      <mat-divider />
                      <button mat-menu-item (click)="empresaStore.login({ empresa: row })">
                        <mat-icon>login</mat-icon>
                        <span>Login</span>
                      </button>
                    }
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
export class EmpresaList {
  empresaStore = inject(EmpresaStore);
  empresaService = inject(EmpresaService);
  router = inject(Router);
  dataSource: MatTableDataSource<EmpresaModel> = new MatTableDataSource<EmpresaModel>(
    this.empresaStore.list(),
  );
  displayedColumns: string[] = [
    'tipoInscricao',
    'inscricao',
    'nomeEmpresaRazaoSocial',
    'dataAbertura',
    'actions',
  ];

  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);


  constructor() {
    effect(() => {
      this.dataSource = new MatTableDataSource(this.empresaStore.list());
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    });
  }

  onFindById(id: number) {
    console.log('onFindById', id);
  }

  readonly dialog = inject(MatDialog);

  onCreate() {
    const ultimoEmpresa = this.empresaStore.list().length + 1;
    const novo: Partial<EmpresaModel> = {
      nomeEmpresaRazaoSocial: `Empresa ${ultimoEmpresa}`,
      nomeFantasia: `Empresa ${ultimoEmpresa}`,
      email: 'a@b.com',
      dataAbertura: new Date().toISOString().split('T')[0],
    };
    this.openDialog('new', novo as EmpresaModel);
  }

  onUpdateById(params: EmpresaModel) {
    this.openDialog('update', params);
  }

  openDialog(opcao: string, data: EmpresaModel) {
    const dialogRef = this.dialog.open(EmpresaForm, {
      width: 'auto',
      height: '750px',
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
          this.empresaStore.create(result as EmpresaModel);
          break;
        case 'update':
          this.empresaStore.updateById({
            id: data.id as string,
            data: result as EmpresaModel,
          });
          break;
      }
    });
  }

  onDeleteById(id: number) {
    if (confirm('Tem certeza?')) {
      this.empresaStore.deleteById(id);
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
