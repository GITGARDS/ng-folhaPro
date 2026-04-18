import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable, merge, of as observableOf } from "rxjs";
import { map } from "rxjs/operators";
import { FuncionarioModel } from "../../../models/funcionario";

// TODO: replace this with real data from your application
const EXAMPLE_DATA: FuncionarioModel[] = [
  {
    id: 1,
    nome: 'João',
    cpf: '123.456.789-00',
    dataNascimento: '01/01/2000',
    nomeMae: 'Maria',
    nacionalidade: 'Brasileiro',
    naturalidade: 'São Paulo',
    genero: 'Masculino',
    racaCor: 'Branco',
    estadoCivil: 'Solteiro',
    enderecoResidencial: 'Rua A, 123',
    rg: '123456789',
    ctpsDigital: '123456789',
    pisPasep: '123456789',
    tituloEleitor: '123456789',
    certificadoReservista: '123456789',
    dataAdmissao: '01/01/2000',
    categoriaTrabalhador: 'Funcionário',
    cargoFuncaoDesempenhada: 'Desenvolvedor',
    salarioBase: 1000,
    jornadaTrabalho: '8 horas',
    departamentoCentroCusto: 'Departamento A',
    tipoContrato: 'CLT',
    vinculoSindicato: 'Sindicato X',
    insalubridade: 'Não',
    suporteTopPonto: 'Sim',
    tipoConta: 'Conta Corrente',
    banco: 'Banco X',
    agencia: '1234',
    conta: '123456789',
    valeTransporte: 'Sim',
    planoSaude: 'Plano X',
    planoOdontologico: 'Plano Y',
  },
  {
    id: 2,
    nome: 'Maria',
    cpf: '123.456.789-00',
    dataNascimento: '01/01/2000',
    nomeMae: 'Maria',
    nacionalidade: 'Brasileiro',
    naturalidade: 'São Paulo',
    genero: 'Feminino',
    racaCor: 'Branco',
    estadoCivil: 'Solteiro',
    enderecoResidencial: 'Rua A, 123',
    rg: '123456789',
    ctpsDigital: '123456789',
    pisPasep: '123456789',
    tituloEleitor: '123456789',
    certificadoReservista: '123456789',
    dataAdmissao: '01/01/2000',
    categoriaTrabalhador: 'Funcionário',
    cargoFuncaoDesempenhada: 'Desenvolvedor',
    salarioBase: 1000,
    jornadaTrabalho: '8 horas',
    departamentoCentroCusto: 'Departamento A',    
    tipoContrato: 'CLT',
    vinculoSindicato: 'Sindicato X',
    insalubridade: 'Não',
    suporteTopPonto: 'Sim',
    tipoConta: 'Conta Corrente',
    banco: 'Banco X',
    agencia: '1234',
    conta: '123456789',
    valeTransporte: 'Sim',
    planoSaude: 'Plano X',
    planoOdontologico: 'Plano Y',
  },
  
];

/**
 * Data source for the FuncionarioTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FuncionarioTableds extends DataSource<FuncionarioModel> {
  data: FuncionarioModel[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FuncionarioModel[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }),
      );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: FuncionarioModel[]): FuncionarioModel[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: FuncionarioModel[]): FuncionarioModel[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.nome, b.nome, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
