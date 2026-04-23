import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CurrencyPipe, DatePipe } from "@angular/common";
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
import { Observable, map, shareReplay } from "rxjs";
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
    MatInputModule,
    MatTooltip,
    MatPaginator,
    MatCard,
    MatSortModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    DatePipe,
    MatButton,
  ],
  template: ` <div class="relative">
    @if (funcionarioStore.isLoading()) {
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
              <!-- <td mat-footer-cell *matFooterCellDef>Total</td> -->
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
              <td mat-footer-cell *matFooterCellDef>
                {{ getTotalSalarioBase() | currency: 'BRL' }}
              </td>
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
                  [style.color]="row.ativo == false ? 'red' : 'black'"
                  class="h-8 w-8 flex items-center justify-center"
                >
                  <mat-icon class="!font-bold !text-md ">{{ row.ativo ? 'check' : 'close' }}</mat-icon>
                </div>
              </td>
              <td mat-footer-cel *matFooterCellDef>
                {{ getTotalfuncionariosAtivos() }}
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
    /* .mat-column-actions {
      background-color: gray !important;
    } */
  `,
})
export class FuncionarioList {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => {
      console.log('matches', result);
      return result.matches;
    }),
    shareReplay(),
  );

  funcionarioStore = inject(FuncionarioStore);
  dataSource: MatTableDataSource<FuncionarioModel> = new MatTableDataSource<FuncionarioModel>(
    this.funcionarioStore.list(),
  );
  displayedColumns: string[] = ['id', 'nome', 'salarioBase', 'dataAdmissao', 'ativo', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getTotalSalarioBase() {
    return this.funcionarioStore.totalSalarioBase();
  }

  getTotalfuncionariosAtivos() {
    return this.funcionarioStore.totalfuncionariosAtivos().length;
  }

  constructor() {
    this.funcionarioStore.carregaLista();
    effect(() => {
      this.dataSource = new MatTableDataSource(this.funcionarioStore.list());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onFindById(id: number) {
    console.log('onFindById', id);
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
