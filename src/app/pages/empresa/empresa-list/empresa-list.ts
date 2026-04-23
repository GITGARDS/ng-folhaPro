import { DatePipe } from "@angular/common";
import { Component, ViewChild, effect, inject } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { EmpresaModel } from "../../../models/empresa";
import { EmpresaStore } from "../../../store/empresa.store";
import { EmpresaForm } from "../empresa-form/empresa-form";

@Component({
  selector: 'app-empresa-list',
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
    MatProgressSpinnerModule,
    DatePipe,
    MatButton,
  ],
  template: ` <div class="relative">
    @if (empresaStore.isLoading()) {
      <div
        class="absolute w-full h-full top-0 left-0 bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <mat-spinner></mat-spinner>
      </div>
    }

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
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
              <td mat-cell *matCellDef="let row">{{ row.id }}</td>
            </ng-container>
            <!-- tipoInscricao Column -->
            <ng-container matColumnDef="tipoInscricao">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Tipo</th>
              <td mat-cell *matCellDef="let row">{{ row.tipoInscricao }}</td>
            </ng-container>
            <!-- Inscricao Column -->
            <ng-container matColumnDef="inscricao">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Inscricao</th>
              <td mat-cell *matCellDef="let row">{{ row.inscricao }}</td>
            </ng-container>  
            <!-- nomeEmpresaRazaoSocial Column -->
            <ng-container matColumnDef="nomeEmpresaRazaoSocial">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome da Empresa/Razao Social</th>
              <td mat-cell *matCellDef="let row">
                <div class="flex gap-2">
                  <span
                    class="w-8 h-8 rounded-full flex items-center justify-center text-lg  text-white bg-em"
                    [style.background-color]="onGetColor(row.nomeEmpresaRazaoSocial.charAt(0))"
                  >
                    {{ row.nomeEmpresaRazaoSocial.charAt(0) }}
                  </span>
                  <span class="flex items-center">
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
            <!-- <tr mat-footer-row *matFooterRowDef="displayedColumns; sticky: true"></tr> -->
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
  </div>`,

  styles: `

  `,
})
export class EmpresaList {
  empresaStore = inject(EmpresaStore);
  dataSource: MatTableDataSource<EmpresaModel> = new MatTableDataSource<EmpresaModel>(
    this.empresaStore.list(),
  );
  displayedColumns: string[] = ['tipoInscricao', 'inscricao', 'nomeEmpresaRazaoSocial',  'dataAbertura', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    this.empresaStore.carregaLista();
    effect(() => {
      this.dataSource = new MatTableDataSource(this.empresaStore.list());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
