import { CurrencyPipe, DatePipe } from "@angular/common";
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
import { FuncionarioModel } from "../../../models/funcionario";
import { EmpresaStore } from "../../../store/empresa.store";
import { FuncionarioStore } from "../../../store/funcionario/funcionario.store";
import { FuncionarioForm } from "../funcionario-form/funcionario-form";

@Component({
  selector: 'app-funcionario-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatIconButton,
    MatMenuModule,
    CurrencyPipe,
    DatePipe,
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
            class="w-full sm:w-auto flex gap-2 px-2 rounded-lg bg-[var(--var-fundo)]"
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
              <!-- empresa Column -->
              <ng-container matColumnDef="empresa">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Empresa</th>
                <td mat-cell *matCellDef="let row">{{ row.empresa }}</td>
              </ng-container>
              <!-- Nome Column -->
              <ng-container matColumnDef="nome">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
                <td mat-cell *matCellDef="let row">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-lg text-[var(--var-texto)]"
                      [style.background-color]="onGetColor(row.id.charAt(0))"
                    >
                      <p class="font-bold p-4">
                        {{ row.nome.charAt(0) }}
                      </p>
                    </div>

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
              <ng-container matColumnDef="ativo">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Ativo</th>
                <td mat-cell *matCellDef="let row">
                  <div
                    [class]="row.ativo == true ? 'text-blue-500' : 'text-red-500'"
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
  styles: `
    .full-width-table {
      width: 100%;
    }
  `,
})
export class FuncionarioList {
  funcionarioStore = inject(FuncionarioStore);
  empresaStore = inject(EmpresaStore);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<FuncionarioModel> = new MatTableDataSource<FuncionarioModel>(
    this.funcionarioStore.list(),
  );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    // 'id',
    // 'empresa',
    'nome',
    'salarioBase',
    'dataAdmissao',
    'ativo',
    'actions',
  ];

  constructor() {
    // this.funcionarioStore.carregaLista({
    //   empresa: this.empresaStore.empresaLogada().empresa.id as string,
    // });

    effect(() => {
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.funcionarioStore.list());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);
    });
  }

  onFindById(id: number) {
    console.log('onFindById', this.funcionarioStore.findById()({ id }));
    window.alert(JSON.stringify(this.funcionarioStore.findById()({ id })));
  }

  readonly dialog = inject(MatDialog);

  onCreate() {
    const ultimoFuncionario = this.funcionarioStore.list().length + 1;
    const novo: Partial<FuncionarioModel> = {
      nome: `Funcionario ${ultimoFuncionario}`,
      dataNascimento: new Date().toISOString().split('T')[0],
      nacionalidade: 'BR',
      naturalidade: 'BR',
      genero: 'Masculino',
      racaCor: 'Branco',
      estadoCivil: 'Solteiro',
      endereco: 'Endereco',
      bairro: 'Bairro',
      cidade: 'Cidade',
      cep: '00000-000',
      telefone: '(00) 0000-0000',
      celular: '(00) 00000-0000',
      email: 'a@b.com',
      dataAdmissao: new Date().toISOString().split('T')[0],
      salarioBase: ultimoFuncionario * 100,
      ativo: true,
    };
    this.openDialog('new', novo as FuncionarioModel);
  }

  onUpdateById(params: FuncionarioModel) {
    this.openDialog('update', params);
  }

  openDialog(opcao: string, data: FuncionarioModel) {
    const dialogRef = this.dialog.open(FuncionarioForm, {
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
      const empresaLogada = this.empresaStore.empresaLogada();
      result.empresa = empresaLogada.empresa.id as string;
      switch (opcao) {
        case 'new':
          this.funcionarioStore.create(result as FuncionarioModel);
          break;
        case 'update':
          this.funcionarioStore.updateById({
            id: data.id as string,
            data: result as FuncionarioModel,
          });
          break;
      }
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
